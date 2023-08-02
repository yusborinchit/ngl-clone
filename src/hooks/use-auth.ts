import { LogInSchema, SignUpSchema } from "@/schemas/form-schemas";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { z } from "zod";

export function useAuth() {
  const supabaseClient = useSupabaseClient();

  const logIn = async (logInData: z.infer<typeof LogInSchema>) => {
    const { email, password } = logInData;
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (signUpData: z.infer<typeof SignUpSchema>) => {
    const { username, email, password } = signUpData;

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    return { error };
  };

  const logOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    return { error };
  };

  return { logIn, signUp, logOut };
}
