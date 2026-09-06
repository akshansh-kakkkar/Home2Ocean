import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
export default function SignupButton() {
	const { data, error, isLoading } = useQuery(trpc.adminTest.queryOptions());
	console.log("data: ", data);
	console.log("error: ", error);
	console.log("Loading", isLoading);
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
			{isLoading ? "Checking" : "Sign In"}
		</button>
	);
}
