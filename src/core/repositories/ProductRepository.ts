import type { Product } from "../entities/Product";

export interface ProductRepository {
	list(restaurantId: string): Promise<Product[]>;
	save(product: Product): Promise<Product>;
	update(product: Product): Promise<void>;
	delete(product: Product): Promise<void>;
}