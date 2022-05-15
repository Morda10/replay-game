import { QuestionsForPlayers } from '../models/question';
import questions from '../mocks/triviaQuestions.json';

export const getAllQuestions = async (): Promise<QuestionsForPlayers> => {
	return questions;
};
