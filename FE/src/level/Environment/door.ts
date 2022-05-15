import { makeSprite, t } from "@replay/core";
import { doorWidth } from "../Level";

export type DoorT = {
  x: number;
  y: number;
  open: boolean;
};

type DoorProps = {
  door: DoorT;
};

export const Door = makeSprite<DoorProps>({
  render({ props }) {
    const { door } = props;
    return [
      t.image({
        height: 16, width: doorWidth,
        fileName: door.open ? "door_opened.png" : "door_closed.png",
        x: door.x,
        y: door.y
      }),
    ];
  },
});

