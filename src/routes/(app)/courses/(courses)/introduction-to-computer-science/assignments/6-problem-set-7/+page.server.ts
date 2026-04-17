import { fail } from '@sveltejs/kit';
import { checkAssignment } from '$lib/gradescript';
import type { Actions } from './$types';
import type { Json } from '$lib/database.types';

export const actions: Actions = {
	submit: async ({ request, locals }) => {
		const { supabase, user } = locals;

		if (!user) {
			return fail(401, { error: 'You must be logged in to submit.' });
		}

		const formData = await request.formData();
		const file = formData.get('file') as File;
		const assignment = formData.get('assignment') as string;

		if (!file || !file.name || file.size === 0) {
			return fail(400, { error: 'Please upload a file.' });
		}

		if (!assignment) {
			return fail(400, { error: 'Assignment name is missing.' });
		}

		try {
			const result = await checkAssignment(assignment, file);

			const { error: dbError } = await supabase.from('submissions').insert({
				assignment_id: assignment,
				user_id: user.id,
				submission_content: await file.text(),
				results: result as unknown as Json // GradeResult is a JS Object so it's correct
			});

			if (dbError) {
				console.error('Failed to save submission:', dbError);
			}

			return { result };
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Grading failed. Please try again.';
			return fail(500, { error: message });
		}
	}
};
