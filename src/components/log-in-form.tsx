import FormError from "@/components/form-error";
import FormInput from "@/components/form-input";
import { useAuth } from "@/hooks/use-auth";
import { LogInSchema } from "@/schemas/form-schemas";
import { type FormErrors } from "@/types";
import Link from "next/link";
import { useState, type FormEvent } from "react";

interface LogInErrors {
  email?: string[];
  password?: string[];
}

const DEFAULT_FORM_ERRORS: FormErrors<LogInErrors> = {
  formErrors: [],
  fieldErrors: { email: [], password: [] },
};

interface LogInFormProps {
  onSuccess: () => void;
}

function LogInForm({ onSuccess }: LogInFormProps) {
  const { logIn } = useAuth();
  const [errors, setErrors] = useState(DEFAULT_FORM_ERRORS);

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    setErrors(DEFAULT_FORM_ERRORS);
    const zodResult = LogInSchema.safeParse({ email, password });

    if (!zodResult.success) {
      const { formErrors, fieldErrors } = zodResult.error.formErrors;
      return setErrors({ formErrors, fieldErrors });
    }

    const supaResults = await logIn(zodResult.data);

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
    <form onSubmit={handleLogIn} className="flex flex-col gap-8">
      {errors.formErrors.length > 0 && (
        <FormError error={errors.formErrors[0]} />
      )}

      <div className="flex flex-col gap-4">
        <FormInput
          type="email"
          name="email"
          label="Email"
          placeholder="exampleemail@gmail.com"
          errors={errors.fieldErrors.email}
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          placeholder="examplepassword123"
          errors={errors.fieldErrors.password}
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
