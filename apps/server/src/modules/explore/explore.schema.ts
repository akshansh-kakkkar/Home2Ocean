import z from "zod";

export const exploreProjectsSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	bannerUrl: z.string().nullable(),
	demoUrl: z.string(),
	githubUrl: z.string(),
	status: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ExploreProject = z.infer<typeof exploreProjectsSchema>;

export const exploreProjectResponseSchema = exploreProjectsSchema.array();
