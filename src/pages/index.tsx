import {
  createPagesServerClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface HomeProps {
  session?: Session;
}

function Home({ session }: HomeProps) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) return alert(`Error ${error.message}`);
    router.reload();
  };

  return (
    <>
      <header className="flex items-center max-w-md px-4 py-4 mx-auto">
        <h1 className="text-lg font-bold">NGL Clone</h1>
        {session ? (
          <button
            onClick={handleLogOut}
            className="px-6 py-2 ml-auto text-sm font-bold text-white capitalize rounded bg-gradient-to-tr from-orange-500 to-pink-500"
          >
            Log Out
          </button>
        ) : (
          <Link
            href="/account/log-in"
            className="px-6 py-2 ml-auto text-sm font-bold text-white capitalize rounded bg-gradient-to-tr from-orange-500 to-pink-500"
          >
            Log in
          </Link>
        )}
      </header>
      <main className="max-w-md px-4 pb-4 mx-auto">
        <pre className="px-2 py-1 text-white bg-gray-500 rounded">
          {JSON.stringify(session?.user ?? {}, undefined, 4)}
        </pre>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabaseClient = createPagesServerClient(context);

  const { data } = await supabaseClient.auth.getSession();
  const { session } = data;

  return {
    props: {
      session,
    },
  };
}

export default Home;
