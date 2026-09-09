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
	userId: string,
): Promise<Project | null> {
	return getProject(id, userId);
}

export async function editProjectController(
	id: string,
	userId: string,
	data: {
		title?: string;
		description?: string;
		githubUrl?: string;
		demoUrl?: string;
		bannerUrl?: string;
	},
): Promise<Project | null> {
	return editProject(id, userId, data);
}

export async function deleteProjectController(
	id: string,
	userId: string,
): Promise<Project | null> {
	return deleteProject(id, userId);
}

export async function getAllProjectsController(
	userId: string,
): Promise<Project[]> {
	return getAllProjects(userId);
}

// export async function startProjectTrackingController(
// 	id: string,
// 	userId: string,
// 	stopAt: Date,
// ): Promise<Project> {
// 	return startProjectTracking(id, userId, stopAt);
// }
