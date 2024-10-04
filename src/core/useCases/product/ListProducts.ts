import type { Product } from "../../entities/Product";
import type { ProductRepository } from "../../repositories/ProductRepository";

export class ListProducts {
	private readonly productRepository: ProductRepository;

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}

	async execute(productId: string): Promise<Product[]> {
		return await this.productRepository.list(productId);
	}
}
