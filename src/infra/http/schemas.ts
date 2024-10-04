import z from "zod";
import { ScheduleDay } from "../../core/entities/Schedule";

const schedulechema = z
	.object({
		day: z.nativeEnum(ScheduleDay),
		begin: z.string().length(5),
		end: z.string().length(5),
	})
	.strict();

export const RestaurantSchema = z.object({
	picture: z.string(),
	name: z.string(),
	address: z.string(),
	schedules: z.array(schedulechema),
});
