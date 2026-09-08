import { protectedProcedure, router } from "@/trpc";
import {
	getHackatimeConnectionController,
	getHackatimeUserController,
} from "./hackatime.controller";

export const hackatimeRouter = router({
	projects: protectedProcedure.query(async ({ ctx }) => {
		return getHackatimeConnectionController(ctx.session.user.id);
	}),
	getUser: protectedProcedure.query(async ({ ctx }) => {
		return getHackatimeUserController(ctx.session.user.id);
	}),
});
