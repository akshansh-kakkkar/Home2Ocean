import { authClient } from "@/lib/auth-client";

export default function SignupButton() {
	return (
		<button
			onClick={async () => {
				await authClient.signIn.social({
					provider: "hackclub",
					callbackURL: "/",
				});
			}}
		>
			Signup
		</button>
	);
}
