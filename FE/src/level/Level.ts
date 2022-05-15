/* eslint-disable prefer-const */
import { makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { Player } from "./Player/Player";
import { Trivia } from "./Trivia";
import questions from "../../assets/data/triviaQuestions.json"

type PlayerState = {
	playerY: number;
	playerX: number;
	playerGravity: number;
	isFlippedImg: boolean;
	showTrivia: boolean;
};

type LevelState = {
	player: PlayerState;
	player2: PlayerState;
};

type LevelProps = {
	paused: boolean;
};

export const KEYS = {
	ArrowLeft: 'ArrowLeft',
	ArrowRight: 'ArrowRight',
	ArrowUp: 'ArrowUp',
	KeyW: 'w',
	KeyA: 'a',
	KeyD: 'd',
	KeyS: 's',
	ONE: '1',
	TWO: '2',
	THREE: '3',
	FOUR: '4',
	FIVE: '5',
	SIX: '6',
	SEVEN: '7',
	EIGHT: '8',
};

const handlePlayerBounds = (playerX: number, playerY: number) => {
	const PLAYER_BOUNDS = {
		x: 540,
		y: 150,
		negX: 40,
		negY: 0,

	};
	let newX = playerX;
	let newY = playerY;
	if (playerX > PLAYER_BOUNDS.x) newX = PLAYER_BOUNDS.x;
	if (playerX < -PLAYER_BOUNDS.negX) newX = -PLAYER_BOUNDS.negX;
	if (playerY > PLAYER_BOUNDS.y) newY = PLAYER_BOUNDS.y;
	if (playerY < -PLAYER_BOUNDS.negY) newY = -PLAYER_BOUNDS.negY;

	return {
		newX,
		newY
	};
};

const playerMovement = (playerState: PlayerState, getInputs: () => WebInputs, isPlayer2?: boolean) => {
	const inputs = getInputs();
	let { playerGravity, playerY, playerX, isFlippedImg, showTrivia } = playerState;

	playerY -= playerGravity;

	if (isPlayer2 ? inputs.keysDown[KEYS.KeyA] : inputs.keysDown[KEYS.ArrowLeft]) {
		playerX -= 2;
		isFlippedImg = true;

	}
	if (isPlayer2 ? inputs.keysDown[KEYS.KeyD] : inputs.keysDown[KEYS.ArrowRight]) {
		playerX += 2;
		isFlippedImg = false;

	}
	if (isPlayer2 ? inputs.keysDown[KEYS.KeyW] : inputs.keysJustPressed[KEYS.ArrowUp]) {
		playerGravity = -10;
	}
	if (playerY >= 60) {
		playerGravity = 6;
	}
	if (playerY <= 0) {
		playerY = 0;
	}

	const { newX, newY } = handlePlayerBounds(playerX, playerY);
	playerX = newX;
	playerY = newY;


	return {
		playerGravity,
		playerY,
		playerX,
		isFlippedImg,
		showTrivia
	};
};

const renderPlayer1Trivia = (questionNumber: number, getInputs: () => WebInputs) => {
	const question = questions.playerOneQuestions[questionNumber];
	const answerId = question.correctAnswer.id;
	const inputs = getInputs();

	if (inputs.keysDown[answerId]) {
		console.log('correct!');
		return false;
	}
	return true;
};

export const Level = makeSprite<LevelProps, LevelState, WebInputs | iOSInputs>({

	init() {
		return {
			player: {
				playerY: 0,
				playerX: 0,
				playerGravity: 6,
				playerRot: 0,
				isFlippedImg: false,
				showTrivia: true
			},
			player2: {
				playerY: 0,
				playerX: -20,
				playerGravity: 6,
				playerRot: 0,
				isFlippedImg: false,
				showTrivia: true
			}
		};
	},
	loop({ props, state, getInputs }) {
		if (props.paused) {
			return state;
		}

		const { player: playerState, player2: playerState2 } = state;
		const player = playerMovement(playerState, getInputs);
		const player2 = playerMovement(playerState2, getInputs, true);
		player.showTrivia = renderPlayer1Trivia(0, getInputs);

		return {
			player,
			player2
		};
	},
	render({ state, device }) {
		const { size } = device;
		const { player: playerState } = state;
		const { showTrivia } = playerState;
		return [
			t.rectangle({
				color: "#add8e6",
				width: size.width + size.widthMargin * 2,
				height: size.height + size.heightMargin * 2,
			}),
			Player({
				id: "player",
				x: state.player.playerX,
				y: state.player.playerY,
				isPlayer2: false,
				playerImg: "flipped-pink-player.png",
				flippedPlayerImg: "Pink_Monster.png"
			}),
			Player({
				id: "player2",
				x: state.player2.playerX,
				y: state.player2.playerY,
				isPlayer2: true,
				playerImg: "flipped-pink-player2.png",
				flippedPlayerImg: "Pink_Monster2.png"
			}),
			showTrivia ? Trivia({
				id: "menu1",
				playerNumber: 0
			}) : null,
			Trivia({
				id: "menu2",
				playerNumber: 1
			})
		];
	},
});
