import type { UpdateRestaurantRequest } from "../../../dtos/UpdateRestaurantRequest";
import type { Restaurant } from "../../entities/Restaurant";
import { Schedule } from "../../entities/Schedule";
import type { RestaurantRepository } from "../../repositories/RestaurantRepository";

export class UpdateRestaurant {
	readonly restaurantRepository: RestaurantRepository;

	constructor(restaurantRepository: RestaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	async execute(
		id: string,
		request: UpdateRestaurantRequest,
	): Promise<Restaurant> {
		let restaurant = await this.restaurantRepository.get(id);

		const { schedules, ...rest } = request;

		restaurant = {
			...restaurant,
			...rest,
		};

		if (schedules) {
			restaurant.schedules = schedules.map((item) => {
				const schedule = new Schedule(item.day, item.begin, item.end);

				if (!schedule.isValidInterval()) {
					throw new Error(
						`interval ${item.begin} - ${item.end} on ${item.day} is not valid.`,
					);
				}

				return schedule;
			});
		}

		await this.restaurantRepository.update(restaurant);
		return restaurant;
	}
}
