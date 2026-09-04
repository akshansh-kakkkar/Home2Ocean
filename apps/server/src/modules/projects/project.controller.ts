import { createProject, getProject } from "./project.service"
import type { Project } from "@home2ocean/db"

export async function createProjectController(
    userId: string,
    data: {
        title: string;
        description: string;
        bannerUrl?: string;
        githubUrl: string;
        demoUrl: string;
    }): Promise<Project> {
    return createProject(userId, data)
}

export async function getProjectController(
    id : string

): Promise<Project | null> {
    return getProject(id)
}