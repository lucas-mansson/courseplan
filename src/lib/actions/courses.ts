import { CreateCourseFormState } from "@/lib/types/form";
import { CreateCourseSchema } from "@/lib/schema/courses";
import { verifySession } from "@/lib/session";
import { createCourse } from "@/lib/data/courses";
import { redirect } from "next/navigation";

export async function handleCreateCourse(
  _state: CreateCourseFormState,
  formData: FormData
): Promise<CreateCourseFormState> {
  const validated = CreateCourseSchema.safeParse({
    code: formData.get("code"),
    name: formData.get("name"),
    link: formData.get("link"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { code, name, link } = validated.data;
  const { userId } = await verifySession();

  const course = await createCourse(userId, { code, name, link });

  if (!course) {
    return {
      errors: {
        form: ["Error creating course"],
      },
    };
  }

  redirect("/");
}
