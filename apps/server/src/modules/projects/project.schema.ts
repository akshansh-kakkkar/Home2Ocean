import { z } from "zod";


export const projectSchema = z.object({
    id : z.string(),
    userId : z.string(),
    title : z.string(),
    description : z.string(),
    githubUrl : z.string(),
    demoUrl : z.string(),
    bannerUrl : z.string().url(),
    status : z.enum([
        "DRAFT",
        "UNDER_REVIEW",
        "APPROVED",
        "REJECTED",
        "PERMANENTLY_REJECTED",
    ]),
    createdAt : z.string(),
    updatedAt : z.string(),
})

export const createProjectSchema = z.object({
    title : z.string().min(1).max(100),
    description : z.string().min(1).max(5000),
    githubUrl : z.string().url(),
    demoUrl : z.string().url(),
    bannerUrl : z.string().url(),

})