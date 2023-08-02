import { Send } from "lucide-react";

function QuestionInput() {
  return (
    <form className="mt-4">
      <div>
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
              <Send strokeWidth="1.80px" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default QuestionInput;
