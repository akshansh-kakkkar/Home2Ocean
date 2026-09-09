import { getShopItems } from "./shop.service";

export async function getShopItemsController() {
	return getShopItems();
}
