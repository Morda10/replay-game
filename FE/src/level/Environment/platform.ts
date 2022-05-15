import { makeSprite, t } from "@replay/core";
import { platformHeight, platformWidth, widePlatformWidth } from "../Level";

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
        height:platformHeight, width: platform.isWide?widePlatformWidth:platformWidth,
        fileName: platform.isWide? "wide_platform.png": "platform.png",
        x: platform.x,
        y: platform.y
      }),
    ];
  },
});

