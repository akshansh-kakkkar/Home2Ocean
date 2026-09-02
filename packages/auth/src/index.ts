import { createPrismaClient } from "@home2ocean/db";
import { env } from "@home2ocean/env/server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";

export function createAuth() {
	const prisma = createPrismaClient();

	return betterAuth({
		database: prismaAdapter(prisma, {
			provider: "postgresql",
		}),

		trustedOrigins: [env.CORS_ORIGIN],
		emailAndPassword: {
			enabled: true,
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		advanced: {
			defaultCookieAttributes: {
				sameSite: "none",
				secure: true,
				httpOnly: true,
			},
		},
		plugins: [
			genericOAuth({
				config: [
					{
						providerId: "hackclub",
						clientId: env.HACKCLUB_CLIENT_ID,
						clientSecret: env.HACKCLUB_CLIENT_SECRET,
						authorizationUrl: "https://auth.hackclub.com/oauth/authorize",
						tokenUrl: "https://auth.hackclub.com/oauth/token",
						userInfoUrl: "https://auth.hackclub.com/api/v1/me",
						scopes: [
							"openid",
							"profile",
							"email",
							"slack_id",
							"verification_status",
						],
						pkce: true,
					},
				],
			}),
		],
	});
}

export const auth = createAuth();
