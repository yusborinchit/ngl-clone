import { useSessionContext } from "@supabase/auth-helpers-react";
import Icon from "./lucide-icon";
import TextAreaInput from "./text-area-input";

interface WallQuestionProps {
  id: string;
  receiverId?: string;
  sender?: string;
  createdAt: string;
  question: string;
}

function WallQuestion({
  id,
  receiverId,
  sender,
  createdAt,
  question,
}: WallQuestionProps) {
  const { session } = useSessionContext();

  const date = new Date(Date.parse(createdAt));
  const formattedDate = Intl.DateTimeFormat("es-UR").format(date);

  return (
    <>
      <article className="flex flex-col gap-2">
        <div className="flex overflow-hidden border border-gray-400 rounded">
          <div className="w-2 h-full bg-gradient-to-tr from-orange-500 to-pink-500" />
          <div className="flex-1 p-4">
            <header className="flex items-center">
              <p className="text-xs font-black text-transparent bg-gradient-to-tr from-orange-500 to-pink-500 bg-clip-text">
                {sender ?? "Anonymous"}
              </p>
              <p className="ml-auto text-xs text-gray-500">{formattedDate}</p>
            </header>
            <p className="mt-2 text-sm break-all">{question}</p>
          </div>
        </div>
        {receiverId === session?.user.id && (
          <div className="flex gap-1">
            <Icon
              name="corner-left-up"
              strokeWidth="1.75px"
              className="text-gray-400"
            />
            <form className="flex-1">
              <TextAreaInput
                label="Response"
                name="response"
                placeholder="Reply here..."
                rows={1}
              >
                <button
                  type="submit"
                  className="px-4 py-2 ml-auto text-xs font-bold text-white capitalize rounded bg-gradient-to-tr from-orange-500 to-pink-500"
                >
                  Reply
                </button>
              </TextAreaInput>
            </form>
          </div>
        )}
      </article>
    </>
  );
}

export default WallQuestion;
