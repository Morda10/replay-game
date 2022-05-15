import { makeSprite, t } from "@replay/core";

export type WidePlatformT = {
  x: number;
  y: number;
};

type WidePlatformProps = {
  platform: WidePlatformT;
};

export const WidePlatform = makeSprite<WidePlatformProps>({
  render({ props }) {
    const { platform } = props;
    return [
      t.image({
        height: 12, width: 48,
        fileName: "wide_platform.png",
        x: platform.x,
        y: platform.y
      }),
    ];
  },
});

