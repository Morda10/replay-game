import { makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { Floor, FloorT } from "./Environment/floor";
import { Platform, PlatformT } from "./Environment/platform";
import { WidePlatform, WidePlatformT } from "./Environment/wide_platform";
import { Trap, TrapT } from "./Environment/trap";
import { Door, DoorT } from "./Environment/door";
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

const handlePlayerBounds = (playerX: number, playerY: number) => {
    const PLAYER_BOUNDS = {
        x: 650,
        y: 150,
        negX: 150,
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
    let { playerGravity, playerY, playerX, isFlippedImg } = playerState;

    playerY -= playerGravity;

    if (isPlayer2 ? inputs.keysDown[KEYS.KeyA] : inputs.keysDown[KEYS.ArrowLeft]) {
        playerX -= 2;
        isFlippedImg = true;

    }
    if (isPlayer2 ? inputs.keysDown[KEYS.KeyD] : inputs.keysDown[KEYS.ArrowRight]) {
        playerX += 2;
        isFlippedImg = false;

    }
    if (isPlayer2 ? inputs.keysJustPressed[KEYS.KeyW] : inputs.keysJustPressed[KEYS.ArrowUp]) {
        playerGravity = -10;
    }
    if (playerY >= 60) {
        playerGravity = 6;
    }
    // if (playerY <= 0) {
    //     playerY = 0;
    // }

    const { newX, newY } = handlePlayerBounds(playerX, playerY);
    playerX = newX;
    playerY = newY;


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
                playerY: 0,
                playerX: 0,
                playerGravity: 6,
                playerRot: 0,
                isFlippedImg: false,
            },
            player2: {
                playerY: 0,
                playerX: -20,
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
        const player = playerMovement(playerState, getInputs);
        const player2 = playerMovement(playerState2, getInputs, true);
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
            Floor({
                floor: newFloor(-160),
                id: "floor"
            }),
            Floor({
                floor: newFloor(-60),
                id: "floor1"
            }),
            Trap({
                trap: newTrap(-110, -190),
                id: "trap"
            }),
            Platform({
                platform: newPlatform(-80, -130),
                id: "platform1"
            }),
            Platform({
                platform: newPlatform(-50, -110),
                id: "platform2"
            }),
            Platform({
                platform: newPlatform(-20, -90),
                id: "platform3"
            }),
            WidePlatform({
                platform: newWidePlatform(10, -130),
                id: "wide_platform"
            }),
            Door({
                door: newDoor(10, -85),
                id: "door"
            }),
            Player({
                id: "player",
                x: state.player.playerX,
                y: state.player.playerY,
                isPlayer2: false,
                playerImg: "Dude_Monster_Walk_6.png",
                flippedPlayerImg: "Dude_Monster_Walk_flip.png",
                jumpImg: "Dude_Monster_Jump_8.png"
            }),
            Player({
                id: "player2",
                x: state.player2.playerX,
                y: state.player2.playerY,
                isPlayer2: true,
                playerImg: "flipped-pink-player2.png",
                flippedPlayerImg: "Pink_Monster2.png",
                jumpImg: "Dude_Monster_Jump_8.png"
            }),

        ];
    },
});
function newFloor(x: number): FloorT {
    return {
        x,
    };
}
function newPlatform(x: number, y: number): PlatformT {
    return {
        x,
        y,
    };
}
function newWidePlatform(x: number, y: number): WidePlatformT {
    return {
        x,
        y,
    };
}
function newTrap(x: number, y: number): TrapT {
    return {
        x,
        y,
    };
}
function newDoor(x: number, y: number): DoorT {
    return {
        x,
        y,
        open: false
    };
}
