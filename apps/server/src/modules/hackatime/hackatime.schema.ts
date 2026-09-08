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

export const latestHackatimeHeartbeatsSchema = z.object({
	id : z.string(),
	created_at : z.string().datetime(),
	time : z.string().datetime(),
	category : z.string(),
	project : z.string(),
	language : z.string(),
	editor : z.string(),
	operating_system : z.string(),
	machine : z.string(),
	entity : z.string(),
}).nullable()