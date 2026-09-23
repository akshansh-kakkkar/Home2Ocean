import z from "zod";

export const reshipSchema = z.object({
    projectId : z.string(),
})