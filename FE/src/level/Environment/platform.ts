import { makeSprite, t } from "@replay/core";

export type PlatformT = {
  x: number;
  y: number;
  isWide :boolean
};

export type PlatformProps = {
  platform: PlatformT;
};

export const Platform = makeSprite<PlatformProps>({
  render({ props }) {
    const { platform } = props;
    return [
      t.image({
        height:12, width: platform.isWide?48:16,
        fileName: platform.isWide? "wide_platform.png": "platform.png",
        x: platform.x,
        y: platform.y
      }),
    ];
  },
});

