import { auth } from "@home2ocean/auth"
import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { fromNodeHeaders } from "better-auth/node";

export async function createContext(opts : CreateExpressContextOptions){
    const session = await auth.api.getSession({
        headers : fromNodeHeaders(opts.req.headers)
    })
    return{
        session,
    }
} 
export type Context = Awaited<ReturnType<typeof createContext>>
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ctx, next})=>{
    if(!ctx.session){
        throw new TRPCError({
            code : "UNAUTHORIZED",
            message : "Authentication requried"
        })
    }
    return next({
        ctx : {
            session : ctx.session
        }
    })
});