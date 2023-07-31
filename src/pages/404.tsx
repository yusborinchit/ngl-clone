import Logo from "@/components/logo";
import Link from "next/link";

function User404() {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <header className="flex justify-center max-w-md px-4 mx-auto">
          <Link href="/">
            <Logo />
          </Link>
        </header>
        <main className="max-w-md px-4 mx-auto mt-2">
          <h2 className="text-4xl font-black">Page not found</h2>
        </main>
      </div>
    </div>
  );
}

export default User404;
