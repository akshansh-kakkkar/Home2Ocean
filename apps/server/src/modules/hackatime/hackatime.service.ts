import prisma from "@home2ocean/db";
import { hackatimeProjectResponseSchema } from "./hackatime.schema";

export async function getHackatimeProjects(userId: string) {
	const connection = await prisma.hackatimeConnection.findUnique({
		where: {
			userId,
		},
	});

	if (!connection) {
		return {
			success: false as const,
			error: "Hackatime is not connected",
			projects: [],
		};
	}
	try {
		const response = await fetch(
			"https://hackatime.hackclub.com/api/v1/authenticated/projects",
			{
				headers: {
					Authorization: `Bearer ${connection.accessToken}`,
				},
			},
		);
		if (!response.ok) {
			return {
				success: false as const,
				error: "Unable to fetch Hackatime projects",
				projects: [],
			};
		}
		const data = await hackatimeProjectResponseSchema.parse(
			await response.json(),
		);
		return {
			success: true as const,
			projects: data.projects,
		};
	} catch {
		return {
			success: false as const,
			error: "Unable to reach Hackatime. Please try again.",
			projects: [],
		};
	}
}
