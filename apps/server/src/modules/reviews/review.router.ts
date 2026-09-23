import { reviewerProcedure, router } from "@/trpc";
import {
	claimProjectController,
	reviewEscallationController,
	reviewProjectController,
} from "./review.controller";
import { claimProjectSchema, reviewEscallationSchema, reviewSchema } from "./review.schema";

export const reviewRouter = router({
	claimProject: reviewerProcedure
		.input(claimProjectSchema)
		.mutation(({ ctx, input }) => {
			return claimProjectController(ctx.session.user.id, input.projectId);
		}),
	reviewProject: reviewerProcedure
		.input(reviewSchema)
		.mutation(({ ctx, input }) => {
			return reviewProjectController(
				ctx.session.user.id,
				input.projectId,
				input.decision,
				input.comment,
			);
		}),
	reviewEscalation : reviewerProcedure.input(reviewEscallationSchema).mutation(
		({ctx, input})=>{
			return reviewEscallationController(
				ctx.session.user.id,
				input.projectId,
				input.reason,
			)
		}
	)
});
