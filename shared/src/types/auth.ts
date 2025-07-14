
import  { z } from "zod";

//Login Schema
export const loginSchema = z.object ({
    email: z.string().email(),
    password: z.string().min(4).max(30),
})

export type Login = z.infer<typeof loginSchema>; 

//Signup Schema
export const signupSchema = z.object ({
    email: z.string().email(),
    password: z.string().min(4).max(30),
    name: z.string().min(2).max(30),
})

export type Signup = z.infer<typeof signupSchema>; 

//Forgot-password Schema
export const forgotPasswordSchema = z.object ({
    email: z.string().email(),
})

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>; 

//new password schema
export const newPasswordSchema = z.object ({
    password: z.string().min(4).max(30),
    confirmPassword: z.string().min(4).max(30),
})
export type NewPassword = z.infer<typeof newPasswordSchema>; 
