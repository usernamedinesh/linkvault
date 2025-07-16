import { z } from "zod";

// Password complexity regex example (at least 1 uppercase, 1 lowercase, 1 number, 1 symbol)
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}<>~]).{8,}$/;

// Login Schema
export const loginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100)
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }),
  })
  .strict();

export type Login = z.infer<typeof loginSchema>;

// Signup Schema
export const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100)
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(30)
      .trim(),
  })
  .strict();

export type Signup = z.infer<typeof signupSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
  })
  .strict();

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

// New Password Schema (with confirm password validation)
export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100)
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }),
    confirmPassword: z.string().min(8).max(100),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type NewPassword = z.infer<typeof newPasswordSchema>;


export const newPasswordSchemaServer = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100)
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }),
    confirmPassword: z.string().min(8).max(100),
    email: z.string().email(),
    token: z.string().min(10),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type NewPasswordServer = z.infer<typeof newPasswordSchemaServer>;
