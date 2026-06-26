import { TaskInput } from "@/lib/schema/courses";
import { query } from "@/lib/db";

export async function createTask(courseId: string, task: TaskInput) {
  const { rows } = await query(
    `INSERT INTO user_course_tasks (
      user_course_id,
      name,
      description, 
      deadline, 
      location, 
      link, 
      comment, 
    )
    VALUES ($1, $2, $3, $4)
    RETURNING 
      id, 
      name, 
      description, 
      deadline, 
      location, 
      link, 
      comment, 
      status, 
    `,
    [
      courseId,
      task.name,
      task.description ?? null,
      task.deadline ?? null,
      task.location ?? null,
      task.link ?? null,
      task.comment ?? null,
    ]
  );
  return rows[0];
}
