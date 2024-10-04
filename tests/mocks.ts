import type { RestaurantRepository } from "../src/core/repositories/RestaurantRepository";

export const restaurantRepositoryMock: jest.Mocked<RestaurantRepository> = {
	save: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	list: jest.fn(),
	update: jest.fn(),
};

