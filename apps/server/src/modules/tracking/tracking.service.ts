import type { TimeTrack } from "@home2ocean/db";
import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";
import { randomUUIDv7 } from "bun";
export async function authorizeTracking(
	createdById: string,
	startAt: Date,
	stopAt: Date,
): Promise<TimeTrack> {
	if (stopAt <= startAt) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Stop time must be after start time.",
		});
	}
	const id = randomUUIDv7();

	const existingTimeTrack = await prisma.timeTrack.findFirst({
		where: {
			AND: [
				{
					startAt: {
						lt: stopAt,
					},
				},
				{
					stopAt: {
						gt: startAt,
					},
				},
			],
		},
	});
	if (existingTimeTrack) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Cant create a new start track that overlaps the existing one.",
		});
	}

	const track = await prisma.timeTrack.create({
		data: {
			id,
			createdById,
			startAt,
			stopAt,
		},
	});
	return track;
}
