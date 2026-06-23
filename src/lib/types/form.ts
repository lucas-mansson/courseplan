export type FormState<TFieldErrors extends Record<string, unknown>> =
  | { errors: Partial<TFieldErrors> & { form?: string[] } }
  | undefined;

export type SignInFormState = FormState<{ email: string[] }>;

export type SignUpFormState = FormState<{
  name: string[];
  email: string[];
  password: string[];
}>;

export type CreateCourseFormState = FormState<{
  code: string[];
  name: string[];
  link: string[];
}>;
