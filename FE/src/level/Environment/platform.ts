import { makeSprite, t } from "@replay/core";

export type PlatformT = {
  x: number;
  y: number;
};

type PlatformProps = {
  platform: PlatformT;
};

export const Platform = makeSprite<PlatformProps>({
  render({ props }) {
    const { platform } = props;
    return [
      t.image({
        height: 12, width: 16,
        fileName: "platform.png",
        x: platform.x,
        y: platform.y
      }),
    ];
  },
});

