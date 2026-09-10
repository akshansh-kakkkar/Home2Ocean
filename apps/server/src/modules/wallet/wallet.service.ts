import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";
import type { transactionHistory } from "./wallet.schema";

export async function getWallet(userId: string) {
	const wallet = await prisma.wallet.findUnique({
		where: {
			userId,
		},
	});
	if (!wallet) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Failed to get the wallet",
		});
	}
	return wallet;
}

export async function getTransactionHistory(
	userId: string,
): Promise<transactionHistory> {
	const wallet = await prisma.wallet.findUnique({
		where: {
			userId,
		},
	});

	if (!wallet) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Failed to get the wallet",
		});
	}
	const walletTransactions = await prisma.walletTransaction.findMany({
		where: {
			walletId: wallet.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return walletTransactions;
}
