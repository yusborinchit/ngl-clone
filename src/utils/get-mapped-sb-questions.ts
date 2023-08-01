import { type Question, type SBQuestionUsers } from "@/types";

export default function getMappedSBQuestions(
  sbQuestions: SBQuestionUsers[]
): Question[] {
  const mappedQuestions = sbQuestions.map((question) => ({
    id: question.id,
    sender: question.users?.username,
    content: question.content,
    createdAt: question.created_at,
  }));

  return mappedQuestions;
}
