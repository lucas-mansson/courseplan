import { revalidatePath } from "next/cache";

export async function createCourseHandler(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  revalidatePath("/courses");
}
