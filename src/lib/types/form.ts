import { CourseInput, TaskInput } from "@/lib/schema/courses";
import { MapProps } from "@/lib/types/utils/map-props";
import { SignInInput, SignUpInput } from "@/lib/schema/auth";

export type FormState<TFieldErrors extends Record<string, unknown>> =
  | { errors: Partial<TFieldErrors> & { form?: string[] } }
  | undefined;

type ToFormState<T> = MapProps<T, string[]>

export type SignInFormState = FormState<ToFormState<SignInInput>>;

export type SignUpFormState = FormState<ToFormState<SignUpInput>>;

export type CreateCourseFormState = FormState<ToFormState<CourseInput>>;

export type CreateTaskFormState = FormState<ToFormState<TaskInput>>;


