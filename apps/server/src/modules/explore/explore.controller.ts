import { exploreProjects } from "./explore.service";

export async function exploreProjectsController() {
	return exploreProjects();
}
