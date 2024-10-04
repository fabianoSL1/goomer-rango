import z from "zod";
import { ScheduleDay } from "../../core/entities/Schedule";

const schedulechema = z
	.object({
		day: z.nativeEnum(ScheduleDay),
		begin: z.string().length(5),
		end: z.string().length(5),
	})
	.strict();

export const restaurantSchema = z.object({
	picture: z.string(),
	name: z.string(),
	address: z.string(),
	schedules: z.array(schedulechema),
});

export const createProductSchema = z.object({
	name: z.string(),
	price: z.number(),
	category: z.string(),
	picture: z.string(),
});

export const updateProductSchema = createProductSchema.extend({
	promotion: z
		.object({
			price: z.number(),
			describe: z.string(),
			schedules: z.array(schedulechema),
		})
		.strict(),
});
