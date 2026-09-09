import type { Project } from "@home2ocean/db";
import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";
import { randomUUIDv7 } from "bun";

export async function createProject(
	userId: string,
	data: {
		title: string;
		description: string;
		githubUrl: string;
		demoUrl: string;
		bannerUrl?: string;
	},
): Promise<Project> {
	return prisma.project.create({
		data: {
			id: randomUUIDv7(),
			userId,
			title: data.title,
			description: data.description,
			githubUrl: data.githubUrl,
			demoUrl: data.demoUrl,
			bannerUrl: data.bannerUrl,
		},
	});
}

export async function getProject(
	id: string,
	userId: string,
): Promise<Project | null> {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
	});

	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "You are not allowed fetch this project.",
		});
	}
	if (project.userId !== userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You cannot access this.",
		});
	}

	return project;
}

export async function editProject(
	id: string,
	userId: string,
	data: {
		title?: string;
		description?: string;
		demoUrl?: string;
		githubUrl?: string;
		bannerUrl?: string;
	},
): Promise<Project | null> {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
	});

	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Project not found",
		});
	}

	if (project.userId !== userId) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "You do not have permissions to access this project.",
		});
	}
	return prisma.project.update({
		where: {
			id,
		},
		data,
	});
}

export async function deleteProject(
	id: string,
	userId: string,
): Promise<Project | null> {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
	});

	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "You are not allowed to access this project.",
		});
	}

	if (project.userId !== userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You don't own this project.",
		});
	}
	return prisma.project.delete({
		where: { id },
	});
}

export async function getAllProjects(userId: string): Promise<Project[]> {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			role: true,
		},
	});

	if (!user) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "User not found",
		});
	}

	if (user.role === "REVIEWER" || user.role === "ADMIN") {
		return prisma.project.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
	}
	return prisma.project.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

// export async function startProjectTracking(
// 	id: string,
// 	userId: string,
// 	stopAt: Date,
// ): Promise<Project> {
// 	const project = await prisma.project.findUnique({
// 		where: { id },
// 	});

// 	if (!project) {
// 		throw new TRPCError({
// 			code: "NOT_FOUND",
// 			message: "Project not found",
// 		});
// 	}

// 	if (project.userId !== userId) {
// 		throw new TRPCError({
// 			code: "FORBIDDEN",
// 			message: "You do not own this project",
// 		});
// 	}

// 	if (project.hackatimeStartedAt) {
// 		throw new TRPCError({
// 			code: "CONFLICT",
// 			message: "Tracking has already started",
// 		});
// 	}
// 	if (stopAt <= new Date()) {
// 		throw new TRPCError({
// 			code: "BAD_REQUEST",
// 			message: "Stop time must be in the future",
// 		});
// 	}
// 	return prisma.project.update({
// 		where: { id },
// 		data: {
// 			hackatimeStartedAt: new Date(),
// 			hackatimeEndedAt: stopAt,
// 		},
// 	});
// }
