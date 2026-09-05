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

export async function getProject(id: string): Promise<Project | null> {
	return prisma.project.findUnique({
		where: {
			id,
		},
	});
}

export async function editProject(
	id: string,
	data: {
		title?: string;
		description?: string;
		demoUrl?: string;
		githubUrl?: string;
		bannerUrl?: string;
	},
): Promise<Project | null> {
	return prisma.project.update({
		where: {
			id,
		},
		data,
	});
}

export async function deleteProject(id: string): Promise<Project | null> {
	return prisma.project.delete({
		where: {
			id,
		},
	});
}

export async function getAllProjects(): Promise<Project[]> {
	return prisma.project.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
}

export async function startProjectTracking(
	id: string,
	userId: string,
): Promise<Project> {
	const project = await prisma.project.findUnique({
		where: { id },
	});

	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Project not found",
		});
	}

	if (project.userId !== userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You do not own this project",
		});
	}

	if (project.hackatimeStartedAt) {
		throw new TRPCError({
			code: "CONFLICT",
			message: "Tracking has already started",
		});
	}
	return prisma.project.update({
		where: { id },
		data: {
			hackatimeStartedAt: new Date(),
		},
	});
}
