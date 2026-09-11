import { protectedProcedure, router } from "@/trpc";
import { purchaseTransactionController } from "./order.controller";
import { purchaseRewardSchema } from "./order.schema";

export const purchaseRewardRouter = router({
	purchaseReward: protectedProcedure
		.input(purchaseRewardSchema)
		.mutation(({ ctx, input }) => {
			return purchaseTransactionController(ctx.session.user.id, input.rewardId);
		}),
});
