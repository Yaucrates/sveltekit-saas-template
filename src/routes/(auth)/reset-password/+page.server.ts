import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const actions: Actions = {
    updatePassword: async ({ request, locals: { supabase } }) => {
        const data = await request.formData();
        const password = data.get('password') as string;

        // Update the user's password
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            return fail(400, {
                message: 'Unable to reset password. The link may have expired or is invalid.'
            });
        }

        // User is automatically logged in after password update
        redirect(303, '/profile');
    }
};
