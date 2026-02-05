import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { user } }) => {
	// Redirect to login if not authenticated
	if (!user) {
		throw redirect(303, '/auth/login');
	}
};
