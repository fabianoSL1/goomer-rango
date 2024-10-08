import type { Product } from "../entities/Product";

export interface ProductRepository {
	get(productId: string): Promise<Product>;
	list(restaurantId: string): Promise<Product[]>;
	save(product: Product, restaurantId: string): Promise<Product>;
	update(product: Product): Promise<void>;
	delete(product: Product): Promise<void>;
}