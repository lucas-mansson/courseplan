import { JWTPayload } from "jose";
import { z } from "zod"

export const SignInSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z.string().trim(),
})

export type SignInInput = z.infer<typeof SignInSchema>;

export type SignInFormState =
  | {
    errors: {
      email?: string[]
      form?: string[]
    }
  }
  | undefined

export const SignUpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export type SignupFormState =
  | {
    errors: {
      name?: string[]
      email?: string[]
      password?: string[]
      form?: string[]
    }
  }
  | undefined

