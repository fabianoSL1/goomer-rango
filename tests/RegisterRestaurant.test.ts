import { ScheduleDay } from "../src/core/entities/Schedule";
import { RegisterRestaurant } from "../src/core/RegisterRestaurant";
import type { RestaurantRepository } from "../src/core/repositories/RestaurantRepository";
import type { CreateRestaurantRequest } from "../src/dtos/CreateRestaurantRequest";

const restaurantRepositoryMock: jest.Mocked<RestaurantRepository> = {
	save: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	list: jest.fn(),
	update: jest.fn(),
};

describe("Register restaurant use case", () => {
	test("should except when has invalid schedule", async () => {
		const input: CreateRestaurantRequest = {
			picture: "defante.png",
			name: "rango brabo",
			address: "não sei",
			schedules: [{ day: ScheduleDay.MONDAY, begin: "08:00", end: "08:14" }],
		};

		const registerRestaurant = new RegisterRestaurant(restaurantRepositoryMock);

		await expect(registerRestaurant.execute(input)).rejects.toBeInstanceOf(
			Error,
		);
	});

    test("should except when has invalid schedule", async () => {
		const input: CreateRestaurantRequest = {
			picture: "defante.png",
			name: "rango brabo",
			address: "não sei",
			schedules: [{ day: ScheduleDay.MONDAY, begin: "09:30", end: "08:00" }],
		};

		const registerRestaurant = new RegisterRestaurant(restaurantRepositoryMock);

		await expect(registerRestaurant.execute(input)).rejects.toBeInstanceOf(
			Error,
		);
	});

    test("should ok when valid input", async () => {
		const input: CreateRestaurantRequest = {
			picture: "defante.png",
			name: "rango brabo",
			address: "não sei",
			schedules: [{ day: ScheduleDay.MONDAY, begin: "09:30", end: "10:00" }],
		};

		const registerRestaurant = new RegisterRestaurant(restaurantRepositoryMock);

		await expect(registerRestaurant.execute(input)).resolves.toBeUndefined();
	});
});
