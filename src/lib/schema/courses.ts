import { z } from "zod";
import { TASK_STATUSES } from "@/lib/types/courses";

export const CreateCourseSchema = z.object({
  code: z.string().trim().min(1, "Course code is required").max(10),
  name: z.string().trim().min(1, "Name is required").max(100),
  link: z.url().optional(),
});

export type CourseInput = z.infer<typeof CreateCourseSchema>;

export const CreateTaskSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().optional(),
  deadline: z.date().optional(),
  location: z.string().trim().max(100).optional(),
  link: z.url().optional(),
  comment: z.string().optional(),
  status: z.enum(TASK_STATUSES).default("not_started"),
});

export type TaskInput = z.infer<typeof CreateTaskSchema>;
