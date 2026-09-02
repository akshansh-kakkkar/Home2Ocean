import z from "zod";

export const createProjectSchema = z.object({
    title : z.string().min(1).max(100),
    description : z.string().min(1).max(5000),
    githubUrl : z.string().url(),
    demoUrl : z.string().url(),
    bannerUrl : z.string().url().optional(),
})