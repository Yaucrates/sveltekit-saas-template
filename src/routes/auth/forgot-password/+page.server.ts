import type { Actions } from './$types';

export const actions: Actions = {
    sendResetEmail: async ({ request, url, locals: { supabase } }) => {
        const data = await request.formData();
        const email = data.get('email') as string;

        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${url.origin}/auth/confirm?next=/auth/reset-password`
        });

        return { success: true };
    }
};
