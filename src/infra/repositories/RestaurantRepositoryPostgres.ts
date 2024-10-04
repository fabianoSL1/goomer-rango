import { Restaurant } from "../../core/entities/Restaurant";
import { Schedule } from "../../core/entities/Schedule";
import type { RestaurantRepository } from "../../core/repositories/RestaurantRepository";
import type { Pool } from "pg";

export class RestaurantRepositoryPostgres implements RestaurantRepository {
	private readonly pool: Pool;

	constructor(pool: Pool) {
		this.pool = pool;
	}

	async get(id: string): Promise<Restaurant> {
		const response = await this.pool.query(
			"SELECT * FROM restaurants WHERE id = $1",
			[id],
		);

		const [stored] = response.rows;

		if (!stored) {
			throw new Error(`restaurant with id ${id} not fount.`);
		}
		const schedules = await this.getSchedules(stored.id);

		return new Restaurant(
			stored.restaurant_name,
			stored.address,
			stored.picture,
			schedules,
			stored.id,
		);
	}

	private async getSchedules(restaurantId: string) {
		const response = await this.pool.query(
			"SELECT (week_day, start_at, end_at) WHERE restaurant_id = $1",
			[restaurantId],
		);

		return response.rows.map(
			(scheduleStored) =>
				new Schedule(
					scheduleStored.day,
					scheduleStored.start_at,
					scheduleStored.end_at,
				),
		);
	}

	async list(): Promise<Restaurant[]> {
		const { rows } = await this.pool.query(
			"SELECT a.*, b.week_day, b.start_at, b.end_at FROM restaurants a LEFT JOIN restaurant_schedules b on a.id = b.restaurant_id",
			[],
		);

		const restaurantMap: Record<string, Restaurant> = {};

		for (const row of rows) {
			const restaurant = restaurantMap[row.id];

			if (!restaurant) {
				restaurantMap[row.id] = new Restaurant(
					row.restaurant_name,
					row.address,
					row.picture,
					[],
					row.id,
				);
			}

			if (row.week_day) {
				restaurantMap[row.id].schedules.push(
					new Schedule(row.week_day, row.start_at, row.end_at),
				);
			}
		}

		return Object.values(restaurantMap);
	}

	async save(restaurant: Restaurant): Promise<Restaurant> {
		const client = await this.pool.connect();

		try {
			await client.query("BEGIN");
			const result = await client.query(
				"INSERT INTO restaurants (restaurant_name, picture, address) VALUES($1, $2, $3) RETURNING id",
				[restaurant.name, restaurant.picture, restaurant.address],
			);

			const { id: restaurantId } = result.rows[0];

			for (const schedule of restaurant.schedules) {
				await client.query(
					"INSERT INTO restaurant_schedules (restaurant_id, week_day, start_at, end_at) VALUES ($1, $2, $3, $4)",
					[restaurantId, schedule.day, schedule.begin, schedule.end],
				);
			}

			await client.query("COMMIT");
			client.release();

			return new Restaurant(
				restaurant.name,
				restaurant.address,
				restaurant.picture,
				restaurant.schedules,
				restaurantId,
			);
		} catch (e) {
			await client.query("ROOLBACK");
			client.release();
			throw e;
		}
	}

	async update(restaurant: Restaurant): Promise<void> {
		const client = await this.pool.connect();

		try {
			await client.query("BEGIN");

			await client.query(
				`
			UPDATE restaurants
			SET 
				restaurant_name = $1,
				address = $2,
				picture = $3
			WHERE id = $4
		`,
				[
					restaurant.name,
					restaurant.address,
					restaurant.picture,
					restaurant.id,
				],
			);

			await client.query("DELETE FROM restaurants WHERE id = $1", [
				restaurant.id,
			]);

			for (const schedule of restaurant.schedules) {
				await client.query(
					"INSERT INTO restaurant_schedules (restaurant_id, week_day, start_at, end_at) VALUES ($1, $2, $3, $4)",
					[restaurant.id, schedule.day, schedule.begin, schedule.end],
				);
			}

			await client.query("COMMIT");
			client.release();
		} catch (e) {
			await client.query("ROOLBACK");
			client.release();

			throw e;
		}
	}

	async delete(restaurant: Restaurant): Promise<void> {
		await this.pool.query(
			`
			DELETE FROM restaurant_schedules
			WHERE restaurant_id = $1
		`,
			[restaurant.id],
		);
	}
}
