import { makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { Bird } from "../bird";


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
    loop({ props, state, getInputs }) {
        const inputs = getInputs();
        let { birdY, birdX, isFlippedImg, birdGravity } = state;

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
            Bird({
                id: "bird",
                x: state.birdX,
                y: state.birdY,
                isFlippedImg: state.isFlippedImg
            }),
        ];
    },
});
