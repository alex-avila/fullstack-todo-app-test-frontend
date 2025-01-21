import Image from "next/image";
import { LinkButton } from "@/components/button";
import { TasksProvider } from "@/components/tasks-provider";
import { Tasks } from "@/components/tasks";
import { AlertDialogProvider, AlertDialog } from "@/components/alert-dialog";
import { PlusIcon } from "@/components/icons/plus-icon";
import { fetchTasks } from "@/lib/data";
import imageClipboard from "@/assets/image-clipboard.png";

export default async function HomePage() {
  const allTasks = await fetchTasks();

  const completedTasksLength = allTasks.filter((task) => task.completed).length;

  return (
    <div>
      <div className="-translate-y-1/2">
        <LinkButton href="/create">
          Create Task
          <PlusIcon />
        </LinkButton>
      </div>

      <div className="pb-6 pt-10">
        <div className="flex justify-between text-sm font-bold">
          <div className="flex gap-2">
            <span className="text-app-blue">Tasks</span>
            <span className="rounded-full bg-app-gray-300 px-2 py-0.5 text-xs">
              {allTasks.length}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-app-purple">Completed</span>
            <span className="rounded-full bg-app-gray-300 px-2 py-0.5 text-xs">
              {allTasks.length === 0
                ? 0
                : `${completedTasksLength} of ${allTasks.length}`}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-t border-app-gray-300 text-center text-app-gray-200">
        {allTasks.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-16">
            <Image
              className="size-14"
              src={imageClipboard}
              alt=""
              height={56}
              width={56}
            />
            <div className="my-4 font-bold">
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
