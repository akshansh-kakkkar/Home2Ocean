import { getHackatimeProjects, getHackatimeUser } from "./hackatime.service";

export async function getHackatimeConnectionController(userId: string) {
	return getHackatimeProjects(userId);
}

export async function getHackatimeUserController(userId: string) {
	return getHackatimeUser(userId);
}
