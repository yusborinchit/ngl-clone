import { type Question } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

interface UseQuestionsProps {
  user: {
    id: string;
    username: string;
  };
}

export function useQuestions({ user }: UseQuestionsProps) {
  const { supabaseClient, session } = useSessionContext();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch(`/api/questions/?username=${user.username}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions));
  }, [user.username]);

  const addQuestion = async ({ content }: { content: string }) => {
    const { data: question, error } = await supabaseClient
      .from("questions")
      .insert({
        receiver_id: user.id,
        sender_id: session?.user.id ?? null,
        content,
      })
      .select()
      .single();

    const questionId = question.id;
    return { error };
  };

  return { questions, addQuestion };
}
