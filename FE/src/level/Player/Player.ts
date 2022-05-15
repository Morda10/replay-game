import { makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { KEYS } from "../Level";

export const playerWidth = 50;
export const playerHeight = 40;

export type PlayerProps = {
  isFlippedImg: boolean;
};

type PlayerState = {
  isFlippedImg: boolean;
};

export const Player = makeSprite<PlayerProps, PlayerState, WebInputs | iOSInputs>({
  init() {
    return {
      isFlippedImg: false
    };
  },
  loop({ state, getInputs }) {
    const inputs = getInputs();
    let { isFlippedImg } = state;


    if (inputs.keysDown[KEYS.ArrowLeft]) {
      isFlippedImg = true;

    }
    if (inputs.keysDown[KEYS.ArrowRight]) {

      isFlippedImg = false;

    }

    return {
      isFlippedImg
    };
  },
  render({ state }) {
    return [
      t.image({
        fileName: state.isFlippedImg ? "flipped-pink-player.png" : "Pink_Monster.png",
        width: playerWidth,
        height: playerHeight,
        y: 0,
        x: 0
      }),
    ];
  },
});
