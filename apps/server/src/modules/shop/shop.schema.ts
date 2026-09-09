import z from "zod";

export const shopSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	imageUrl: z.string().url().nullable(),
	price: z.number(),
	stock: z.number(),
	active: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const shopResponseSchema = shopSchema.array();
