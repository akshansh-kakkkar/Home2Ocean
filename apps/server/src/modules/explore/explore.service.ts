import prisma from "@home2ocean/db";
import type { ExploreProject } from "./explore.schema";

export async function exploreProjects(): Promise<ExploreProject[]> {
	const projects = await prisma.project.findMany({
		where: {
			status: {
				notIn: ["REJECTED", "PERMANENTLY_REJECTED", "UNDER_REVIEW", "DRAFT"],
			},
		},
		select: {
			id: true,
			title: true,
			description: true,
			bannerUrl: true,
			githubUrl: true,
			demoUrl: true,
			status: true,
			createdAt: true,
			updatedAt: true,
		},
	});
	return projects;
}
