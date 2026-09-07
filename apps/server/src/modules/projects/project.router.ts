import { protectedProcedure, router } from "@/trpc";
import {
	createProjectController,
	deleteProjectController,
	editProjectController,
	getAllProjectsController,
	getProjectController,
	startProjectTrackingController,
} from "./project.controller";
import {
	createProjectSchema,
	deleteProjectSchema,
	editProjectSchema,
	getAllProjectSchema,
	getProjectSchema,
	projectSchema,
	startTrackingSchema,
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
		.query(async ({ ctx, input }) => {
			return getProjectController(input.id, ctx.session.user.id);
		}),
	edit: protectedProcedure
		.input(editProjectSchema)
		.output(projectSchema.nullable())
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			return editProjectController(id, ctx.session.user.id, data);
		}),
	delete: protectedProcedure
		.input(deleteProjectSchema)
		.output(projectSchema.nullable())
		.mutation(async ({ ctx, input }) => {
			return deleteProjectController(input.id, ctx.session.user.id);
		}),
	list: protectedProcedure
		.output(getAllProjectSchema)
		.query(async ({ ctx }) => {
			return getAllProjectsController(ctx.session.user.id);
		}),
	startTracking: protectedProcedure
		.input(startTrackingSchema)
		.output(projectSchema)
		.mutation(async ({ ctx, input }) => {
			return startProjectTrackingController(
				input.id,
				ctx.session.user.id,
				input.stopAt,
			);
		}),
});
