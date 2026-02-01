import { redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
    signup: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError || !data.user) {
            console.error(signUpError);
            redirect(303, "/auth/error");
        }

        return {
            signup_succeeded: true,
        };
    },
};
