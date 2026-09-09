import { submitProject, withdrawProject } from "./submission.service";

export async function submitProjectController(
	userId: string,
	projectId: string,
) {
	return submitProject(userId, projectId);
}

export async function withDrawProjectController(
	userId: string,
	projectId: string,
) {
	return withdrawProject(userId, projectId);
}
