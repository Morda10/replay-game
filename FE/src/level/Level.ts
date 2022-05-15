import { makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { Bird } from "../bird";
import { Floor, FloorT } from "./Environment/floor";
import { Platform, PlatformT } from "./Environment/platform";
import { WidePlatform, WidePlatformT } from "./Environment/wide_platform";
import { Trap, TrapT } from "./Environment/trap";
import { Door, DoorT } from "./Environment/door";


type LevelState = {
    birdY: number;
    birdX: number;
    birdGravity: number;
    isFlippedImg: boolean;
};

type LevelProps = {
    paused: boolean;
};


export const Level = makeSprite<LevelProps, LevelState, WebInputs | iOSInputs>({
    init() {
        return {
            birdY: 10,
            birdX: 0,
            birdGravity: 6,
            birdRot: 0,
            isFlippedImg: false
        };
    },
    loop({ props, state, getInputs,  }) {
        const inputs = getInputs();
        let { birdY, birdX, isFlippedImg, birdGravity} = state;

        if (props.paused) {
            return state;
        }
        birdY -= birdGravity;

        if (inputs.keysDown["ArrowLeft"]) {
            birdX -= 2;
            isFlippedImg = true;

        }
        if (inputs.keysDown["ArrowRight"]) {
            birdX += 2;
            isFlippedImg = false;

        }
        if (inputs.keysJustPressed["ArrowUp"]) {
            birdGravity = -10;
        }
        if (birdY >= 60) {
            birdGravity = 6;
        }
        if (birdY <= 0) {
            birdY = 0;
        }

        return {
            birdGravity,
            birdY,
            birdX,
            isFlippedImg
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
            Bird({
                id: "bird",
                x: state.birdX,
                y: state.birdY,
                isFlippedImg: state.isFlippedImg
            }),

            // ...state.floors.map((floor, index) =>
            //   Floor({
            //       id: `floor-${index}`,
            //       floor,
            //       x: floor.x,
            //   })
            // ),
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
