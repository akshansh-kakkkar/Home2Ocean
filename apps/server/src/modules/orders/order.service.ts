import prisma from "@home2ocean/db";
import { TRPCError } from "@trpc/server";

export async function purchaseTransaction(userId: string, rewardId: string) {
	const reward = await prisma.reward.findUnique({
		where: {
			id: rewardId,
		},
	});

	if (!reward || !reward.active) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "This shop item is unavailable",
		});
	}

	if (reward.stock <= 0) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "This Item is out of stock",
		});
	}

	const wallet = await prisma.wallet.findUnique({
		where: {
			userId,
		},
	});

	if (!wallet) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "No wallet found",
		});
	}

	if (wallet.balance < reward.price) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Insufficient wallet balance.",
		});
	}

	await prisma.$transaction(async (tx) => {
		tx.wallet.update({
			where: {
				userId,
			},
			data: {
				balance: {
					decrement: reward.price,
				},
			},
		});
		await tx.reward.update({
			where: {
				id: rewardId,
			},
			data: {
				stock: {
					decrement: 1,
				},
			},
		});

		await tx.purchase.create({
			data: {
				id: crypto.randomUUID(),
				userId,
				rewardId,
				price: reward.price,
			},
		});

		await tx.walletTransaction.create({
			data: {
				id: crypto.randomUUID(),
				walletId: wallet.id,
				userId,
				type: "REWARD_PURCHASE",
				amount: -reward.price,
				rewardId,
			},
		});
	});
}
