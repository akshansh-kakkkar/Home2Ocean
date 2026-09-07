import { router } from "@/trpc";
import { projectRouter } from "../projects/project.router";
import { hackatimeRouter } from "../hackatime/hackatime.router";

export const userRouter = router({
    projects: projectRouter,
    hackatime: hackatimeRouter,
});