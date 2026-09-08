import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";
import {
	hackatimeHoursResponseSchema,
	hackatimeProjectResponseSchema,
	hackatimeUserSchema,
	latestHackatimeHeartbeatsSchema,
} from "./hackatime.schema";

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
		const data = hackatimeProjectResponseSchema.parse(await response.json());
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

export async function getHackatimeHours(
	userId: string,
	startDate: Date,
	endDate: Date,
) {
	const connection = await prisma.hackatimeConnection.findUnique({
		where: {
			userId,
		},
	});
	if (!connection) {
		throw new Error("Hackatime is not connected");
	}
	try {

		const start = startDate.toISOString().split("T")[0];
		const end = endDate.toISOString().split("T")[0];
		const response = await fetch(
			`https://hackatime.hackclub.com/api/v1/authenticated/hours?start_date=${start}&end_date=${end}`,
			{
				headers: {
					Authorization: `Bearer ${connection.accessToken}`,
				},
			},
		);
		if (!response.ok) {
			throw new Error("Unable to fetch Hackatime hours");
		}
		const data = hackatimeHoursResponseSchema.parse(await response.json());
		return data;
	}
	catch {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Failed to get Hackatime Hours"
		})
	}
}

export async function getHackatimeUser(userId: string) {
	const connection = await prisma.hackatimeConnection.findUnique({
		where: {
			userId,
		},
	});

	if (!connection) {
		return {
			success: false as const,
			error: "Unable to reach hackatime.",
		};
	}
	try {
		const response = await fetch(
			"https://hackatime.hackclub.com/api/v1/authenticated/me",
			{
				headers: {
					Authorization: `Bearer ${connection.accessToken}`,
				},
			},
		);
		if (!response.ok) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Failed to fetch hackatime heartbeats.",
			});
		}
		const data = hackatimeUserSchema.parse(await response.json());

		return data;
	}
	catch (error) {
		if (error instanceof TRPCError) {
			throw error;
		}
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Failed to fetch hackatime data"
		})
	}
}


export async function getHackatimeHeartBeats(userId: string) {
	const connection = await prisma.hackatimeConnection.findUnique({
		where: {
			userId,
		}
	})
	if (!connection) {
		return {
			success: false as const,
			error: "Unable to get heatbeats"
		}
	}
	try {
		const response = await fetch("https://hackatime.hackclub.com/api/v1/authenticated/heartbeats/latest", {
			headers: {
				Authorization: `Bearer ${connection.accessToken}`
			}
		})

		if (!response.ok) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Failed to fetch hackatime heartbeats.",
			});
		}

		const data = latestHackatimeHeartbeatsSchema.parse(await response.json());
		return data;

	} catch (error) {
		if (error instanceof TRPCError) {
			throw error;
		}
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Failed to fetch hackatime heartbeats"
		})
	}
}

export async function getHackatimeProject(userId: string, id: string, hackatimeProjectName: string) {
	const connection = await prisma.hackatimeConnection.findUnique({
		where: {
			userId,
		}
	})

	if (!connection) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "This connection does not exist",
		});
	}
	const project = await prisma.project.findUnique({
		where: {
			id
		}
	})

	if (!project) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "This project does not exists."
		})
	}

	if (project.userId !== userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You don't have permissions to use this project."
		})
	}
	const hackatimeProjects = await getHackatimeProjects(userId);

	if (!hackatimeProjects.success) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Projects not found"
		})
	}

	const hackatimeProject = hackatimeProjects.projects.find(
		(project) => project.name === hackatimeProjectName
	)

	if (!hackatimeProject) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Project not found",
		})
	}

	return hackatimeProject;

}