import Input from "@/components/input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

function SignUp() {
  const supabaseClient = useSupabaseClient();
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!username || !email || !password) return alert("401 Error");

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) return alert(error.message);
    setConfirmationSent(true);
  };

  return (
    <div className="grid max-w-[360px] min-h-screen px-4 mx-auto place-items-center">
      <div className="w-full">
        <header className="flex justify-center">
          <Link href="/">
            <h1 className="text-lg">
              <span className="px-[6px] py-1 text-white rounded  bg-gradient-to-tr from-orange-500 to-pink-500 font-black">
                NGL
              </span>
              <span className="font-bold"> Clone</span>
            </h1>
          </Link>
        </header>
        <main className="w-full">
          {confirmationSent ? (
            <section className="mt-2 text-center ">
              <h2 className="text-3xl font-bold">Confirmation sent!</h2>
              <p className="text-gray-500 ">Please check out your email box!</p>
            </section>
          ) : (
            <form onSubmit={handleSignUp} className="flex flex-col gap-8 mt-6">
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  placeholder="myuniqueuserwow"
                />
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="exampleemail@gmail.com"
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="examplepassword123"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link href="/account/log-in" className="text-sm underline">
                  Already user? Log in
                </Link>

                <button
                  type="submit"
                  className="px-8 py-2 font-bold text-white capitalize rounded bg-gradient-to-tr from-pink-500 to-orange-500 w-fit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

export default SignUp;
