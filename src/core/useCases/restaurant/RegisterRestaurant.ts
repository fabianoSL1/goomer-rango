import type { CreateRestaurantRequest } from "../../../dtos/CreateRestaurantRequest";
import { Restaurant } from "../../entities/Restaurant";
import { Schedule } from "../../entities/Schedule";
import { CoreExcption } from "../../exceptions/CoreException";
import type { RestaurantRepository } from "../../repositories/RestaurantRepository";

export class RegisterRestaurant {
	readonly restaurantRepository: RestaurantRepository;

	constructor(restaurantRepository: RestaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	async execute(request: CreateRestaurantRequest): Promise<Restaurant> {
		const schedules = request.schedules.map((item) => {
			const schedule = new Schedule(item.day, item.begin, item.end);

			if (!schedule.isValidInterval()) {
				throw new CoreExcption(
					`interval ${item.begin} - ${item.end} on ${item.day} is not valid.`,
				);
			}

			return schedule;
		});

		const restaurant = new Restaurant(
			request.name,
			request.address,
			request.picture,
			schedules,
		);

		return await this.restaurantRepository.save(restaurant);
	}
}
