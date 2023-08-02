import { type Question, type SBQuestionUsers } from "@/types";
import getMappedSBQuestion from "./get-mapped-sb-question";

export default function getMappedSBQuestions(
  sbQuestions: SBQuestionUsers[]
): Question[] {
  return sbQuestions.map((question) => getMappedSBQuestion(question));
}
