import type { Restaurant } from "./entities/Restaurant";
import type { RestaurantRepository } from "./repositories/RestaurantRepository";

export class GetRestaurant {
    readonly restaurantRepository: RestaurantRepository;

	constructor(restaurantRepository: RestaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

    async execute(id: string): Promise<Restaurant> {
        return await this.restaurantRepository.get(id);
    }
}