import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";
import type { ProjectStatus } from "../../../../../packages/db/prisma/generated/enums";
import { randomUUIDv7 } from "bun";

export async function adminReviewEscallation({
    adminId,
    projectId,
    decision,
    comment }: {
        adminId: string,
        projectId: string,
        decision:
        | "PROJECT_APPROVED"
        | "PROJECT_REJECTED"
        | "PROJECT_PERMANENTLY_REJECTED",
        comment: string,
    }) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    });

    if (!project) {
        throw new TRPCError({
            message: "Project not found",
            code: "NOT_FOUND"
        })
    }

    if (project.status !== "ESCALATED") {
        throw new TRPCError({
            message: "Project is not escalated",
            code: "BAD_REQUEST",
        })
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

    const result = await prisma.$transaction(async (tx)=>{
        await tx.project.update({
            where : {
                id : projectId,
            },
            data : {
                status : newStatus,
            }
        })

        await tx.review.create({
            data : {
                id : randomUUIDv7(),
                reviewerId : adminId,
                projectId : projectId,                
                decision : decision,
                comment : comment,
            }
        })
    })

    return result;
}