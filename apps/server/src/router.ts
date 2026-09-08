import { hackatimeRouter } from "./modules/hackatime/hackatime.router";
import { reviewerRouter } from "./modules/reviewer";
import { trackingRouter } from "./modules/tracking/tracking.router";
import { userRouter } from "./modules/users/user.router";
import { router } from "./trpc";
export const appRouter = router({
	user: userRouter,
	reviewers: reviewerRouter,
	tracking: trackingRouter,
	hackatimeRouter : hackatimeRouter
});
export type AppRouter = typeof appRouter;
