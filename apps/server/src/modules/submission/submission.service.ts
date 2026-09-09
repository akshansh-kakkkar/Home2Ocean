import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";

export async function submitProject(userId: string, id: string) {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
	});
	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Project not found.",
		});
	}

	if (project.userId !== userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "This user cannot access this project.",
		});
	}

	if (project.status !== "DRAFT") {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "This project is already submitted you cannot call this action",
		});
	}

	await prisma.project.update({
		where: {
			id,
		},
		data: {
			status: "UNDER_REVIEW",
		},
	});
	return { success: true };
}

export async function withdrawProject(userId: string, id: string) {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
	});
	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "No Project Found",
		});
	}
	if (project.userId !== userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "This user cannot access this project",
		});
	}
	if (project.status !== "UNDER_REVIEW") {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message:
				"This project is not under review you cannot withdraw this from review que.",
		});
	}
	await prisma.project.update({
		where: {
			id,
		},
		data: {
			status: "DRAFT",
		},
	});
	return { success: true };
}
