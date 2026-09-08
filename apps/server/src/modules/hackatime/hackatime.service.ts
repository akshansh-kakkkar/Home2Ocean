import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";
import { response } from "express";
import {
	hackatimeHoursResponseSchema,
	hackatimeProjectResponseSchema,
	hackatimeUserSchema,
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
			message: "Failed to fetch user from hackatime User string",
		});
	}

	const data = hackatimeUserSchema.parse(await response.json());

	return data;
}
