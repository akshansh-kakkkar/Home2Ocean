import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";
import { randomUUIDv7 } from "bun";
import type { ProjectStatus } from "../../../../../packages/db/prisma/generated/enums";
import { getHackatimeProjects } from "../hackatime/hackatime.service";

export async function claimProject(projectId: string, reviewerId: string) {
	const project = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
	});

	const reviewClaim = await prisma.reviewClaim.findUnique({
		where: {
			projectId: projectId,
		},
	});

	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Failed to find this project.",
		});
	}

	if (project.status !== "UNDER_REVIEW") {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "This Project is not under review",
		});
	}

	if (reviewClaim) {
		throw new TRPCError({
			code: "CONFLICT",
			message: "This project is already claimed",
		});
	}

	return prisma.reviewClaim.create({
		data: {
			id: randomUUIDv7(),
			projectId: projectId,
			reviewerId: reviewerId,
		},
	});
}

export async function reviewProject(
	reviewerId: string,
	projectId: string,
	decision: string,
	comment: string,
) {
	const project = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
	});

	const reviewClaim = await prisma.reviewClaim.findUnique({
		where: {
			projectId: projectId,
		},
	});

	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Project not found",
		});
	}
	if (project.status !== "UNDER_REVIEW") {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "This project is not under review",
		});
	}

	if (!reviewClaim) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "This project is not claimed",
		});
	}

	if (reviewClaim.reviewerId !== reviewerId) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You did not claim this project",
		});
	}

	let newStatus: ProjectStatus;

	switch (decision) {
		case "PROJECT_APPROVED":
			newStatus = "APPROVED";
			break;
		case "PROJECT_REJECTED":
			newStatus = "REJECTED";
			break;
		case "PROJECT_PERMANENTLY_REJECTED":
			newStatus = "PERMANENTLY_REJECTED";
			break;
		default:
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Invalid review decision",
			});
	}

	let totalSeconds: number | undefined;

	if (decision === "PROJECT_APPROVED") {
		if (!project.hackatimeProjectName) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Project is not associated with hackatime project."
			})
		}

		const hackatimeProject = await getHackatimeProjects(project.userId);

		if (!hackatimeProject.success) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Unable to fetch hackatime project data."
			})
		}

		const hackatimeProjects = hackatimeProject.projects.find(
			(item) => item.name === project.hackatimeProjectName,
		);

		if (!hackatimeProjects) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Associated hackatime projects not found."
			})
		}

		totalSeconds = hackatimeProjects.total_seconds
	}

	const result = await prisma.$transaction(async (tx) => {
		await tx.project.update({
			where: {
				id: projectId,
			},
			data: {
				status: newStatus,
				...(totalSeconds !== undefined && {
					lastReviewedHackatimeSeconds: totalSeconds,
				}),
			},
		});

		await tx.review.create({
			data: {
				id: randomUUIDv7(),
				projectId: projectId,
				decision: decision,
				reviewerId: reviewerId,
				comment: comment,
			},
		});

		await tx.reviewClaim.delete({
			where: {
				projectId: projectId,
			},
		});
	});

	return result;
}

export async function reviewEscallateProjectService({
	reviewerId,
	projectId,
	reason,
}: {
	reviewerId: string;
	projectId: string;
	reason: string;
}) {
	const project = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
	});

	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Project not found",
		});
	}

	if (project.status !== "UNDER_REVIEW") {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Project is not under review."
		})
	}

	const reviewClaim = await prisma.reviewClaim.findUnique({
		where: {
			projectId: projectId,
		}
	})

	if (!reviewClaim) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Project is not claimed",
		})
	}

	if (reviewClaim.reviewerId !== reviewerId) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You are not allowed to perform this action"
		})
	}

	const result = await prisma.$transaction(async (tx) => {
		await tx.project.update({
			where: {
				id: projectId,
			},
			data: {
				status: "ESCALATED"
			},
		});
		await tx.reviewEscalation.create({
			data: {
				id: randomUUIDv7(),
				projectId: projectId,
				reviewerId: reviewerId,
				reason: reason,
			}
		})

		await tx.reviewClaim.delete({

			where: {
				projectId: projectId,
			}
		})
		{ success: true }
	})

	return result;
}
