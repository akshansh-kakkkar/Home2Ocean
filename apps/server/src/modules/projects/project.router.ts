import { router, protectedProcedure } from "@/trpc";
import { createProjectSchema, getProjectSchema, projectSchema } from "./project.schema";
import { createProjectController, getProjectController } from "./project.controller";

export const projectRouter = router({
    create : protectedProcedure.input(createProjectSchema).output(projectSchema).mutation(async ({ctx, input})=>{
        return createProjectController(ctx.session.user.id, input);
    }),
    get : protectedProcedure.input(getProjectSchema).output(projectSchema.nullable()).query(async ({input})=> {
        return getProjectController(input.id)
    })
})

