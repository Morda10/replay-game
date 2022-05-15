import express from "express";
import { QuestionsForPlayers } from "../models/question";
import { getAllQuestions } from "../services/questionsServices";

export const questionsRouter = express.Router();

//GET /getTriviaQuestions
questionsRouter.get("/getTriviaQuestions", async (_req, res) => {
	try {
		const questions: QuestionsForPlayers = await getAllQuestions();

		if (questions) {
			return res.status(200).send(questions);
		}
	} catch {
		res.status(500).send("Internal server error");
	}
});
