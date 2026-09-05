import type { Project } from "@home2ocean/db";
import {
	createProject,
	deleteProject,
	editProject,
	getAllProjects,
	getProject,
} from "./project.service";

export async function createProjectController(
	userId: string,
	data: {
		title: string;
		description: string;
		bannerUrl?: string;
		githubUrl: string;
		demoUrl: string;
	},
): Promise<Project> {
	return createProject(userId, data);
}

export async function getProjectController(
	id: string,
): Promise<Project | null> {
	return getProject(id);
}

export async function editProjectController(
	id: string,
	data: {
		title?: string;
		description?: string;
		githubUrl?: string;
		demoUrl?: string;
		bannerUrl?: string;
	},
): Promise<Project | null> {
	return editProject(id, data);
}

export async function deleteProjectController(
	id: string,
): Promise<Project | null> {
	return deleteProject(id);
}

export async function getAllProjectsController(): Promise<Project[]> {
	return getAllProjects();
}
