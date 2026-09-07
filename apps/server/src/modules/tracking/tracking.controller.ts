import { authorizeTracking } from "./tracking.service";

export async function authorizeTrackingController(
	createdById: string,
	startAt: Date,
	stopAt: Date,
) {
	return authorizeTracking(createdById, startAt, stopAt);
}
