import type { Project } from "@home2ocean/db";
import {
	getHackatimeHeartBeats,
	getHackatimeProject,
	getHackatimeProjects,
	getHackatimeUser,
} from "./hackatime.service";

export async function getHackatimeConnectionController(userId: string) {
	return getHackatimeProjects(userId);
}

export async function getHackatimeUserController(userId: string) {
	return getHackatimeUser(userId);
}

export async function getHackatimeHeartbeatController(userId: string) {
	return getHackatimeHeartBeats(userId);
}
export async function getHacktimeProjectController(
	userId: string,
	id: string,
	hackatimeProjectName: string,
) {
	return getHackatimeProject(userId, id, hackatimeProjectName);
}
