import { permissionProcedure, protectedProcedure, router } from "@/trpc";
import {
	authorizeTrackingController,
	timeTrackingStatusController,
} from "./tracking.controller";
import { authorizeTrackingSchema } from "./tracking.schema";

export const trackingRouter = router({
	authorize: permissionProcedure("MANAGE_TRACKING")
		.input(authorizeTrackingSchema)
		.mutation(async ({ ctx, input }) => {
			return authorizeTrackingController(
				ctx.session.user.id,
				input.startAt,
				input.stopAt,
			);
		}),
	trackingStatus: protectedProcedure.query(() => {
		return timeTrackingStatusController();
	}),
});
