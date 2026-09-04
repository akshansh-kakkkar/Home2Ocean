import { auth } from "@home2ocean/auth";
import { fromNodeHeaders } from "better-auth/node";
export async function createContext(opts) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(opts.req.headers),
    });
    return {
        auth: null,
        session,
    };
}
