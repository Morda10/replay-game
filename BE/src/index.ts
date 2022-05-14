import express, { Application } from 'express';
import cors from "cors";
import { PORT } from './config';
import { carsRouter } from './controllers/carsController';

const app: Application = express();

app.use(cors());
app.use(express.json());

/* All middlewares to use controllers here */
app.use("/api/cars", carsRouter);

app.listen(PORT, (): void => {
	console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
