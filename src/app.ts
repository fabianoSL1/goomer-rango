import { Hono } from "hono";
import { CoreExcption } from "./core/exceptions/CoreException";
import { productController } from "./infra/http/ProductController";
import restaurantController from "./infra/http/RestaurantController";

export const app = new Hono();

app.route("/restaurants", restaurantController);
app.route("/", productController);

app.onError((error, ctx) => {
	if (error instanceof CoreExcption) {
		return ctx.json({ message: error.message }, 400);
	}

	return ctx.body("Internal server error", 500);
});
