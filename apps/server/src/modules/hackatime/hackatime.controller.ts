import { getHackatimeProjects } from "./hackatime.service";

export async function getHackatimeConnectionController(userId: string) {
	getHackatimeProjects(userId);
}
