import Icon from "@/components/lucide-icon";
import { type PostgrestError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { type FormEvent } from "react";

interface QuestionInputProps {
  addQuestion: ({ content }: { content: string }) => Promise<{
    error: PostgrestError | null;
  }>;
}

function QuestionInput({ addQuestion }: QuestionInputProps) {
  const router = useRouter();

  const handleNewQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const question = formData.get("question") as string;

    if (question.trim() === "") return;

    form.reset();
    const { error } = await addQuestion({ content: question });

    if (error) return alert(`Error: ${error.message}`);
  };

  return (
    <form onSubmit={handleNewQuestion} className="mt-4">
      <label htmlFor="question-input" className="sr-only">
        Order notes
      </label>

      <div className="overflow-hidden border border-gray-400 rounded focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500">
        <textarea
          id="question-input"
          rows={4}
          name="question"
          placeholder="Enter your question here..."
          className="w-full align-top border-none rounded resize-none focus:ring-0"
        ></textarea>

        <div className="flex items-center gap-2 p-3 bg-white">
          {/* TODO: add anon toggle */}
          <button
            type="submit"
            className="grid px-1 ml-auto text-gray-900 transition-colors hover:text-pink-500 place-items-center"
          >
            <Icon name="send" strokeWidth="1.80px" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default QuestionInput;
