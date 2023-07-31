import Input from "@/components/input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent } from "react";

function LogInForm() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return alert("401 Error");

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);
    router.push("/");
  };

  return (
    <form onSubmit={handleLogIn} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
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
        <Link href="/account/sign-up" className="text-sm underline">
          No account? Sign up
        </Link>

        <button
          type="submit"
          className="px-8 py-2 font-bold text-white capitalize rounded bg-gradient-to-tr from-pink-500 to-orange-500 w-fit"
        >
          Log in
        </button>
      </div>
    </form>
  );
}

export default LogInForm;
