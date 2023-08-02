import { type Question, type SBQuestionUsers } from "@/types";

export default function getMappedSBQuestion(
  sbQuestion: SBQuestionUsers
): Question {
  const mappedQuestion = {
    id: sbQuestion.id,
    sender: sbQuestion.users?.username,
    content: sbQuestion.content,
    createdAt: sbQuestion.created_at,
  };

  return mappedQuestion;
}
