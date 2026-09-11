import z from "zod";

export const purchaseRewardSchema = z.object({
	rewardId: z.string(),
});
