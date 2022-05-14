import { Car } from '../models/car';
import cars from '../mocks/cars.json';

export const getAllCars = async (): Promise<Car[]> => {
	return cars;
};
