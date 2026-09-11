import { claimProject } from "./review.service";

export async function claimProjectController(reviewerId : string, projectId : string,){
    claimProject(reviewerId, projectId)
}

export async function reviewProjectController(reviewerId: string, projectId: string, decision: string, comment: string,){
    reviewProjectController(reviewerId, projectId, comment, decision)
}