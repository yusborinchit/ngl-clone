import Header from "@/components/header";
import {
  createPagesServerClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";

interface HomeProps {
  session?: Session;
}

function Home({ session }: HomeProps) {
  return (
    <>
      <Header session={session} />
      <main className="max-w-md px-4 mx-auto">Hello world</main>
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
