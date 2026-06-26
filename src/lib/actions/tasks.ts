import { CreateTaskFormState } from "@/lib/types/form";
import { CreateTaskSchema } from "@/lib/schema/courses";
import { verifySession } from "@/lib/session";
import { createTask } from "@/lib/data/tasks";
import { redirect } from "next/navigation";

export async function handleCreateTask(
  _state: CreateTaskFormState,
  courseId: string,
  formData: FormData
) {

  const validated = CreateTaskSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    deadline: formData.get("deadline"),
    location: formData.get("location"),
    link: formData.get("link"),
    comment: formData.get("comment"),
    status: formData.get("status"),
  })

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  await verifySession();

  const task = await createTask(courseId, validated.data)

  if (!task) {
    return {
      errors: {
        form: ["Error creating course"],
      },
    };
  }

  redirect("/");
}
