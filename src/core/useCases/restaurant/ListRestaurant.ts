import type { Restaurant } from "../../entities/Restaurant";
import type { RestaurantRepository } from "../../repositories/RestaurantRepository";

export class ListRestaurant {
	readonly restaurantRepository: RestaurantRepository;

	constructor(restaurantRepository: RestaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}
    
	async execute(): Promise<Restaurant[]> {
		return await this.restaurantRepository.list();
	}
}
