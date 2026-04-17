import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

// Redirect authenticated users away from login page
export const load = async ({ locals: { user } }) => {
	if (user) {
		throw redirect(303, '/dashboard');
	}
};

export const actions: Actions = {
    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
        } catch(error) {
            console.error("Error logging in:", error);
            return fail(401, { message: "Invalid Credentials" });
        }

        redirect(303, "/dashboard");
    },
};
