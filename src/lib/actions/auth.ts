"use server";

import { SignInFormState, SignInSchema, SignupFormState, SignUpSchema } from '@/lib/schema/auth';
import { getUserByEmail, createUser, getUserWithHashedPasswordByEmail } from '@/lib/data/users';
import { redirect } from 'next/navigation';
import bcrypt from "bcrypt";
import { createSession } from '@/lib/session';

export async function signIn(_state: SignInFormState, formData: FormData): Promise<SignInFormState> {
  const validated = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors
    };
  }

  const { email, password } = validated.data;
  const errorMsg = "Log in failed."

  const userWithHashedPassword = await getUserWithHashedPasswordByEmail(email);
  if (!userWithHashedPassword) {
    return {
      errors: {
        form: [errorMsg]
      }
    };
  }

  const isCorrect = !await bcrypt.compare(password, userWithHashedPassword.hashed_password)
  if (!isCorrect) {
    return {
      errors: {
        form: [errorMsg]
      }
    };
  }

  await createSession(userWithHashedPassword.id)
  redirect('/');
}

export async function signUp(_state: SignupFormState, formData: FormData): Promise<SignupFormState> {
  const validated = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors
    };
  }

  const { name, email, password } = validated.data;

  const existing = await getUserByEmail(email);
  if (existing) {
    return {
      errors: {
        email: ['An account with this email already exists']
      }
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, passwordHash });

  if (!user) {
    return {
      errors: {
        form: ['An error occurred while creating your account.']
      }
    }
  }

  await createSession(user.id)
  redirect('/');
}
