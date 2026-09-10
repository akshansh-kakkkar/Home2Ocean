import { protectedProcedure, router } from "@/trpc";
import {
	getTransactionHistoryController,
	getWalletController,
} from "./wallet.controller";
import { transactionHistoryResponseSchema } from "./wallet.schema";

export const walletRouter = router({
	getWallet: protectedProcedure.query(({ ctx }) => {
		return getWalletController(ctx.session.user.id);
	}),
	getTransactionHistory: protectedProcedure
		.input(transactionHistoryResponseSchema)
		.query(({ ctx }) => {
			return getTransactionHistoryController(ctx.session.user.id);
		}),
});
