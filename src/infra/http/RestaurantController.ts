import { Hono } from "hono";
import { Pool } from "pg";
import { zValidator } from "@hono/zod-validator";

import { ListRestaurant } from "../../core/useCases/restaurant/ListRestaurant";
import { GetRestaurant } from "../../core/useCases/restaurant/GetRestaurant";
import { UpdateRestaurant } from "../../core/useCases/restaurant/UpdateRestaurant";
import { RegisterRestaurant } from "../../core/useCases/restaurant/RegisterRestaurant";
import { DestroyRestaurant } from "../../core/useCases/restaurant/destroyRestaurant";

import { RestaurantRepositoryPostgres } from "../repositories/RestaurantRepositoryPostgres";
import { restaurantSchema } from "./schemas";

const restaurantController = new Hono();
const restaurantRepository = new RestaurantRepositoryPostgres(new Pool());

restaurantController.get("/", async (ctx) => {
	const listRestaurants = new ListRestaurant(restaurantRepository);
	const restaurants = await listRestaurants.execute();

	return ctx.json(restaurants);
});

restaurantController.get("/:id", async (ctx) => {
	const id = ctx.req.param("id");
	const getRestaurant = new GetRestaurant(restaurantRepository);
	const restaurant = await getRestaurant.execute(id);

	return ctx.json(restaurant);
});

restaurantController.patch(
	"/:id",
	zValidator("json", restaurantSchema.partial()),
	async (ctx) => {
		const id = ctx.req.param("id");
		const body = ctx.req.valid("json");

		const updateRestaurant = new UpdateRestaurant(restaurantRepository);

		const restaurant = await updateRestaurant.execute(id, body);

		return ctx.json(restaurant);
	},
);

restaurantController.post(
	"/",
	zValidator("json", restaurantSchema.strict()),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const registerRestaurant = new RegisterRestaurant(restaurantRepository);
		const restaurant = await registerRestaurant.execute(body);

		return ctx.json(restaurant, 201);
	},
);

restaurantController.delete("/:id", async (ctx) => {
	const id = ctx.req.param("id");
	const registerRestaurant = new DestroyRestaurant(restaurantRepository);
	const restaurant = await registerRestaurant.execute(id);

	return ctx.json(restaurant);
});

export default restaurantController;
