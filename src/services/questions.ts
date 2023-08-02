import { type SBQuestionUsers } from "@/types";
import { type SupabaseClient } from "@supabase/supabase-js";

export async function getQuestionsByUserId(
  userId: string,
  supabaseClient: SupabaseClient
) {
  const { data } = await supabaseClient
    .from("questions")
    .select<string, SBQuestionUsers>(
      `
      id, content, created_at,
      users:sender_id (username)
      `
    )
    .eq("receiver_id", userId);

  return data ?? [];
}
