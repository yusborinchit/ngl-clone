import Logo from "@/components/logo";
import SignUpForm from "@/components/sign-up-form";
import Link from "next/link";
import { useState } from "react";

function SignUp() {
  const [confirmationSent, setConfirmationSent] = useState(false);

  return (
    <div className="grid min-h-screen px-4 mx-auto place-items-center">
      <div className="w-full">
        <header className="flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </header>
        <main className="w-full">
          {confirmationSent ? (
            <section className="mt-2 text-center ">
              <h2 className="text-4xl font-black">Confirmation sent!</h2>
              <p className="text-gray-500 ">Please check out your email box!</p>
            </section>
          ) : (
            <SignUpForm onSuccess={() => setConfirmationSent(true)} />
          )}
        </main>
      </div>
    </div>
  );
}

export default SignUp;
