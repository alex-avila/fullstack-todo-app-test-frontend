"use server";

import { revalidatePath } from "next/cache";
import { taskSchema, type Task } from "@/lib/schema";
import { config } from "@/lib/config";
import { redirect } from "next/navigation";

const tasksBaseUrl = `${config.apiBaseUrl}/tasks`;

export async function createTaskAction({
  title,
  color,
}: Pick<Task, "title" | "color">) {
  await fetch(tasksBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(title && { title }),
      ...(color && { color }),
    }),
  });
  revalidatePath("/");
  redirect("/");
}

interface UpdateTaskActionOptions {
  withRedirect?: boolean;
}

export async function updateTaskAction(
  { id, title, color, completed }: Partial<Task>,
  { withRedirect }: UpdateTaskActionOptions = {},
) {
  const data = {
    ...(title && { title }),
    ...(color && { color }),
    ...((completed || completed === false) && { completed }),
  };

  const parsedRes = taskSchema.partial().safeParse(data);

  if (!parsedRes.success) {
    throw new Error("[zod]: Validation failed");
  }

  console.log("updateTaskAction data", parsedRes.data);

  await fetch(`${tasksBaseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedRes.data),
  });

  revalidatePath("/");

  if (withRedirect) {
    redirect("/");
  }
}

export async function deleteTaskAction({ id }: Pick<Task, "id">) {
  await fetch(`${tasksBaseUrl}/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/");
}
