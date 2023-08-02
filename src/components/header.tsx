import Logo from "@/components/logo";
import SearchInput from "@/components/search-input";
import { useAuth } from "@/hooks/use-auth";
import { type Session } from "@supabase/supabase-js";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
  session?: Session;
}

function Header({ session }: HeaderProps) {
  const router = useRouter();
  const { logOut } = useAuth();

  const handleLogOut = async () => {
    const { error } = await logOut();

    // TODO: better error handling
    if (error) return alert(`Error ${error.message}`);

    router.reload();
  };

  return (
    <header className="grid max-w-md gap-4 p-4 mx-auto">
      <nav className="flex items-center">
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
      </nav>
      <SearchInput />
    </header>
  );
}

export default Header;
