import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { user } }) => {
	// Redirect to login if not authenticated
	if (!user) {
		throw redirect(303, '/auth/login');
	}
};
