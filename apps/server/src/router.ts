import { hackatimeRouter } from "./modules/hackatime/hackatime.router";
import { projectRouter } from "./modules/projects/project.router";
import { adminProcedure, router } from "./trpc";
export const appRouter = router({
	projects: projectRouter,
	hackatime: hackatimeRouter,
	adminTest: adminProcedure.query(({ ctx }) => {
		return {
			message: "You are an admin!",
			userId: ctx.session.user.id,
		};
	}),
});
export type AppRouter = typeof appRouter;
