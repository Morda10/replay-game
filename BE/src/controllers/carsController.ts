import express from "express";
import { Car } from "../models/car";
import { getAllCars } from "../services/carsServices";

export const carsRouter = express.Router();

//GET /getAllCars
carsRouter.get("/getAllCars", async (_req, res) => {
	try {
		const cars: Car[] = await getAllCars();

		if (cars) {
			return res.status(200).send(cars);
		}
	} catch {
		res.status(500).send("Internal server error");
	}
});
