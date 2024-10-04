import type { CreateProductRequest } from "../../../dtos/CreateProductRequest";
import { Product } from "../../entities/Product";
import type { ProductRepository } from "../../repositories/ProductRepository";

export class CreateProduct {
	private readonly productRepository: ProductRepository;

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}

	async execute(
		restaurantId: string,
		request: CreateProductRequest,
	): Promise<Product> {
		const product = new Product(
			request.name,
			request.price,
			request.category,
			request.picture,
		);

		return await this.productRepository.save(product, restaurantId);
	}
}
