import type { Product } from "../../entities/Product";
import type { ProductRepository } from "../../repositories/ProductRepository";

export class ListProducts {
	private readonly productRepository: ProductRepository;

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}

	async execute(restaurantId: string): Promise<Product[]> {
		return await this.productRepository.list(restaurantId);
	}
}
