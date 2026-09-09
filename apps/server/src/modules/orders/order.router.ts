import { protectedProcedure, router } from "@/trpc";
import { purchaseRewardSchema } from "./order.schema";
import { purchaseTransactionController } from "./order.controller";

export const purchaseRewardRouter = router({
    purchaseReward : protectedProcedure.input(purchaseRewardSchema).mutation(({ctx, input})=>{
        return purchaseTransactionController(ctx.session.user.id, input.rewardId)
    })
})