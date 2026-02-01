import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

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

        redirect(303, "/profile");
    },
};
