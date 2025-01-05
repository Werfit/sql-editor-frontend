import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name must have at least 1 character",
    })
    .trim(),
});

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;
