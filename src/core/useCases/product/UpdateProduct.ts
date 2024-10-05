import { Product } from "../../entities/Product";
import type { ProductRepository } from "../../repositories/ProductRepository";
import type { UpdateProductRequest } from "../../../dtos/UpdateProductRequest";
import { Schedule } from "../../entities/Schedule";

export class UpdateProduct {
	private readonly productRepository: ProductRepository;

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}

	async execute(
		productId: string,
		request: UpdateProductRequest,
	): Promise<Product> {
		const stored = await this.productRepository.get(productId);

		const toProduct = {
			...stored,
			...request,
		};

		const product = new Product(
			toProduct.name,
			toProduct.price,
			toProduct.category,
			toProduct.picture,
			toProduct.id,
		);

		if (toProduct.promotion) {
			const schedules = [];

			for (const schedule of toProduct.promotion.schedules) {
				const _schedule = new Schedule(
					schedule.day,
					schedule.begin,
					schedule.end,
				);

				if (!_schedule.isValidInterval()) {
					throw new Error("")
				}

				schedules.push(_schedule);
			}

			product.setPromotion({...toProduct.promotion, schedules});
		}

		await this.productRepository.update(product);

		return product;
	}
}
