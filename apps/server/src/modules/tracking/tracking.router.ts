import { permissionProcedure, router } from "@/trpc";
import { authorizeTrackingController } from "./tracking.controller";
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
});
