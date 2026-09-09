import { protectedProcedure, router } from "@/trpc";
import { exploreProjectsController } from "./explore.controller";
import { exploreProjectResponseSchema } from "./explore.schema";

export const exploreRouter = router({
	exploreProjects: protectedProcedure
		.output(exploreProjectResponseSchema)
		.query(() => {
			return exploreProjectsController();
		}),
});
