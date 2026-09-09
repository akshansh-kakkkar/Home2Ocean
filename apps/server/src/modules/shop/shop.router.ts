import { protectedProcedure, router } from "@/trpc";
import { getShopItemsController } from "./shop.controller";
import { shopResponseSchema } from "./shop.schema";

export const shopRouter = router({
	getShopItems: protectedProcedure.output(shopResponseSchema).query(() => {
		return getShopItemsController();
	}),
});
