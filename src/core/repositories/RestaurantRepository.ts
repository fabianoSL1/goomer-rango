import type { Restaurant } from "../entities/Restaurant";

export interface RestaurantRepository {
	get(id: string): Promise<Restaurant>;
	list(): Promise<Restaurant[]>;
	save(restaurant: Restaurant): Promise<Restaurant>;
	update(restaurant: Restaurant): Promise<void>;
	delete(restaurant: Restaurant): Promise<void>;
}
