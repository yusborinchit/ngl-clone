import { QuestionSchema } from "@/schemas/form-schemas";
import { type FormErrors } from "@/types";
import { type PostgrestError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import TextAreaInput from "./text-area-input";

interface QuetionErrors {
  question?: string[];
}

const DEFAULT_FORM_ERRORS: FormErrors<QuetionErrors> = {
  formErrors: [],
  fieldErrors: { question: [] },
};

interface QuestionInputProps {
  addQuestion: (questionData: z.infer<typeof QuestionSchema>) => Promise<{
    error: PostgrestError | null;
  }>;
}

function QuestionInput({ addQuestion }: QuestionInputProps) {
  const router = useRouter();
  const [errors, setErrors] = useState(DEFAULT_FORM_ERRORS);

  const handleNewQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const question = formData.get("question") as string;

    setErrors(DEFAULT_FORM_ERRORS);
    const zodResult = QuestionSchema.safeParse({ question });

    if (!zodResult.success) {
      const { formErrors, fieldErrors } = zodResult.error.formErrors;
      return setErrors({ formErrors, fieldErrors });
    }

    form.reset();
    await addQuestion(zodResult.data);
  };

  return (
    <form onSubmit={handleNewQuestion} className="pt-4">
      <TextAreaInput
        label="Question"
        name="question"
        placeholder="Ask here..."
        rows={4}
      >
        <button
          type="submit"
          className="px-4 py-2 ml-auto text-xs font-bold text-white capitalize rounded bg-gradient-to-tr from-orange-500 to-pink-500"
        >
          Submit
        </button>
      </TextAreaInput>
      {errors.fieldErrors.question && (
        <p className="mt-1 text-xs text-red-500">
          {errors.fieldErrors.question[0]}
        </p>
      )}
    </form>
  );
}

export default QuestionInput;
