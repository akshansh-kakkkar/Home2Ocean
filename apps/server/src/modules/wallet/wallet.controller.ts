import { getTransactionHistory, getWallet } from "./wallet.service";

export async function getWalletController(userId: string) {
	return getWallet(userId);
}

export async function getTransactionHistoryController(userId: string) {
	return getTransactionHistory(userId);
}
