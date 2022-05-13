import { makeSprite, t, Device } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { Bird, birdWidth } from "../bird";
import { Pipe, PipeT, pipeWidth, pipeGap } from "./Floors/Floor";


type LevelState = {
    birdY: number;
    birdX: number;
    birdGravity: number;
    pipes: PipeT[];
};

type LevelProps = {
    paused: boolean;
};

const speedX = 2;

export const Level = makeSprite<LevelProps, LevelState, WebInputs | iOSInputs>({
    init({ device }) {
        return {
            birdY: 10,
            birdX: 0,
            birdGravity: 0,
            pipes: [newPipe(device)],
        };
    },
    loop({ props, state, getInputs }) {
        const inputs = getInputs();
        let { birdGravity, birdY, birdX, pipes } = state;
        if (props.paused) {
            return state;
        }
        // birdGravity += 0.8;
        birdY -= birdGravity;
        if (inputs.keysDown["ArrowLeft"]) {
            birdX -= 2;
        }
        if (inputs.keysDown["ArrowRight"]) {
            birdX += 2;
        }
        if (inputs.keysDown["ArrowUp"]) {
            birdY += 10;
        }
        const lastPipe = pipes[pipes.length - 1];
        if (lastPipe.x < 140) {
            pipes = [...pipes, newPipe(device)]
                // Remove the pipes off screen on left
                .filter(
                    (pipe) =>
                        pipe.x > -(device.size.width + device.size.widthMargin + pipeWidth)
                );
        }

        // Move pipes to the left
        pipes = pipes.map((pipe) => {
            let passed = pipe.passed;
            if (!passed && pipe.x < birdX - birdWidth / 2 - pipeWidth / 2) {
                // Mark pipe as having passed bird's x position
                passed = true;
            }
            return { ...pipe, passed, x: pipe.x - speedX };
        });

        return {
            birdGravity,
            birdY,
            birdX,
            pipes,
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

            }),
            ...state.pipes.map((pipe, index) =>
                Pipe({
                    id: `pipe-${index}`,
                    pipe,
                    x: pipe.x,
                })
            ),
        ];
    },
});
