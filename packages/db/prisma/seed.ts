import prisma from "../src";

async function main() {
	const email = "admin_id_here";
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	console.log("Found User", user);
	if (!user) {
		throw new Error(`No User found with email ${email}`);
	}

	const updated = await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			role: "ADMIN",
			isOwner: true,
		},
	});
	console.log("UPDATED USER:", updated);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
