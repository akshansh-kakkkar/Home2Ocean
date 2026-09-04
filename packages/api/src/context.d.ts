import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
export declare function createContext(opts: CreateExpressContextOptions): Promise<{
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
}>;
export type Context = Awaited<ReturnType<typeof createContext>>;
