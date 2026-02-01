import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
    const token_hash = url.searchParams.get("token_hash");
    const type = url.searchParams.get("type") as EmailOtpType | null;
    const next = url.searchParams.get("next") ?? "/profile";

    /**
     * Clean up the redirect URL by deleting the Auth flow parameters.
     *
     * `next` is preserved for now, because it's needed in the error case.
     */
    const redirectTo = new URL(url);
    redirectTo.pathname = next;
    redirectTo.searchParams.delete("token_hash");
    redirectTo.searchParams.delete("type");

    if (token_hash && type) {
        const { data, error } = await supabase.auth.verifyOtp({ type, token_hash });
        if (!error) {
            // Only create user_data for new signups, not password recovery
            if (type !== 'recovery') {
                const username = data.user?.email?.split("@")[0];
                const { error: insertError } = await supabase.from("user_data").insert([
                    {
                        user_id: data.user?.id,
                        username: username,
                    }
                ]);

                if (insertError) {
                    console.error(insertError);
                }
            }

            redirectTo.searchParams.delete("next");
            redirect(303, redirectTo);
        }
    }

    // redirectTo.pathname = "/auth/error";
    redirect(303, redirectTo);
};
