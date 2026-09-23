import { adminReviewEscallation } from "./admin.service";
export type AdminReviewDecision = | "PROJECT_APPROVED" | "PROJECT_REJECTED" | "PROJECT_PERMANENTLY_REJECTED";

export async function adminReviewEscallationController({
    adminId,
    projectId,
    decision,
    comment,
} : {
    adminId : string,
    projectId : string,
    decision : AdminReviewDecision,
    comment : string
}) {
    return adminReviewEscallation({
        adminId,
        projectId,
        decision,
        comment,
    })
}