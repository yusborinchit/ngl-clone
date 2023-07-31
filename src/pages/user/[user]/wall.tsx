import Header from "@/components/header";
import WallQuestion from "@/components/wall-question";
import {
  createPagesServerClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

interface UserWallProps {
  session?: Session;
}

function UserWall({ session }: UserWallProps) {
  const router = useRouter();
  const { user } = router.query;

  return (
    <>
      <Header session={session} />
      <main className="max-w-md px-4 mx-auto">
        <header className="relative bg-gradient-to-tr from-orange-500 to-pink-500 h-[180px] w-full rounded flex flex-col gap-2">
          {/* <div className="absolute inset-0 top-0 left-0 bg-gradient-to-t from-transparent via-30%-transparent to-white" /> */}
          <div className="absolute flex items-center gap-2 px-2 py-1 bg-white rounded bottom-3 left-3">
            <div className="w-2 rounded-full bg-gradient-to-t from-green-600 to-green-400 aspect-square" />
            <h2 className="text-sm font-semibold">@{user}</h2>
          </div>
        </header>
        <section className="py-4">
          <h3 className="text-xl font-black capitalize"># Your Wall</h3>
          <WallQuestion
            userFrom="Anonn"
            question="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis sapiente unde excepturi tempora dolores sunt, nobis deserunt atque voluptate? Sapiente ea numquam quisquam excepturi beatae magnam vitae vel modi nesciunt."
          />
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabaseClient = createPagesServerClient(context);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const { data: user } = await supabaseClient
    .from("users")
    .select("*")
    .eq("username", context.query.user)
    .single();

  if (!user)
    return {
      notFound: true,
    };

  return {
    props: {
      session,
    },
  };
}

export default UserWall;
