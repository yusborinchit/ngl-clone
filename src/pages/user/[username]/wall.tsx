import Header from "@/components/header";
import QuestionInput from "@/components/question-input";
import WallQuestion from "@/components/wall-question";
import { useQuestions } from "@/hooks/use-questions";
import { getUserIdByUsername } from "@/services/users";
import {
  createPagesServerClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";

interface UserWallProps {
  session?: Session;
  user: {
    id: string;
    username: string;
  };
}

function UserWall({ session, user }: UserWallProps) {
  const { questions, addQuestion } = useQuestions({ user });

  return (
    <>
      <Header session={session} />
      <main className="max-w-md px-4 mx-auto">
        <header className="relative bg-gradient-to-tr from-orange-500 to-pink-500 h-[180px] w-full rounded flex flex-col gap-2">
          {/* <div className="absolute inset-0 top-0 left-0 bg-gradient-to-t from-transparent via-30%-transparent to-white" /> */}
          <div className="absolute flex items-center gap-2 px-2 py-1 bg-white rounded bottom-3 left-3">
            <div className="w-2 rounded-full bg-gradient-to-t from-green-600 to-green-400 aspect-square" />
            <h2 className="text-sm font-semibold">@{user.username}</h2>
          </div>
        </header>

        <QuestionInput addQuestion={addQuestion} />

        <section className="mt-4">
          <h3 className="text-xl font-black capitalize"># Latest Questions</h3>
          {questions ? (
            <div className="grid gap-4 py-4">
              {questions.map((question) => (
                <WallQuestion
                  key={question.id}
                  userFrom={question.sender}
                  createdAt={question.createdAt}
                  question={question.content}
                />
              ))}
            </div>
          ) : (
            <p className="mt-4">There is no questions</p>
          )}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabaseClient = createPagesServerClient(context);

  const username = context.query.username as string;
  const id = await getUserIdByUsername(username, supabaseClient);

  if (!username || !id) {
    return {
      notFound: true,
    };
  }

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  return {
    props: {
      session,
      user: {
        id,
        username,
      },
    },
  };
}

export default UserWall;
