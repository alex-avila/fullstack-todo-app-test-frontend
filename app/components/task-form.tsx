"use client";

import { useTransition } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod";

import { Button } from "@/components/button";
import { PlusIcon } from "@/components/icons/plus-icon";
import { CheckmarkThickIcon } from "@/components/icons/checkmark-thick-icon";
import { Task, taskSchema } from "@/lib/schema";
import { createTaskAction, updateTaskAction } from "@/lib/actions";
import { config } from "@/lib/config";

type ZodFormType = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task?: Task;
}

export function TaskForm({ task }: TaskFormProps) {
  const form = useForm<ZodFormType>({
    resolver: zodResolver(taskSchema.pick({ title: true, color: true })),
    defaultValues: task ? { title: task.title, color: task.color } : {},
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ZodFormType> = (data) => {
    startTransition(async () => {
      try {
        if (!task) {
          await createTaskAction(data);
        } else {
          await updateTaskAction(
            { ...data, id: task.id },
            { withRedirect: true },
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Unexpected error: Unable to create task");
      }
    });
  };

  const handleColorChange = (value: string) => {
    form.setValue("color", value);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          className="block pb-3 text-sm font-bold text-app-blue"
          htmlFor="title"
        >
          Title
        </label>
        <input
          id="title"
          className="w-full rounded-lg border border-app-gray-300 bg-app-gray-350 p-4 text-sm [box-shadow:0_2px_8px_0_rgba(0,0,0,0.06)]"
          placeholder="Ex. Brush your teeth"
          {...form.register("title", { required: true })}
        />
        <ErrorMessage
          errors={form.formState.errors}
          name="title"
          render={({ message }) => (
            <p className="pt-2 text-sm text-red-500">{message}</p>
          )}
        />
      </div>

      <fieldset>
        <legend className="block pb-3 text-sm font-bold text-app-blue">
          Color
        </legend>
        <RadioGroup.Root
          aria-label="Color"
          className="flex flex-wrap gap-4"
          defaultValue={task?.color || ""}
          onValueChange={handleColorChange}
        >
          <RadioGroup.Item {...form.register("color")} hidden value="" />
          {config.colors.map((color) => (
            <div key={color.hex}>
              <RadioGroup.Item
                {...form.register("color")}
                value={color.hex}
                id={color.name}
                className="relative size-[3.25rem] rounded-full"
                style={{ backgroundColor: color.hex }}
              >
                <RadioGroup.Indicator className="absolute inset-0 z-10 rounded-full border-2 border-white" />
              </RadioGroup.Item>
              <label className="sr-only" htmlFor={color.name}>
                {color.name}
              </label>
            </div>
          ))}
        </RadioGroup.Root>
        <ErrorMessage
          errors={form.formState.errors}
          name="color"
          render={({ message }) => (
            <p className="pt-2 text-sm text-red-500">{message}</p>
          )}
        />
      </fieldset>
      <div className="pt-6">
        <Button type="submit" disabled={isPending}>
          {task
            ? isPending
              ? "Saving…"
              : "Save"
            : isPending
              ? "Adding task…"
              : "Add Task"}
          {task ? <CheckmarkThickIcon /> : <PlusIcon />}
        </Button>
      </div>
    </form>
  );
}
