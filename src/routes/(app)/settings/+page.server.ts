import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { user } }) => {
	return {
		email: user?.email ?? ''
	};
};

export const actions: Actions = {
	updateEmail: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		try {
			const { error } = await supabase.auth.updateUser({ email });

			if (error) throw error;

			return {
				emailSuccess: true
			};
		} catch (error) {
			console.error('Error updating email:', error);
			return fail(400, {
				emailError: 'Unable to update email. Please try again.'
			});
		}
	},

	signOut: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		redirect(303, '/auth/login');
	}
};
