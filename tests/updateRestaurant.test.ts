import { Restaurant } from "../src/core/entities/Restaurant";
import { Schedule, ScheduleDay } from "../src/core/entities/Schedule";
import { UpdateRestaurant } from "../src/core/UpdateRestaurant";
import type { UpdateRestaurantRequest } from "../src/dtos/UpdateRestaurantRequest";
import { restaurantRepositoryMock } from "./mocks";

describe("Update restaurant use case", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	test("should except when has invalid schedule", async () => {
		const input: UpdateRestaurantRequest = {
			schedules: [{ day: ScheduleDay.MONDAY, begin: "08:00", end: "08:14" }],
		};

		const registerRestaurant = new UpdateRestaurant(restaurantRepositoryMock);

		await expect(registerRestaurant.execute("1", input)).rejects.toBeInstanceOf(
			Error,
		);
	});

	test("should ok when valid input", async () => {
		const restaurantMock = new Restaurant(
			"rango brabo",
			"ainda não sei",
			"pain_vs_g2.png",
			[new Schedule(ScheduleDay.MONDAY, "09:00", "10:00")],
		);

		jest
			.spyOn(restaurantRepositoryMock, "get")
			.mockResolvedValue(restaurantMock);

		const input: UpdateRestaurantRequest = {
			schedules: [{ day: ScheduleDay.MONDAY, begin: "09:30", end: "10:00" }],
		};

		const expected = {
			...restaurantMock,
			schedules: input.schedules,
		};

		const registerRestaurant = new UpdateRestaurant(restaurantRepositoryMock);

		const result = await registerRestaurant.execute("1", input);

		expect(result).toBe(expected);
	});
});
