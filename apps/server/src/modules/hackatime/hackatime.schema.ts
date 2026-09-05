import z from "zod";

export const hackatimeProjectResponseSchema = z.object({
	projects: z.array(z.unknown()),
});

export type HackatimeProjectsResponse = z.infer<
	typeof hackatimeProjectResponseSchema
>;
