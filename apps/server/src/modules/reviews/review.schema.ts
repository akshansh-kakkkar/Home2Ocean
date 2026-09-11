import z from "zod";

export const reviewSchema = z.object({
    projectId: z.string(),
    decision: z.enum(["PROJECT_APPROVED", "PROJECT_REJECTED", "PROJECT_PERMANENTLY_REJECTED"]),
    comment: z.string(),
});

export const claimProjectSchema = z.object({
    projectId : z.string(),
})