import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  const user = useUser();

  return (
    <>
      <header className="max-w-md px-4 py-4 mx-auto">
        <h1 className="text-lg font-bold">NGL Clone</h1>
      </header>
      <main className="max-w-md px-4 mx-auto">
        <pre className="px-2 py-1 text-white bg-gray-500 rounded">
          {JSON.stringify(user, undefined, 4)}
        </pre>
      </main>
    </>
  );
}
