import { supabaseAdmin } from '$lib/supabase.server.js';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { user } }) => {
	if (!user) {
		return { classroom: null, members: [], userRole: null };
	}

	// Check if user belongs to a classroom
	const { data: membership } = await supabaseAdmin
		.from('classroom_students')
		.select('classroom_id, user_role')
		.eq('user_id', user.id)
		.limit(1)
		.single();

	if (!membership) {
		return { classroom: null, members: [], userRole: null };
	}

	// Fetch classroom details
	const { data: classroom } = await supabaseAdmin
		.from('classroom')
		.select('id, join_code, created_at')
		.eq('id', membership.classroom_id)
		.single();

	// Fetch all members
	const { data: members } = await supabaseAdmin
		.from('classroom_students')
		.select('user_id, user_role, created_at')
		.eq('classroom_id', membership.classroom_id)
		.order('created_at', { ascending: true });

	// Resolve user_ids to emails
	const membersWithEmail = await Promise.all(
		(members ?? []).map(async (m) => {
			const { data } = await supabaseAdmin.auth.admin.getUserById(m.user_id);
			return { ...m, email: data.user?.email ?? m.user_id };
		})
	);

	return {
		classroom,
		members: membersWithEmail,
		userRole: membership.user_role
	};
};

function generateJoinCode(): string {
	const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	let code = '';
	for (let i = 0; i < 6; i++) {
		code += chars[Math.floor(Math.random() * chars.length)];
	}
	return code;
}

export const actions: Actions = {
	create: async ({ locals: { user } }) => {
		if (!user) return fail(401, { error: 'Not authenticated' });

		// Check if user already in a classroom
		const { data: existing } = await supabaseAdmin
			.from('classroom_students')
			.select('id')
			.eq('user_id', user.id)
			.limit(1)
			.single();

		if (existing) {
			return fail(400, { error: 'You are already in a classroom' });
		}

		const joinCode = generateJoinCode();

		const { data: classroom, error: classroomError } = await supabaseAdmin
			.from('classroom')
			.insert({ join_code: joinCode })
			.select('id')
			.single();

		if (classroomError || !classroom) {
			console.error('Failed to create classroom:', classroomError);
			return fail(500, { error: 'Failed to create classroom' });
		}

		const { error: memberError } = await supabaseAdmin
			.from('classroom_students')
			.insert({
				classroom_id: classroom.id,
				user_id: user.id,
				user_role: 'professor'
			});

		if (memberError) {
			console.error('Failed to add professor to classroom:', memberError);
			return fail(500, { error: 'Failed to create classroom' });
		}

		return { success: true };
	},

	join: async ({ request, locals: { user } }) => {
		if (!user) return fail(401, { error: 'Not authenticated' });

		const formData = await request.formData();
		const joinCode = (formData.get('join_code') as string)?.trim().toUpperCase();

		if (!joinCode) {
			return fail(400, { joinError: 'Please enter a join code' });
		}

		// Check if user already in a classroom
		const { data: existing } = await supabaseAdmin
			.from('classroom_students')
			.select('id')
			.eq('user_id', user.id)
			.limit(1)
			.single();

		if (existing) {
			return fail(400, { joinError: 'You are already in a classroom' });
		}

		const { data: classroom } = await supabaseAdmin
			.from('classroom')
			.select('id')
			.eq('join_code', joinCode)
			.single();

		if (!classroom) {
			return fail(400, { joinError: 'Invalid join code' });
		}

		const { error: memberError } = await supabaseAdmin
			.from('classroom_students')
			.insert({
				classroom_id: classroom.id,
				user_id: user.id,
				user_role: 'student'
			});

		if (memberError) {
			console.error('Failed to join classroom:', memberError);
			return fail(500, { joinError: 'Failed to join classroom' });
		}

		return { success: true };
	}
};
