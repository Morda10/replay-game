import { makeSprite, t } from "@replay/core";

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
        height: 32, width: 80,
        fileName: "floor.png",
        x: floor.x,
        y: -185
      }),
    ];
  },
});

