import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Pool } from "pg";

import { CreateProduct } from "../../core/useCases/product/CreateProduct";
import { ListProducts } from "../../core/useCases/product/ListProducts";
import { UpdateProduct } from "../../core/useCases/product/UpdateProduct";
import { DestroyProduct } from "../../core/useCases/product/DestroyProduct";

import { ProductRepositoryPostgres } from "../repositories/ProductRepositoryPostgres";
import { createProductSchema, updateProductSchema } from "./schemas";

export const productController = new Hono();
const productRepository = new ProductRepositoryPostgres(new Pool());

productController.get("/restaurants/:restaurantId/products", async (ctx) => {
	const restaurantId = ctx.req.param("restaurantId");
	const listProducts = new ListProducts(productRepository);
	const products = await listProducts.execute(restaurantId);

	return ctx.json(products);
});

productController.post(
	"/restaurants/:restaurantId/products",
	zValidator("json", createProductSchema),
	async (ctx) => {
		const restaurantId = ctx.req.param("restaurantId");
		const body = ctx.req.valid("json");

		const createProduct = new CreateProduct(productRepository);
		const product = await createProduct.execute(restaurantId, body);

		return ctx.json(product);
	},
);

productController.patch(
	"/restaurants/:restaurantId/products/:productId",
    zValidator("json", updateProductSchema.partial()),
	async (ctx) => {
		const productId = ctx.req.param("productId");
        const body = ctx.req.valid("json")
		const updateProduct = new UpdateProduct(productRepository);
		const product = await updateProduct.execute(productId, body);

		return ctx.json(product);
	},
);

productController.delete(
	"/restaurants/:restaurantId/products/:productId",
	async (ctx) => {
		const productId = ctx.req.param("productId");
		const destroyProduct = new DestroyProduct(productRepository);
		const product = await destroyProduct.execute(productId);

		return ctx.json(product);
	},
);
