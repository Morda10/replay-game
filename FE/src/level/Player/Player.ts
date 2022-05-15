import {Device, makeSprite, t} from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { KEYS } from "../Level";
import {audioEnums, audioFileNames} from "../../index";

export const playerWidth = 24;
export const playerHeight = 24;

export type PlayerProps = {
  isPlayer2: boolean;
  playerImg: string;
  flippedPlayerImg: string;
};

type PlayerState = {
  isFlippedImg: boolean;
};

const playPlayerSounds = (inputs: WebInputs, { audio }: Device) => {
  if (inputs.keysJustPressed[KEYS.ArrowUp] || inputs.keysJustPressed[KEYS.KeyW]) {
    const a = audio(audioFileNames[audioEnums.jump]);
    a.setVolume(0.1);
    a.play();
  }
}

const handlePlayerFlipping = (inputs: WebInputs, state:  Readonly<PlayerState>, device: Device, props: Readonly<PlayerProps>) => {
  let { isFlippedImg } = state;
  const { isPlayer2 } = props;
  const leftKey = !isPlayer2 ? inputs.keysDown[KEYS.ArrowLeft] : inputs.keysDown[KEYS.KeyA];
  const rightKey = !isPlayer2 ? inputs.keysDown[KEYS.ArrowRight] : inputs.keysDown[KEYS.KeyD];
  if (leftKey) {
    isFlippedImg = true;
  }
  if (rightKey) {
    isFlippedImg = false;
  }
  return isFlippedImg;
};

export const Player = makeSprite<PlayerProps, PlayerState, WebInputs | iOSInputs>({
  init() {
    return {
      isFlippedImg: false
    };
  },
  loop({ props, state, getInputs, device }) {
    const inputs = getInputs();

    const isFlippedImg = handlePlayerFlipping(inputs, state, device, props);
    playPlayerSounds(inputs, device);

    return {
      isFlippedImg
    };
  },
  render({ props, state }) {
    const { playerImg, flippedPlayerImg } = props;
    return [
      t.image({
        fileName: state.isFlippedImg ? playerImg : flippedPlayerImg,
        width: playerWidth,
        height: playerHeight,
        y: -157,
        x: -250
      }),
    ];
  },
});
