import { router, protectedProcedure } from "@/trpc";
import { createProjectSchema, deleteProjectSchema, getProjectSchema, projectSchema } from "./project.schema";
import { createProjectController, deleteProjectController, getProjectController } from "./project.controller";

export const projectRouter = router({
    create : protectedProcedure.input(createProjectSchema).output(projectSchema).mutation(async ({ctx, input})=>{
        return createProjectController(ctx.session.user.id, input);
    }),
    get : protectedProcedure.input(getProjectSchema).output(projectSchema.nullable()).query(async ({input})=> {
        return getProjectController(input.id)
    }),
    delete : protectedProcedure.input(deleteProjectSchema).output(projectSchema.nullable()).mutation(async ({input})=>{
        return deleteProjectController(input.id,)
    })})
    