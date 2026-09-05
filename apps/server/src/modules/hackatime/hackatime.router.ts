import { protectedProcedure, router } from "@/trpc";
import { getHackatimeConnectionController } from "./hackatime.controller";

export const hackatimeRouter = router({
	projects: protectedProcedure.query(async ({ ctx }) => {
		return getHackatimeConnectionController(ctx.session.user.id);
	}),
});
