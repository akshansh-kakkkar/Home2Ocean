import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: "hackclub",
					clientId: process.env.HACKCLUB_CLIENT_ID!,
					clientSecret: process.env.HACKCLUB_CLIENT_SECRET!,
					authorizationUrl: "https://auth.hackclub.com/oauth/authorize",
					tokenUrl: "https://auth.hackclub.com/oauth/token",
					userInfoUrl: "https://auth.hackclub.com/api/v1/me",
					scopes: [
						"name",
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
