import type { Schedule } from "./Schedule";

export class Restaurant {
	name: string;
	address: string;
	picture: string;
	schedules: Schedule[];

	constructor(
		name: string,
		address: string,
		picture: string,
		schedules: Schedule[],
	) {
		this.name = name;
		this.address = address;
		this.schedules = schedules;
		this.picture = picture;
	}
}
