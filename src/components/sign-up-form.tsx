import Input from "@/components/input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { type FormEvent } from "react";

interface SignUpFormProps {
  onSuccess: () => void;
}

function SignUpForm({ onSuccess }: SignUpFormProps) {
  const supabaseClient = useSupabaseClient();

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
    onSuccess();
  };

  return (
    <form onSubmit={handleSignUp} className="flex mx-auto max-w-[360px] flex-col gap-8 mt-6">
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
  );
}

export default SignUpForm;
