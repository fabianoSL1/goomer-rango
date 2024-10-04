import type { ScheduleDay } from "../core/entities/Schedule";

export type CreateRestaurantRequest = {
	picture: string;
	name: string;
	address: string;
	schedules: { day: ScheduleDay; begin: string; end: string }[];
};
