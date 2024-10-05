import { app } from "../../src";

describe("Testes de integração para restaurante", () => {
	test("POST /restaurants", async () => {
		const response = await app.request("/restaurants", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				picture: "defante.png",
				name: "rango brabo",
				address: "não sei",
				schedules: [{ day: "saturday", begin: "20:00", end: "20:30" }],
			}),
		});

		const json = await response.json();

		expect(response.status).toBe(201);
		expect(json.id).toBeDefined();
		expect(json.schedules).toHaveLength(1);
	});
});
