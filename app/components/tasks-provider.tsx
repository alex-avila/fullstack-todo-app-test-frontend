"use client";

import { createContext } from "react";

import { Task } from "@/lib/schema";
import { updateTaskAction } from "@/lib/actions";

interface TaskContextProps {
  tasks: Task[];
  updateTask: (id: number, completed: boolean) => Promise<void>;
}

export const TasksContext = createContext<TaskContextProps>(
  {} as TaskContextProps,
);

interface TasksProviderProps {
  initialTasks: Task[];
  children?: React.ReactNode;
}

export function TasksProvider({ initialTasks, children }: TasksProviderProps) {
  const updateTaskLocal = async (id: number, completed: boolean) => {
    try {
      await updateTaskAction({ id, completed });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks: initialTasks, updateTask: updateTaskLocal }}
    >
      {children}
    </TasksContext.Provider>
  );
}
