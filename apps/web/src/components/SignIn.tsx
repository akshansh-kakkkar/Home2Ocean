import { authClient } from "@/lib/auth-client";

export default function SignupButton() {
	return (
		<button
			type="button"
			onClick={async () => {
				await authClient.signIn.social({
					provider: "hackclub",
					callbackURL: "/",
				});
			}}
		>
			Submit
		</button>
	);
}
