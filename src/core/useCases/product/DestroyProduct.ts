import type { Product } from "../../entities/Product";
import type { ProductRepository } from "../../repositories/ProductRepository";


export class DestroyProduct {
    private readonly productRepository: ProductRepository;

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}
    
    async execute(id: string): Promise<Product> {
		const product = await this.productRepository.get(id);

		await this.productRepository.delete(product);

		return product;
	}
}