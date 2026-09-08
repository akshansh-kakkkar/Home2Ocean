import z from "zod";

export const hackatimeProjectResponseSchema = z.object({
	projects: z.array(z.unknown()),
});

export type HackatimeProjectsResponse = z.infer<
	typeof hackatimeProjectResponseSchema
>;

export const hackatimeHoursResponseSchema = z.object({
	total_seconds: z.number(),
});

export const hackatimeUserSchema = z.object({
	id: z.number(),
	emails: z.string().array(),
	slack_id: z.string(),
	github_username: z.string(),
	trust_factor: z.object({
		trust_level: z.string(),
		trust_value: z.number(),
	}),
});
