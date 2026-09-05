export declare const t: import("@trpc/server").TRPCRootObject<
	{
		auth: null;
		session: {
			session: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				userId: string;
				expiresAt: Date;
				token: string;
				ipAddress?: string | null | undefined | undefined;
				userAgent?: string | null | undefined | undefined;
			};
			user: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				email: string;
				emailVerified: boolean;
				name: string;
				image?: string | null | undefined | undefined;
			};
		} | null;
	},
	object,
	import("@trpc/server").TRPCRuntimeConfigOptions<
		{
			auth: null;
			session: {
				session: {
					id: string;
					createdAt: Date;
					updatedAt: Date;
					userId: string;
					expiresAt: Date;
					token: string;
					ipAddress?: string | null | undefined | undefined;
					userAgent?: string | null | undefined | undefined;
				};
				user: {
					id: string;
					createdAt: Date;
					updatedAt: Date;
					email: string;
					emailVerified: boolean;
					name: string;
					image?: string | null | undefined | undefined;
				};
			} | null;
		},
		object
	>,
	{
		ctx: {
			auth: null;
			session: {
				session: {
					id: string;
					createdAt: Date;
					updatedAt: Date;
					userId: string;
					expiresAt: Date;
					token: string;
					ipAddress?: string | null | undefined | undefined;
					userAgent?: string | null | undefined | undefined;
				};
				user: {
					id: string;
					createdAt: Date;
					updatedAt: Date;
					email: string;
					emailVerified: boolean;
					name: string;
					image?: string | null | undefined | undefined;
				};
			} | null;
		};
		meta: object;
		errorShape: import("@trpc/server").TRPCDefaultErrorShape;
		transformer: false;
	}
>;
export declare const router: import("@trpc/server").TRPCRouterBuilder<{
	ctx: {
		auth: null;
		session: {
			session: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				userId: string;
				expiresAt: Date;
				token: string;
				ipAddress?: string | null | undefined | undefined;
				userAgent?: string | null | undefined | undefined;
			};
			user: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				email: string;
				emailVerified: boolean;
				name: string;
				image?: string | null | undefined | undefined;
			};
		} | null;
	};
	meta: object;
	errorShape: import("@trpc/server").TRPCDefaultErrorShape;
	transformer: false;
}>;
export declare const publicProcedure: import("@trpc/server").TRPCProcedureBuilder<
	{
		auth: null;
		session: {
			session: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				userId: string;
				expiresAt: Date;
				token: string;
				ipAddress?: string | null | undefined | undefined;
				userAgent?: string | null | undefined | undefined;
			};
			user: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				email: string;
				emailVerified: boolean;
				name: string;
				image?: string | null | undefined | undefined;
			};
		} | null;
	},
	object,
	object,
	import("@trpc/server").TRPCUnsetMarker,
	import("@trpc/server").TRPCUnsetMarker,
	import("@trpc/server").TRPCUnsetMarker,
	import("@trpc/server").TRPCUnsetMarker,
	false
>;
export declare const protectedProcedure: import("@trpc/server").TRPCProcedureBuilder<
	{
		auth: null;
		session: {
			session: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				userId: string;
				expiresAt: Date;
				token: string;
				ipAddress?: string | null | undefined | undefined;
				userAgent?: string | null | undefined | undefined;
			};
			user: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				email: string;
				emailVerified: boolean;
				name: string;
				image?: string | null | undefined | undefined;
			};
		} | null;
	},
	object,
	{
		session: {
			session: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				userId: string;
				expiresAt: Date;
				token: string;
				ipAddress?: string | null | undefined | undefined;
				userAgent?: string | null | undefined | undefined;
			};
			user: {
				id: string;
				createdAt: Date;
				updatedAt: Date;
				email: string;
				emailVerified: boolean;
				name: string;
				image?: string | null | undefined | undefined;
			};
		};
		auth: null;
	},
	import("@trpc/server").TRPCUnsetMarker,
	import("@trpc/server").TRPCUnsetMarker,
	import("@trpc/server").TRPCUnsetMarker,
	import("@trpc/server").TRPCUnsetMarker,
	false
>;
