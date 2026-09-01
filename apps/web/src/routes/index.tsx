import SignupButton from "@/components/SignIn";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component : Home,
})

function Home(){
    return(
        <main>
            <h1>Home2Ocean</h1>
            <SignupButton />
        </main>
    )
}