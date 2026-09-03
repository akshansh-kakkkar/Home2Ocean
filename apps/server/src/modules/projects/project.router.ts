import { createTRPCRouter, protectedProcedure } from "@/trpc";
import { createProjectSchema } from "./project.schema";
import { createProjectController } from "./project.controller";

export const projectRouter = createTRPCRouter({
    create : protectedProcedure.input(createProjectSchema).mutation(async ({ctx, input})=>{
        return createProjectController(ctx.user.id, input)
    })
})