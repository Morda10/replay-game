import { Device, makeSprite, t } from "@replay/core";
import { WebInputs } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { KEYS } from "../Level";
import { audioEnums, audioFileNames } from "../../index";

export const playerWidth = 32;
export const playerHeight = 32;

export type PlayerProps = {
  isPlayer2: boolean;
  playerImg: string;
  jumpImg: string;
  flippedPlayerImg: string;
};

type PlayerState = {
  isFlippedImg: boolean;
  frame: number;
  isMoving: boolean;
  isJump: boolean;
};

const playPlayerSounds = (inputs: WebInputs, { audio }: Device) => {
  if (inputs.keysJustPressed[KEYS.ArrowUp] || inputs.keysJustPressed[KEYS.KeyW]) {
    const a = audio(audioFileNames[audioEnums.jump]);
    a.setVolume(0.1);
    console.log(a.getVolume());
    a.play();
  }
}

const handlePlayerFlipping = (inputs: WebInputs, state: Readonly<PlayerState>, device: Device, props: Readonly<PlayerProps>) => {
  let { isFlippedImg } = state;
  const { isPlayer2 } = props;
  const leftKey = !isPlayer2 ? inputs.keysDown[KEYS.ArrowLeft] : inputs.keysDown[KEYS.KeyA];
  const rightKey = !isPlayer2 ? inputs.keysDown[KEYS.ArrowRight] : inputs.keysDown[KEYS.KeyD];
  const upKey = !isPlayer2 ? inputs.keysDown[KEYS.ArrowUp] : inputs.keysDown[KEYS.KeyW];
  const isMoving = (leftKey || rightKey || upKey) as boolean;

  if (leftKey) {
    isFlippedImg = true;
  }
  if (rightKey) {
    isFlippedImg = false;
  }


  return {
    isFlippedImg,
    isMoving,
  };
};

export const Player = makeSprite<PlayerProps, PlayerState, WebInputs | iOSInputs>({
  init() {
    return {
      isFlippedImg: false,
      isMoving: false,
      frame: 0,
      isJump: false

    };
  },
  loop({ props, state, getInputs, device }) {
    const inputs = getInputs();

    const { isFlippedImg, isMoving } = handlePlayerFlipping(inputs, state, device, props);
    playPlayerSounds(inputs, device);
    const newFrame = state.frame + 0.4;

    let isPlayerJump = false
    if (inputs.keysDown[KEYS.ArrowUp]) {
      isPlayerJump = true
    }

    return {
      isFlippedImg,
      frame: newFrame,
      isMoving,
      isJump: isPlayerJump
    };
  },
  render({ props, state }) {
    const { playerImg, flippedPlayerImg, jumpImg } = props;
    return [t.spriteSheet({
      fileName: state.isJump ? jumpImg : playerImg,
      columns: 8,
      rows: 1,
      index: state.isJump ? Math.round(state.frame) : 0,
      width: playerWidth,
      height: playerHeight,
      y: -150,
      x: -250
    }),
    t.spriteSheet({
      fileName: state.isFlippedImg ? flippedPlayerImg : playerImg,
      columns: 6,
      rows: 1,
      index: state.isMoving ? Math.round(state.frame) : 0,
      width: playerWidth,
      height: playerHeight,
      y: -150,
      x: -250
    }),

    ];
  },
});
