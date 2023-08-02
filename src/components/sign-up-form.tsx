import FormError from "@/components/form-error";
import Input from "@/components/form-input";
import { useAuth } from "@/hooks/useAuth";
import { SignUpSchema } from "@/schemas/form-schemas";
import { type FormErrors } from "@/types";
import Link from "next/link";
import { useState, type FormEvent } from "react";

interface SignUpErrors {
  username?: string[];
  email?: string[];
  password?: string[];
}

const DEFAULT_FORM_ERRORS: FormErrors<SignUpErrors> = {
  formErrors: [],
  fieldErrors: { username: [], email: [], password: [] },
};

interface SignUpFormProps {
  onSuccess: () => void;
}

function SignUpForm({ onSuccess }: SignUpFormProps) {
  const { signUp } = useAuth();
  const [errors, setErrors] = useState(DEFAULT_FORM_ERRORS);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    setErrors(DEFAULT_FORM_ERRORS);
    const zodResult = SignUpSchema.safeParse({ username, email, password });

    if (!zodResult.success) {
      const { formErrors, fieldErrors } = zodResult.error.formErrors;
      return setErrors({ formErrors, fieldErrors });
    }

    const supaResults = await signUp(zodResult.data);

    if (supaResults.error) {
      const { message } = supaResults.error;
      return setErrors((prevErrors) => ({
        ...prevErrors,
        formErrors: [message],
      }));
    }

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex mx-auto max-w-[360px] flex-col gap-8 mt-6"
    >
      {errors.formErrors.length > 0 && (
        <FormError error={errors.formErrors[0]} />
      )}

      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="username"
          label="Username"
          placeholder="myuniqueuserwow"
          errors={errors.fieldErrors.username}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="exampleemail@gmail.com"
          errors={errors.fieldErrors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="examplepassword123"
          errors={errors.fieldErrors.password}
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
