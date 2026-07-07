import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().trim().min(3, { message: "Title must be at least 3 characters." }),
    description: z.string().trim().max(500).optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]),
});

export type TaskInput = z.infer<typeof taskSchema>;