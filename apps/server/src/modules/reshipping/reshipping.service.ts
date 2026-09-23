import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";

export async function reshipping({ userId, projectId, }: { userId: string, projectId: string }) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        },
    })

    if (!project) {
        throw new TRPCError({
            message: "Project not found",
            code: "NOT_FOUND"
        })
    }

    if (project.userId !== userId) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "You cannot reship this project."
        })
    }

    if (project.status === "DRAFT") {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Project cannot be reship at the moment."
        })
    }

    if (project.status === "UNDER_REVIEW") {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Project cannot be reshiped at the moment."
        })
    }

    if (project.status === "ESCALATED") {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Project cannot be reshipped at the moment."
        })
    }

    if (project.status === "PERMANENTLY_REJECTED") {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Project cannot be reshipped at the moment."
        })
    }

    if (project.status === "APPROVED") {
        const approvalReview = await prisma.review.findFirst({
            where: {
                projectId: projectId,
                decision: "PROJECT_APPROVED",
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!approvalReview) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Approved project as no approval review."
            })
        }
        const timeTrack = await prisma.timeTrack.findMany({
            where: {
                stopAt: {
                    gt: approvalReview.createdAt
                }
            }
        })

    }


    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            status: "UNDER_REVIEW",
        }
    })

    return updatedProject;
}