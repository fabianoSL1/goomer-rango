import { serve } from "@hono/node-server";
import { Hono } from "hono";

import restaurantController from "./infra/http/RestaurantController";
import { productController } from "./infra/http/ProductController";

export const app = new Hono();

app.route("/restaurants", restaurantController);
app.route("/", productController);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
