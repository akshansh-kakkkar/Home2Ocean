import { adminProcedure, router } from "@/trpc";
import { adminSchema } from "./admin.schema";
import { adminReviewEscallationController } from "./admin.controller";

export const adminRouter = router({
    adminReview: adminProcedure.input(adminSchema).mutation(({ctx, input}) => {
        return adminReviewEscallationController({
            adminId: ctx.session.user.id,
            projectId: input.projectId,
            decision: input.decision,
            comment: input.comment
        })
    })
})