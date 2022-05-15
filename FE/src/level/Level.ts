import { makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { Floor, FloorT } from "./Environment/floor";
import { Platform, PlatformT } from "./Environment/platform";
import { Trap, TrapT } from "./Environment/trap";
import { Door, DoorT } from "./Environment/door";
import { Player } from "./Player/Player";


type PlayerState = {
    playerY: number;
    playerX: number;
    playerGravity: number;
    jumpForce: number;
    isFlippedImg: boolean;
    jumpY: number;
};

type LevelState = {
    player: PlayerState;
    player2: PlayerState;
    floors: FloorT[];
    platforms: PlatformT[];
    doors: DoorT[];
    traps: TrapT[];
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
        y: 500,
        negX: 150,
        negY: 0,

    };
    let newX = playerX;
    let newY = playerY;
    if (playerX > PLAYER_BOUNDS.x) newX = PLAYER_BOUNDS.x;
    if (playerX < -PLAYER_BOUNDS.negX) newX = -PLAYER_BOUNDS.negX;
    if (playerY > PLAYER_BOUNDS.y) newY = PLAYER_BOUNDS.y;
    // if (playerY < -PLAYER_BOUNDS.negY) newY = -PLAYER_BOUNDS.negY;

    return {
        newX,
        newY
    };
};

