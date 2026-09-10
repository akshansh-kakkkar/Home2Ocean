import z from "zod";
export const walletSchema = z.object({
	id: z.string(),
	balance: z.number(),
});

export const transactionHistorySchema = z.object({
	id: z.string(),
	projectId: z.string().nullable(),
	type: z.enum(["ADMIN_ADJUSTMENT", "SHIP_APPROVED", "REWARD_PURCHASE"]),
	reason: z.string().nullable(),
	rewardId: z.string().nullable(),
	createdAt: z.date(),
	amount: z.number(),
});

export const transactionHistoryResponseSchema =
	transactionHistorySchema.array();

export type transactionHistory = z.infer<
	typeof transactionHistoryResponseSchema
>;
