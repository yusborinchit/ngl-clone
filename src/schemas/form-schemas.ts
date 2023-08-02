import { z } from "zod";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/;
const usernameRegex = /^[a-zA-Z0-9_\.]+$/;

export const LogInSchema = z.object({
  email: z.string().email({ message: "Email not valid" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(32, { message: "Password cannot be more than 32 characters long" })
    .regex(usernameRegex, {
      message:
        "Username can only contain letters, numbers, underscores, and periods",
    }),
  email: z.string().email("Email not valid").nonempty("Email is required"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password cannot be more than 32 characters long" })
    .regex(passwordRegex, {
      message: "Password must contain at least one letter and one number",
    }),
});
