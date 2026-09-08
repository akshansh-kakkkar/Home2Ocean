import { getHackatimeProjects, getHackatimeUser, getHackatimeHeartBeats } from "./hackatime.service";

export async function getHackatimeConnectionController(userId: string) {
	return getHackatimeProjects(userId);
}

export async function getHackatimeUserController(userId: string) {
	return getHackatimeUser(userId);
}

export async function getHackatimeHeartbeatController(userId : string){
	return getHackatimeHeartBeats(userId)
}