const playerMovement = (playerState: PlayerState, getInputs: () => WebInputs, floors: FloorT[], platforms: PlatformT[], isPlayer2?: boolean) => {
    const inputs = getInputs();
    let { playerGravity, playerY, playerX, isFlippedImg, jumpForce, jumpY } = playerState;

    if (isPlayer2 ? inputs.keysDown[KEYS.KeyA] :  inputs.keysDown[KEYS.ArrowLeft]) {
        playerX -= 2;
        isFlippedImg = true;
    }
    if (isPlayer2 ? inputs.keysDown[KEYS.KeyD] : inputs.keysDown[KEYS.ArrowRight]) {
        playerX += 2;
        isFlippedImg = false;
    }
    const isGrounded = isStandingFloor(playerY, playerX, floors, platforms);

    if (isPlayer2 ? inputs.keysJustPressed[KEYS.KeyW] : inputs.keysJustPressed[KEYS.ArrowUp]) {
        if (isGrounded) {
            jumpForce = -10;
            jumpY = playerY;
        }
    }
    if (playerY >= jumpY + 50) {
        jumpForce = 0;
    }


    if(isGrounded)
    {
        playerGravity = 0;
    } else {
        playerGravity = 4;
    }
    console.log(playerGravity, isGrounded);

    const { newX, newY } = handlePlayerBounds(playerX, playerY);
    playerX = newX;
    playerY = newY;

    playerY -= playerGravity + jumpForce;

    return {
        playerGravity,
        jumpY,
        jumpForce,
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
                jumpY: 0,
                jumpForce: 0,
                playerRot: 0,
                isFlippedImg: false,
            },
            player2: {
                playerY: 0,
                playerX: -20,
                playerGravity: 6,
                jumpY: 0,
                jumpForce: 0,
                playerRot: 0,
                isFlippedImg: false
            },
            floors:[
                {
                    x: -370
                },
                {
                    x: -60
                    },
                    {
                    x: -260
                    },
                {
                    x: 20
                },
                {
                    x: 100
                },
                {
                    x: 370
                },
            ],
            platforms:[
                {
                    x: -220,
                    y: -120,
                    isWide: false
                },
                {
                    x: -245,
                    y: -95,
                    isWide: false
                },
                {
                    x: -270,
                    y: -70,
                    isWide: false
                },
                {
                    x: -310,
                    y: -50,
                    isWide: true
                },
                {
                x: -80,
                y: -130,
                isWide: false
            },
                {
                    x: -50,
                    y: -110,
                    isWide: false
                },
                {
                    x: -135,
                    y: -120,
                    isWide: false
                },
                {
                    x: 45,
                    y: -90,
                    isWide: false
                },
                {
                    x: 130,
                    y: -60,
                    isWide: false
                },
                {
                    x: 155,
                    y: -50,
                    isWide: false
                },
                {
                    x: 90,
                    y: -80,
                    isWide: true
                },
                {
                    x: -180,
                    y: -140,
                    isWide: true
                },
                {
                    x: 10,
                    y: -130,
                    isWide: true
                },
                {
                    x: 200,
                    y: -40,
                    isWide: true
                },
            ],
            doors:[{
                x: 10,
                y: -117,
                open:false
            },
                {
                    x: 200,
                    y: -27,
                    open:false
                },
                {
                    x: -310,
                    y: -37,
                    open:false
                },
            ],
            traps:[{
                x: -110,
                y: -190,
            },
                {
                    x: -132,
                    y: -190,
                },
                {
                    x: -154,
                    y: -190,
                },
                {
                    x: -176,
                    y: -190,
                },
                {
                    x: -198,
                    y: -190,
                },
                {
                    x: -220,
                    y: -190,
                },
                {
                    x: 150,
                    y: -190,
                },
                {
                    x: 172,
                    y: -190,
                },
                {
                    x: 194,
                    y: -190,
                },
                {
                    x: 216,
                    y: -175,
                },
            ],
        };
    },
    loop({ props, state, getInputs }) {
        if (props.paused) {
            return state;
        }

        const { player: playerState, player2: playerState2 , floors, platforms, doors, traps} = state;
        const player  = playerMovement(playerState, getInputs, floors, platforms);
        const player2  = playerMovement(playerState2, getInputs, floors, platforms, true);
        if(isTouchingTrap(player.playerY,player.playerX,traps))
        {
            console.log("Trap!")
        }
        if(isTouchingDoor(player.playerY,player.playerX,doors))
        {
            console.log("Door!")
        }
        return {
            player,
            player2,
            floors,
            platforms,
            doors,
            traps
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
            ...state.traps.map((trap, index) =>
              Trap({
                  id: `trap-${index}`,
                  trap: newTrap(trap.x, trap.y),
              })
            ),
            ...state.floors.map((floor, index) =>
              Floor({
                  id: `floor-${index}`,
                  floor: newFloor(floor.x),
              })
            ),
            ...state.platforms.map((platform, index) =>
              Platform({
                  id: `platform-${index}`,
                  platform: newPlatform(platform.x, platform.y, platform.isWide),
              })
            ),
            ...state.doors.map((door, index) =>
              Door({
                  id: `door-${index}`,
                  door: newDoor(door.x, door.y),
              })
            ),
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

        ];
    },
});
function newFloor(x: number): FloorT {
    return {
        x,
    };
}
function newPlatform(x: number, y: number, isWide: boolean): PlatformT {
    return {
        x,
        y,
        isWide
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
function isStandingFloor(playerY: number,playerX: number,floors: FloorT[], platforms: PlatformT[]) {
    const actualPlayerX = playerX -250;
    const actualPlayerY = playerY -157 - (playerHeight / 2);
    for (const platform of platforms) {
        const platformWidthDivided = (platform.isWide?widePlatformWidth:platformWidth)/2;
        const isBetweenPlatformX = (actualPlayerX < platform.x + platformWidthDivided && actualPlayerX > platform.x - platformWidthDivided)
        const isPlayerUnderPlatform = actualPlayerY <= platform.y+(platformHeight/2);
        const isPlayerAbovePlatform = actualPlayerY > platform.y-(platformHeight/2);
        const isPlatformUnderPlayer = isPlayerUnderPlatform && isBetweenPlatformX && isPlayerAbovePlatform;
        if (isPlatformUnderPlayer) {
            // standing on a platform
            return true
        }
    }
    for (const floor of floors) {
        if (actualPlayerY <= (-185 + (floorHeight / 2)) && (actualPlayerX > floor.x - (floorWidth/2) && actualPlayerX < floor.x + (floorWidth/2))) {
            // standing on a floor (floor y is -185)
            return true
        }
    }
    return false
}
function isTouchingDoor(playerY: number,playerX: number,doors: DoorT[]) {
    const actualPlayerX = playerX -250;
    const actualPlayerY = playerY -157;
    for (const door of doors) {
        const doorWidthDivided = doorWidth/2
        if (actualPlayerY - (playerHeight/2) >= door.y-(platformHeight/2) && (actualPlayerX < door.x + doorWidthDivided && actualPlayerX > door.x - doorWidthDivided)) {
            // standing on a platform
            return true
        }
    }
    return false
}
function isTouchingTrap(playerY: number,playerX: number,traps: TrapT[]) {
    const actualPlayerX = playerX -250;
    const actualPlayerY = playerY -157;
    for (const trap of traps) {
        const trapWidthDivided = trapWidth/2
        if (actualPlayerY - (playerHeight/2) <= trap.y+(trapHeight/2) && (actualPlayerX < trap.x + trapWidthDivided && actualPlayerX > trap.x - trapWidthDivided)) {
            // standing on a platform
            return true
        }
    }
    return false
}

export const platformHeight = 12;
export const playerHeight = 24;
export const floorWidth = 80;
export const widePlatformWidth = 48;
export const platformWidth = 16;
export const floorHeight = 32;
export const doorWidth = 12;
export const trapWidth = 22;
export const trapHeight = 20;

