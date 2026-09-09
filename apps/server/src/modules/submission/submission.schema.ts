import z from "zod";

export const submitProjectSchema = z.object({
	projectId: z.string(),
});

export const withDrawProjectSchema = z.object({
	projectId: z.string(),
});
