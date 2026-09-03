import prisma from "@home2ocean/db";
import type { Project } from "@home2ocean/db"
import { randomUUIDv7 } from "bun";

export async function createProject(
    userId: string,
    data: {
        title: string,
        description: string,
        githubUrl: string,
        demoUrl: string,
        bannerUrl?: string,
    }
): Promise<Project> {
    return prisma.project.create({
        data : {
            id : randomUUIDv7(),
            userId,
            title : data.title,
            description : data.description,
            githubUrl : data.githubUrl,
            demoUrl : data.demoUrl,
            bannerUrl : data.bannerUrl
        }
    })
}