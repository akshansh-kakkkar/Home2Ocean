import { auth } from "@home2ocean/auth";
import prisma, { type Permission } from "@home2ocean/db";
import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { fromNodeHeaders } from "better-auth/node";

type AdminUser = {
	id: string;
	role: "USER" | "REVIEWER" | "ADMIN";
	isOwner: boolean;
	permissions: {
		permission: string;
	}[];
};

export async function createContext(opts: CreateExpressContextOptions) {
	try {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(opts.req.headers),
		});
		return {
			session,
		};
	} catch {
		return {
			session: null,
		};
	}
}
export type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Authentication requried",
		});
	}
	return next({
		ctx: {
			session: ctx.session,
		},
	});
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
	const user = await prisma.user.findUnique({
		where: {
			id: ctx.session.user.id,
		},
		include: {
			permissions: {
				select: {
					permission: true,
				},
			},
		},
	});
	if (!user || user.role !== "ADMIN") {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "Admin access required",
		});
	}
	const adminUser: AdminUser = {
		id: user.id,
		role: user.role,
		isOwner: user.isOwner,
		permissions: user.permissions,
	};
	return next({
		ctx: {
			...ctx,
			user: adminUser,
		},
	});
});

export function permissionProcedure(permission: Permission) {
	return adminProcedure.use(({ ctx, next }) => {
		if (ctx.user.isOwner) {
			return next({ ctx });
		}
		const hasPermission = ctx.user.permissions.some(
			(userPermission) => userPermission.permission === permission,
		);
		if (!hasPermission) {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: `Missing Permission: ${permission}`,
			});
		}
		return next({ ctx });
	});
}
