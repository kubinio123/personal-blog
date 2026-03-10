import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		date: z.coerce.date(),
		category: z.string().min(1),
		author: z.object({
			name: z.string().min(1)
		}),
		draft: z.boolean().default(false),
		sources: z
				.array(
					z.object({
						title: z.string().min(1),
						url: z.string().url(),
						label: z.string().min(1).optional(),
						meta: z.string().min(1).optional()
					})
				)
				.optional()
				.default([])
		})
});

export const collections = {
	blog: blogCollection
};
