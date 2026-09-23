import { claimProject, reviewEscallateProjectService, reviewProject } from "./review.service";

export async function claimProjectController(
	reviewerId: string,
	projectId: string,
) {
	return claimProject(reviewerId, projectId);
}

export async function reviewProjectController(
	reviewerId: string,
	projectId: string,
	decision: string,
	comment: string,
) {
	return reviewProject(reviewerId, projectId, decision, comment);
}

export async function reviewEscallationController(

		reviewerId : string,
		projectId : string,
		reason : string,
	
) {
	return reviewEscallateProjectService({
		reviewerId,
		projectId,
		reason
	})
}
