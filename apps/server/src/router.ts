import { projectRouter } from "./modules/projects/project.router";
import { router } from "./trpc";
export const appRouter = router({
	projects: projectRouter,
});
export type AppRouter = typeof appRouter;
