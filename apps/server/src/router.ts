import { reviewerRouter } from "./modules/reviewer";
import { userRouter } from "./modules/users/user.router";
import { router } from "./trpc";
export const appRouter = router({
	user : userRouter,
	reviewers : reviewerRouter,
});
export type AppRouter = typeof appRouter;
