import { protectedProcedure, router } from "@/trpc";
import {
	submitProjectController,
	withDrawProjectController,
} from "./submission.controller";
import {
	submitProjectSchema,
	withDrawProjectSchema,
} from "./submission.schema";

export const submissionRouter = router({
	submitProject: protectedProcedure
		.input(submitProjectSchema)
		.mutation(async ({ ctx, input }) => {
			return submitProjectController(ctx.session.user.id, input.projectId);
		}),
	withdrawProject: protectedProcedure
		.input(withDrawProjectSchema)
		.mutation(async ({ ctx, input }) => {
			return withDrawProjectController(ctx.session.user.id, input.projectId);
		}),
});
