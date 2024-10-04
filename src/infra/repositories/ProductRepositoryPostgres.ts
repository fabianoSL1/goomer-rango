import type { Pool } from "pg";
import { Product } from "../../core/entities/Product";
import type { ProductRepository } from "../../core/repositories/ProductRepository";
import { Schedule } from "../../core/entities/Schedule";

export class ProductRepositoryPostgres implements ProductRepository {
	private readonly pool: Pool;

	constructor(pool: Pool) {
		this.pool = pool;
	}

	async get(productId: string): Promise<Product> {
		const response = await this.pool.query(
			`SELECT a.*, b.id as promotion_id, b.price as promotion_price, b.product_describe 
                FROM products a 
                LEFT JOIN promotion b 
                    ON a.id = b.product_id 
                WHERE id = $1
            `,
			[productId],
		);

		const [stored] = response.rows;

		if (!stored) {
			throw new Error(`product with id ${productId} not fount.`);
		}

		const product = new Product(
			stored.product_name,
			stored.price,
			stored.category,
			stored.picture,
			stored.id,
		);

		if (stored.promotion_id) {
			product.setPromotion({
				price: stored.promotion_price,
				describe: stored.promotion_describe,
				schedules: await this.getSchedules(stored.promotion_id),
			});
		}

		return product;
	}

	private async getSchedules(promotionId: string) {
		const response = await this.pool.query(
			"SELECT (week_day, start_at, end_at) FROM promotion_schedules WHERE restaurant_id = $1",
			[promotionId],
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

	async list(restaurantId: string): Promise<Product[]> {
		const response = await this.pool.query(
			`SELECT a.*, 
                b.id as promotion_id, b.price as promotion_price, b.product_describe, 
                c.week_day, c.start_at, c.end_at 
                FROM products a 
                LEFT JOIN promotions b 
                    ON a.id = b.product_id 
                LEFT JOIN promotion_schedules c
                    ON b.id = c.promotion_id
                WHERE 
                    a.restaurant_id = $1
            `,
			[restaurantId],
		);

		const productsMap: Record<string, Product> = {};

		for (const row of response.rows) {
			const product = productsMap[row.id];

			if (!product) {
				productsMap[row.id] = new Product(
					row.product_name,
					row.price,
					row.category,
					row.picture,
					row.id,
				);
			}

			if (row.promotion_id && !productsMap[row.id].promotion) {
				productsMap[row.id].setPromotion({
					describe: row.promotion_describe,
					price: row.promotion_price,
					schedules: [],
				});
			}

			if (row.week_day) {
				productsMap[row.id].promotion?.schedules.push(
					new Schedule(row.week_day, row.start_at, row.end_at),
				);
			}
		}

		return Object.values(productsMap);
	}

	async save(product: Product, restaurantId: string): Promise<Product> {
		const result = await this.pool.query(
			"INSERT INTO products (restaurant_id, product_name, price, category) VALUES ($1, $2, $3, $4)",
			[restaurantId, product.name, product.price, product.category],
		);

		const { id } = result.rows[0];

		return new Product(
			product.name,
			product.price,
			product.category,
			product.picture,
			id,
		);
	}

	async update(product: Product): Promise<void> {
		const client = await this.pool.connect();

		try {
			await client.query("BEGIN");

			await client.query(
				"UPDATE products SET product_name = $1, price = $2, picture = $3, category = $4 WHERE id = $5",
				[
					product.name,
					product.price,
					product.picture,
					product.category,
					product.id,
				],
			);

			await client.query("DELETE FROM promotions WHERE product_id = $1", [
				product.id,
			]);

			if (product.promotion) {
				const { rows } = await client.query(
					"INSERT INTO promotions (product_id, price, product_describe) VALUES ($1, $2, $3) RETURNING *",
					[product.id, product.promotion.price, product.promotion.describe],
				);

				for (const schedule of product.promotion.schedules) {
					await client.query(
						"INSERT INTO promotion_schedules (promotion_id, week_day, start_at, end_at) VALUES ($1, $2, $3, $4)",
						[rows[0].id, schedule.day, schedule.begin, schedule.end],
					);
				}
			}

			await client.query("COMMIT");
			client.release();
		} catch (e) {
			await client.query("ROOLBACK");
			client.release();

			throw e;
		}
	}

	async delete(product: Product): Promise<void> {
		await this.pool.query("DELETE FROM products WHERE id = $1", [product.id]);
	}
}
