import type { Promotion } from "../core/entities/Product";
import type { CreateProductRequest } from "./CreateProductRequest";

export type UpdateProductRequest = Partial<CreateProductRequest> & {
	promotion?: Promotion;
};

