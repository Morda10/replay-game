import { makeSprite, t } from "@replay/core";
import questions from "../../assets/data/triviaQuestions.json"

export type TriviaProps = {
	playerNumber: number;
};

const renderAnswers = (answers: string[]) => {
	return answers.map((answer: string, index: number) => {
		return t.text({
			color: 'white',
			font: { weight: 'bold', size: 15 },
			text: answer,
			x: 250,
			y: (index - 2) * 20
		})
	});
}

const renderAnswerNumbers = (answers: string[]) => {
	return answers.map((_answer: string, index: number) => {
		return t.text({
			color: 'cyan',
			font: { weight: 'bold', size: 15 },
			text: (index + 1).toString(),
			x: 200,
			y: (index - 2) * 20
		})
	});
}

export const Trivia = makeSprite<TriviaProps>({
	render({ props }) {
		const { playerNumber } = props;
		const randomQuestionNumber = 0;
		// const randomQuestionNumber = Math.floor(Math.random() * 5);

		return [
			t.text({
				color: 'yellow',
				text: questions.playerOneQuestions[randomQuestionNumber].question,
				font: { weight: 'bold', size: 15 },
				x: 250,
				y: 58
			}),
			...renderAnswers(questions.playerOneQuestions[randomQuestionNumber].answers),
			...renderAnswerNumbers(questions.playerOneQuestions[randomQuestionNumber].answers),
			t.text({
				color: 'yellow',
				text: "בחר תשובה עם מספרי המקלדת",
				font: { weight: 'bold', size: 12 },
				x: 250,
				y: -80
			}),
			t.image({
				fileName: "menu.png",
				width: 250,
				height: 250,
				x: playerNumber === 0 ? 250 : -250,
				opacity: 1
			})
		];
	},
});