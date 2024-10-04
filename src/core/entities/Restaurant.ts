import type { Schedule } from "./Schedule";

export class Restaurant {
	readonly id?: string;
	name: string;
	address: string;
	picture: string;
	schedules: Schedule[];

	constructor(
		name: string,
		address: string,
		picture: string,
		schedules: Schedule[],
		id?: string,
	) {
		this.name = name;
		this.address = address;
		this.schedules = schedules;
		this.picture = picture;
		this.id = id;
	}
}
