import type { ScheduleDay } from "../core/entities/Schedule";
import type { CreateProductRequest } from "./CreateProductRequest";

export type UpdateProductRequest = Partial<CreateProductRequest> & {
	promotion?: {
		price: number;
		describe: string;
		schedules: { day: ScheduleDay; begin: string; end: string }[];
	};
};
