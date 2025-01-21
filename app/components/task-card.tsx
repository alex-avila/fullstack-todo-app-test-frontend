"use client";

import Link from "next/link";
import { useContext } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";

import type { Task } from "@/lib/schema";
import { deleteTaskAction } from "@/lib/actions";
import { config } from "@/lib/config";
import { TasksContext } from "@/components/tasks-provider";
import { AlertDialogContext } from "@/components/alert-dialog";
import { TrashIcon } from "./icons/trash-icon";
import { CheckmarkIcon } from "./icons/checkmark-icon";

interface TaskProps {
  task: Task;
}

function TaskCompleteCheckbox({
  id,
  completed,
}: Pick<Task, "id" | "completed">) {
  const { updateTask } = useContext(TasksContext);

  return (
    <div>
      <span className="sr-only">
        Mark as {completed ? "not completed" : "completed"}
      </span>

      <div className="flex size-6 items-center justify-center">
        <Checkbox.Root
          className="group relative z-10 flex size-6 items-center justify-center"
          checked={completed}
          onCheckedChange={updateTask.bind(null, id)}
        >
          <div className="relative z-10 size-[1.125rem] rounded-full border-2 border-app-blue group-data-[state=checked]:border-app-purple group-data-[state=checked]:bg-app-purple">
            <Checkbox.Indicator className="flex h-full w-full items-center justify-center">
              <CheckmarkIcon />
            </Checkbox.Indicator>
          </div>
        </Checkbox.Root>
      </div>
    </div>
  );
}

export function TaskCard({ task }: TaskProps) {
  const { openDialog } = useContext(AlertDialogContext);
  const foundTaskColor = config.colors.find(
    (color) => color.hex === task.color,
  );

  const handleDeleteClick = () => {
    openDialog(() => deleteTaskAction({ id: task.id }));
  };

  return (
    <div className="relative">
      <div className="flex items-start gap-3 rounded-lg border border-app-gray-300 bg-app-gray-350 p-4 text-left text-sm text-foreground [box-shadow:0_2px_8px_0_rgba(0,0,0,0.06)]">
        <TaskCompleteCheckbox id={task.id} completed={task.completed} />

        <div className="mr-auto">{task.title}</div>

        {task.color && (
          <div className="flex size-6 items-center justify-center">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: task.color }}
            />
            {foundTaskColor && (
              <span className="sr-only">Task color: {foundTaskColor.name}</span>
            )}
          </div>
        )}

        <button
          className="group relative z-10 flex size-6 items-center justify-center"
          onClick={handleDeleteClick}
        >
          <span className="sr-only">Delete task</span>
          <div className="[&_svg]:transition-colors [&_svg]:group-hover:fill-foreground">
            <TrashIcon />
          </div>
        </button>
      </div>
      <Link className="absolute inset-0" href={`/edit/${task.id}`}></Link>
    </div>
  );
}
