import { z } from "zod";

export const taskSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(1).max(255),
  color: z.string().max(7).optional(),
  completed: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;
