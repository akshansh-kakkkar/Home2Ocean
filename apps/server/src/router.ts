import { hackatimeRouter } from "./modules/hackatime/hackatime.router";
import { reviewerRouter } from "./modules/reviewer";
import { submissionRouter } from "./modules/submission/submission.router";
import { trackingRouter } from "./modules/tracking/tracking.router";
import { userRouter } from "./modules/users/user.router";
import { router } from "./trpc";
export const appRouter = router({
	user: userRouter,
	reviewers: reviewerRouter,
	tracking: trackingRouter,
	hackatime: hackatimeRouter,
	submission: submissionRouter,
});
export type AppRouter = typeof appRouter;
