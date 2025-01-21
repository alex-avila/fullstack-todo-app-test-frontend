"use client";

import { useContext } from "react";
import { TasksContext } from "@/components/tasks-provider";
import { TaskCard } from "@/components/task-card";

export function Tasks() {
  const { tasks } = useContext(TasksContext);

  return (
    <div className="space-y-3">
      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      {tasks
        .filter((task) => task.completed)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  );
}
