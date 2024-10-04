import type { Schedule } from "./Schedule";

export type Promotion = {
	price: number;
	describe: string;
	schedules: Schedule[];
};

export class Product {
	picture: string;
	name: string;
	price: number;
	category: string;
	promotion?: Promotion;

	constructor(name: string, price: number, category: string, picture: string) {
		this.name = name;
		this.picture = picture;
		this.price = price;
		this.category = category;
	}

	setPromotion(promotion: Promotion) {
		for (const schedule of promotion.schedules) {
			if (!schedule.isValidInterval()) {
				throw Error(
					`interval ${schedule.begin} - ${schedule.end} on ${schedule.day} is invalid.`,
				);
			}
		}
		
		this.promotion = promotion;
	}
}
