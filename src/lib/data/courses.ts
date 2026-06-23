import { query } from "@/lib/db";
import { Course } from "@/lib/types/courses";
import { CourseInput } from "@/lib/schema/courses";

export async function getCoursesByUserId(userId: string) {
  const { rows } = await query<Course>(
    `SELECT 
      uc.id, 
      uc.code,
      uc.name, 
      uc.link, 
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', t.id,
            'name', t.name,
            'description', t.description,
            'deadline', t.deadline,
            'location', t.location,
            'link', t.link,
            'comment', t.comment,
            'status', t.status
          )
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'
      ) AS tasks
    FROM user_courses uc
    LEFT JOIN user_course_tasks t ON t.user_course_id = uc.id
    WHERE uc.user_id = $1
    GROUP BY uc.id, uc.code, uc.name, uc.link
    `,
    [userId]
  );

  return rows;
}

export async function createCourse(userId: string, course: CourseInput) {
  const { rows } = await query(
    `INSERT INTO user_courses (user_id, code, name, link)
     VALUES ($1, $2, $3, $4)
     RETURNING id, code, name, link`,
    [userId, course.code, course.name, course.link ?? null]
  );
  return rows[0];
}
