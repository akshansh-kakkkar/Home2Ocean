import { protectedProcedure, router } from "@/trpc";
import {
	createProjectController,
	deleteProjectController,
	editProjectController,
	getAllProjectsController,
	getProjectController,
} from "./project.controller";
import {
	createProjectSchema,
	deleteProjectSchema,
	editProjectSchema,
	getAllProjectSchema,
	getProjectSchema,
	projectSchema,
} from "./project.schema";

export const projectRouter = router({
	create: protectedProcedure
		.input(createProjectSchema)
		.output(projectSchema)
		.mutation(async ({ ctx, input }) => {
			return createProjectController(ctx.session.user.id, input);
		}),
	get: protectedProcedure
		.input(getProjectSchema)
		.output(projectSchema.nullable())
		.query(async ({ input }) => {
			return getProjectController(input.id);
		}),
	edit: protectedProcedure
		.input(editProjectSchema)
		.output(projectSchema.nullable())
		.mutation(async ({ input }) => {
			const { id, ...data } = input;
			return editProjectController(id, data);
		}),
	delete: protectedProcedure
		.input(deleteProjectSchema)
		.output(projectSchema.nullable())
		.mutation(async ({ input }) => {
			return deleteProjectController(input.id);
		}),
	list: protectedProcedure.output(getAllProjectSchema).query(async () => {
		return getAllProjectsController();
	}),
});
