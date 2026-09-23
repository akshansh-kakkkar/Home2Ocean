import z from "zod";

export const adminSchema = z.object({
    projectId : z.string(),
    decision :  z.enum([
        "PROJECT_APPROVED",
        "PROJECT_REJECTED",
        "PROJECT_PERMANENTLY_REJECTED"
    ]),
    comment : z.string(),
})