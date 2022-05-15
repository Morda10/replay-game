import { makeSprite, t } from "@replay/core";
import { trapHeight, trapWidth } from "../Level";

export type TrapT = {
  x: number;
  y: number;
};

type TrapProps = {
  trap: TrapT;
};

export const Trap = makeSprite<TrapProps>({
  render({ props }) {
    const { trap } = props;
    return [
      t.image({
        height: trapHeight, width: trapWidth,
        fileName: "Trap.png",
        x: trap.x,
        y: trap.y
      }),
    ];
  },
});

