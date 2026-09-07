import z from "zod";

export const authorizeTrackingSchema = z
	.object({
		startAt: z.date(),
		stopAt: z.date(),
	})
	.refine((data) => data.stopAt > data.startAt, {
		message: "Stop time must be after start time.",
		path: ["stopAt"],
	});
