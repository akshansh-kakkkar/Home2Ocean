import prisma from "@home2ocean/db";

export async function getShopItems() {
	return prisma.reward.findMany({
		where: {
			active: true,
		},
	});
}
