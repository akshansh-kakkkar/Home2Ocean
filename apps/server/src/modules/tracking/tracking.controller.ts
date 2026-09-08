import { authorizeTracking, timeTrackingStatus } from "./tracking.service";

export async function authorizeTrackingController(
	createdById: string,
	startAt: Date,
	stopAt: Date,
) {
	return authorizeTracking(createdById, startAt, stopAt);
}

export async function timeTrackingStatusController() {
	return timeTrackingStatus();
}
