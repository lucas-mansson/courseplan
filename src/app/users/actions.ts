"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  await query("INSERT INTO users (name, email) VALUES ($1, $2)", [name, email]);

  revalidatePath("/users");
}
