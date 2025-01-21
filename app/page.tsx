import { LinkButton } from "@/components/button";
import { TasksProvider } from "@/components/tasks-provider";
import { Tasks } from "@/components/tasks";
import { AlertDialogProvider, AlertDialog } from "@/components/alert-dialog";
import { fetchTasks } from "@/lib/data";

export default async function HomePage() {
  const allTasks = await fetchTasks();

  const completedTasksLength = allTasks.filter((task) => task.completed).length;

  return (
    <div>
      <div className="-translate-y-1/2">
        <LinkButton href="/create">Create Task</LinkButton>
      </div>

      <div className="pt-10 pb-6">
        <div className="flex justify-between font-bold text-sm">
          <div className="flex gap-2">
            <span className="text-app-blue">Tasks</span>
            <span className="bg-app-gray-300 rounded-full px-2 py-0.5 text-xs">
              {allTasks.length}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-app-purple">Completed</span>
            <span className="bg-app-gray-300 rounded-full px-2 py-0.5 text-xs">
              {allTasks.length === 0
                ? 0
                : `${completedTasksLength} of ${allTasks.length}`}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-t border-app-gray-300 text-app-gray-200 text-center">
        {allTasks.length === 0 ? (
          <div className="py-16 px-4">
            <div className="font-bold mb-4">
              You don&apos;t have any tasks registered yet.
            </div>
            <div>Create tasks and organize your to-do items.</div>
          </div>
        ) : (
          <AlertDialogProvider>
            <TasksProvider initialTasks={allTasks}>
              <Tasks />
            </TasksProvider>
            <AlertDialog />
          </AlertDialogProvider>
        )}
      </div>
    </div>
  );
}
