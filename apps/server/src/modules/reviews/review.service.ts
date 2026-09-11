import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";
import { randomUUIDv7 } from "bun";
import type { ProjectStatus } from "../../../../../packages/db/prisma/generated/enums";
export async function claimProject(projectId: string, reviewerId: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    const reviewClaim = await prisma.reviewClaim.findUnique({
        where: {
            projectId: projectId,
        }
    });

    if (!project) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Failed to find this project.",
        })
    }

    if (project.status !== "UNDER_REVIEW") {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "This Project is not under review",
        })
    }

    if (reviewClaim) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "This project is already claimed"
        })
    }

    return prisma.reviewClaim.create({
        data: {
            id: randomUUIDv7(),
            projectId: projectId,
            reviewerId: reviewerId
        }
    })
}

export async function reviewProject(reviewerId: string, projectId: string, decision: string, comment: string,) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    const reviewClaim = await prisma.reviewClaim.findUnique({
        where: {
            projectId: projectId
        }
    })

    if (!project) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project not found",
        });
    }
    if (project.status !== "UNDER_REVIEW") {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "This project is not under review"
        })
    }

    if (!reviewClaim) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "This project is not claimed"
        })
    }

    if (reviewClaim.reviewerId !== reviewerId) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "You did not claim this project",
        })
    }

    let newStatus: ProjectStatus;

    switch (decision) {
        case "PROJECT_APPROVED":
            newStatus = "APPROVED";
            break;
        case "PROJECT_REJECTED":
            newStatus = "REJECTED";
            break
        case "PROJECT_PERMANENTLY_REJECTED":
            newStatus = "PERMANENTLY_REJECTED";
            break;
        default:
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid review decision"
            })
    }
    const result = await prisma.$transaction(async (tx) => {

        await tx.project.update({
            where: {
                id: projectId,
            },
            data: {
                status: newStatus,
            }
        })

        await tx.review.create({
            data: {
                id: randomUUIDv7(),
                projectId: projectId,
                decision: decision,
                reviewerId: reviewerId,
                comment: comment,
            }
        })

        await tx.reviewClaim.delete({
            where: {
                projectId: projectId
            }
        })

    })

    return result
}
