"use client";

import Link from "next/link";
import { useContext } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";

import type { Task } from "@/lib/schema";
import { deleteTaskAction } from "@/lib/actions";
import { config } from "@/lib/config";
import { TasksContext } from "@/components/tasks-provider";

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

      <div className="flex items-center justify-center size-6">
        <Checkbox.Root
          className="group relative z-10 size-6 flex justify-center items-center"
          checked={completed}
          onCheckedChange={updateTask.bind(null, id)}
        >
          <div className="relative z-10 size-[1.125rem] rounded-full border-2 border-app-blue group-data-[state=checked]:border-app-purple group-data-[state=checked]:bg-app-purple">
            <Checkbox.Indicator />
          </div>
        </Checkbox.Root>
      </div>
    </div>
  );
}

export function TaskCard({ task }: TaskProps) {
  const foundTaskColor = config.colors.find(
    (color) => color.hex === task.color,
  );

  return (
    <div className="relative">
      <div className="flex gap-3 rounded-lg bg-app-gray-350 border border-app-gray-300 p-4 text-left text-foreground text-sm [box-shadow:0_2px_8px_0_rgba(0,0,0,0.06)]">
        <TaskCompleteCheckbox id={task.id} completed={task.completed} />

        <div className="mr-auto">{task.title}</div>

        {task.color && (
          <div className="size-6 flex justify-center items-center">
            <span
              className="size-[1.125rem] rounded-full"
              style={{ backgroundColor: task.color }}
            />
            {foundTaskColor && (
              <span className="sr-only">Task color: {foundTaskColor.name}</span>
            )}
          </div>
        )}

        <button
          className="relative z-10 size-6 flex justify-center items-center"
          onClick={() => deleteTaskAction({ id: task.id })}
        >
          <span className="sr-only">Delete task</span>
          <span>X</span>
        </button>
      </div>
      <Link className="absolute inset-0" href={`/edit/${task.id}`}></Link>
    </div>
  );
}
