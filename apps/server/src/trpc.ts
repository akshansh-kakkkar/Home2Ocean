import type { auth } from "@home2ocean/auth"
import { initTRPC, TRPCError } from "@trpc/server";

export type TRPCContext = {
    user : typeof auth.$Infer.Session.user | null;

}
const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ctx, next})=>{
    if(!ctx.user){
        throw new TRPCError({
            code : "UNAUTHORIZED",
        })
    }
    return next({
        ctx : {
            user : ctx.user
        }
    })
});