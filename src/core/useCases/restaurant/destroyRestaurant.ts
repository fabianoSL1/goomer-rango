import type { Restaurant } from "../../entities/Restaurant";
import type { RestaurantRepository } from "../../repositories/RestaurantRepository";

export class DestroyRestaurant {
	readonly restaurantRepository: RestaurantRepository;

	constructor(restaurantRepository: RestaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	async execute(id: string): Promise<Restaurant> {
		const restaurant = await this.restaurantRepository.get(id);

		await this.restaurantRepository.delete(restaurant);

		return restaurant;
	}
    
}
