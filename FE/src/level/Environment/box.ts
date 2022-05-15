import { makeSprite, t } from "@replay/core";
import { boxHeight, boxWidth } from "../Level";

export type BoxT = {
  x: number;
  y: number;
};

type BoxProps = {
  box: BoxT;
};

export const Box = makeSprite<BoxProps>({
  render({ props }) {
    const { box } = props;
    return [
      t.image({
        height: boxHeight, width: boxWidth,
        fileName:  "box.png",
        x: box.x,
        y: box.y
      }),
    ];
  },
});

