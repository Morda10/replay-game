import { makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { Player } from "./Player/Player";

type PlayerState = {
    playerY: number;
    playerX: number;
    playerGravity: number;
    isFlippedImg: boolean;
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
    KeyS: 's'
};

const playerMovement = (playerState: PlayerState, getInputs: () => WebInputs, isPlayer2?: boolean) => {
    const inputs = getInputs();
    let { playerGravity, playerY, playerX, isFlippedImg } = playerState;

    playerY -= playerGravity;


    if (isPlayer2 ? inputs.keysDown[KEYS.KeyA] :  inputs.keysDown[KEYS.ArrowLeft]) {
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


    return {
        playerGravity,
        playerY,
        playerX,
        isFlippedImg
    };
};

export const Level = makeSprite<LevelProps, LevelState, WebInputs | iOSInputs>({

    init() {
        return {
            player: {
                playerY: 10,
                playerX: 0,
                playerGravity: 6,
                playerRot: 0,
                isFlippedImg: false
            },
            player2: {
                playerY: 10,
                playerX: -10,
                playerGravity: 6,
                playerRot: 0,
                isFlippedImg: false
            }
        };
    },
    loop({ props, state, getInputs }) {
        if (props.paused) {
            return state;
        }
        const { player: playerState, player2: playerState2 } = state;
        const player  = playerMovement(playerState, getInputs);
        const player2  = playerMovement(playerState2, getInputs, true);

        return {
            player,
            player2
        };
    },
    render({ state, device }) {
        const { size } = device;
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
                isFlippedImg: state.player.isFlippedImg
            }),
            Player({
                id: "player2",
                x: state.player2.playerX,
                y: state.player2.playerY,
                isFlippedImg: state.player2.isFlippedImg
            }),
        ];
    },
});
