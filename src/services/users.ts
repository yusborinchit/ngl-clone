import { type SupabaseClient } from "@supabase/supabase-js";

async function getUserIdByUsername(
  username: string,
  supabaseClient: SupabaseClient
) {
  const { data } = await supabaseClient
    .from("users")
    .select("id")
    .eq("username", username)
    .single();

  return data?.id;
}

export { getUserIdByUsername };
