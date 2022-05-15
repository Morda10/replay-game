export interface Question {
	id: number;
	question: string;
	answers: string[];
	correctAnswer: string;
}

export interface QuestionsForPlayers {
	playerOneQuestions: Question[];
}