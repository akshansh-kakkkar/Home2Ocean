import { protectedProcedure, router } from "@/trpc";
import {
	getHackatimeConnectionController,
	getHackatimeHeartbeatController,
	getHackatimeUserController,
	getHacktimeProjectController,
} from "./hackatime.controller";
import { associateHackatimeProjectSchema } from "./hackatime.schema";

export const hackatimeRouter = router({
	projects: protectedProcedure.query(async ({ ctx }) => {
		return getHackatimeConnectionController(ctx.session.user.id);
	}),
	getUser: protectedProcedure.query(async ({ ctx }) => {
		return getHackatimeUserController(ctx.session.user.id);
	}),
	getHeartBeats: protectedProcedure.query(async ({ ctx }) => {
		return getHackatimeHeartbeatController(ctx.session.user.id);
	}),
	gethackatimeProjectController: protectedProcedure
		.input(associateHackatimeProjectSchema)
		.mutation(async ({ ctx, input }) => {
			return getHacktimeProjectController(
				ctx.session.user.id,
				input.projectId,
				input.hackatimeProjectName,
			);
		}),
});
