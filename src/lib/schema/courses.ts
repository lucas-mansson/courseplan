import { z } from "zod";

export const CreateCourseSchema = z.object({
  code: z.string().trim().min(1, "Course code is required").max(10),
  name: z.string().trim().min(1, "Name is required").max(100),
  link: z.url().nullable().optional(),
});

export type CourseInput = z.infer<typeof CreateCourseSchema>;

export const CreateTaskSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
});

export type TaskInput = z.infer<typeof CreateTaskSchema>;
