import { reviewerProcedure, router } from "@/trpc";
import { claimProjectSchema, reviewSchema } from "./review.schema";
import { claimProjectController, reviewProjectController } from "./review.controller";

export const reviewRouter = router({
    claimProject: reviewerProcedure.input(claimProjectSchema).mutation(({ ctx, input }) => {
        return claimProjectController(ctx.session.user.id, input.projectId)
    }),
    reviewProject : reviewerProcedure.input(reviewSchema).mutation(({ctx, input})=>{
        return reviewProjectController(ctx.session.user.id, input.projectId, input.decision, input.comment)
    })
})