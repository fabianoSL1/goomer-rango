import { Hono } from "hono";
import { Pool } from "pg";
import { RestaurantRepositoryPostgres } from "../repositories/RestaurantRepositoryPostgres";
import { ListRestaurant } from "../../core/ListRestaurant";
import { GetRestaurant } from "../../core/GetRestaurant";
import { UpdateRestaurant } from "../../core/UpdateRestaurant";
import { RegisterRestaurant } from "../../core/RegisterRestaurant";
import { DestroyRestaurant } from "../../core/destroyRestaurant";

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

restaurantController.patch("/:id", async (ctx) => {
	const id = ctx.req.param("id");
	const updateRestaurant = new UpdateRestaurant(restaurantRepository);
	const restaurant = await updateRestaurant.execute(id, await ctx.req.json());

	return ctx.json(restaurant);
});

restaurantController.post("/", async (ctx) => {
	const registerRestaurant = new RegisterRestaurant(restaurantRepository);
	const restaurant = await registerRestaurant.execute(await ctx.req.json());

	return ctx.json(restaurant);
});

restaurantController.delete("/:id", async (ctx) => {
	const id = ctx.req.param("id");
	const registerRestaurant = new DestroyRestaurant(restaurantRepository);
	const restaurant = await registerRestaurant.execute(id);

	return ctx.json(restaurant);
});

export default restaurantController;