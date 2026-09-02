import { createFileRoute } from "@tanstack/react-router";
import SignupButton from "@/components/SignIn";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<main>
			<h1>Home2Ocean</h1>
			<SignupButton />
		</main>
	);
}
