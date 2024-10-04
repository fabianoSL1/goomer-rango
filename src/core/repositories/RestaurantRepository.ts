import type { Restaurant } from "../entities/Restaurant";

export interface RestaurantRepository {
	list(): Promise<Restaurant[]>;
	save(Restaurant: Restaurant): Promise<void>;
	update(Restaurant: Restaurant): Promise<void>;
	delete(Restaurant: Restaurant): Promise<void>;
}
