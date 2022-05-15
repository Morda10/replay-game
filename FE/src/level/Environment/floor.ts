import { makeSprite, t } from "@replay/core";
import { floorWidth } from "../Level";

export type FloorT = {
  x: number;
};

type FloorProps = {
  floor: FloorT;
};

export const Floor = makeSprite<FloorProps>({
  render({ props }) {
    const { floor } = props;
    return [
      t.image({
        height: 32, width: floorWidth,
        fileName: "floor.png",
        x: floor.x,
        y: -185
      }),
    ];
  },
});

