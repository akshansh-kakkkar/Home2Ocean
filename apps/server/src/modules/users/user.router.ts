import { router } from "@/trpc";
import { hackatimeRouter } from "../hackatime/hackatime.router";
import { projectRouter } from "../projects/project.router";

export const userRouter = router({
	projects: projectRouter,
	hackatime: hackatimeRouter,
});
