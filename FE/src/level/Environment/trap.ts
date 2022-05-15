import { makeSprite, t } from "@replay/core";

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
        height: 20, width: 22,
        fileName: "Trap.png",
        x: trap.x,
        y: trap.y
      }),
    ];
  },
});

