import Logo from "@/components/logo";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type Session } from "@supabase/supabase-js";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
  session?: Session;
}

function Header({ session }: HeaderProps) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) return alert(`Error ${error.message}`);
    router.reload();
  };

  return (
    <header className="flex items-center max-w-md p-4 mx-auto">
      <Link href="/">
        <Logo />
      </Link>
      {session?.user ? (
        <button
          onClick={handleLogOut}
          className="grid p-2 ml-auto transition-colors bg-gray-100 rounded hover:bg-gray-200"
        >
          <User width={24} height={24} />
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
  );
}

export default Header;
