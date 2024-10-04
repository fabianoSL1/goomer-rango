import { Product } from "../../entities/Product";
import type { ProductRepository } from "../../repositories/ProductRepository";
import type { UpdateProductRequest } from "../../../dtos/UpdateProductRequest";

export class CreateProduct {
	private readonly productRepository: ProductRepository;

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}

	async execute(
		productId: string,
		request: UpdateProductRequest,
	): Promise<Product> {
		const stored = await this.productRepository.get(productId);

		const data = {
			...stored,
			...request,
		};

		const product = new Product(
			data.name,
			data.price,
			data.category,
			data.picture,
		);

		if (data.promotion) {
			product.setPromotion(data.promotion);
		}

		await this.productRepository.update(product);

		return product;
	}
}
