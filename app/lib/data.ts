import type { Task } from "@/lib/schema";
import { config } from "@/lib/config";

const tasksBaseUrl = `${config.apiBaseUrl}/tasks`;

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(tasksBaseUrl);
  if (!res.ok) {
    throw new Error("Unexpected error");
  }
  const resParsed = await res.json();
  return resParsed;
}
