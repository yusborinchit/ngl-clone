import { type SBQuestionUsers } from "@/types";
import { type SupabaseClient } from "@supabase/supabase-js";

export async function getQuestionById(
  questionId: string,
  supabaseClient: SupabaseClient
) {
  const { data } = await supabaseClient
    .from("questions")
    .select<string, SBQuestionUsers>(
      `
      id, content, created_at, receiver_id,
      users:sender_id (username)
      `
    )
    .eq("id", questionId)
    .single();

  return data;
}

export async function getQuestionsByUserId(
  userId: string,
  supabaseClient: SupabaseClient
) {
  const { data } = await supabaseClient
    .from("questions")
    .select<string, SBQuestionUsers>(
      `
      id, content, created_at, receiver_id,
      users:sender_id (username)
      `
    )
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false });

  return data ?? [];
}
