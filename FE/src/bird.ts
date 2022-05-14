import { makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";

export const birdWidth = 50;
export const birdHeight = 40;

export type BirdProps = {
  isFlippedImg: boolean;
};

type BirdState = {
  isFlippedImg: boolean;
};

export const Bird = makeSprite<BirdProps, BirdState, WebInputs | iOSInputs>({
  init() {
    return {
      isFlippedImg: false
    };
  },
  loop({ state, getInputs }) {
    const inputs = getInputs();
    let { isFlippedImg } = state;


    if (inputs.keysDown["ArrowLeft"]) {
      isFlippedImg = true;

    }
    if (inputs.keysDown["ArrowRight"]) {

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
        width: birdWidth,
        height: birdHeight
      }),
    ];
  },
});