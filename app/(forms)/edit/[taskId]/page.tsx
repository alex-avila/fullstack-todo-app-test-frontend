import { TaskForm } from "@/components/task-form";
import { fetchTasks } from "@/lib/data";

interface EditTaskPageProps {
  params: Promise<{ taskId: string }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  // NOTE: fetching all tasks instead of just one since test directions didn't mention ability to fetch single tasks
  const [{ taskId }, allTasks] = await Promise.all([params, fetchTasks()]);

  const foundTask = allTasks.find((task) => task.id === Number(taskId));

  if (!foundTask) {
    return `Task with id ${taskId} not found`;
  }

  return <TaskForm task={foundTask} />;
}
