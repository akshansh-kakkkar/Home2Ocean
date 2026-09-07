import { hackatimeRouter } from "./modules/hackatime/hackatime.router";
import { projectRouter } from "./modules/projects/project.router";
import { router } from "./trpc";
export const appRouter = router({
	projects: projectRouter,
	hackatime: hackatimeRouter,
});
export type AppRouter = typeof appRouter;
