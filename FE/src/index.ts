import { makeSprite, t, GameProps } from "@replay/core";
import { WebInputs, RenderCanvasOptions } from "@replay/web";
import { iOSInputs } from "@replay/swift";
import { Level } from "./level/Level";
import { Menu } from "./level/Menu/Menu";

export const options: RenderCanvasOptions = {
  dimensions: "scale-up",
};


export const gameProps: GameProps = {
  id: "Game",
  size: {
    landscape: {
      width: 600,
      height: 400,
      maxWidthMargin: 150,
    },
    portrait: {
      width: 400,
      height: 600,
      maxHeightMargin: 150,
    },
  },
  defaultFont: {
    family: "Courier",
    size: 10,
  },
};

type GameState = {
  loaded: boolean;
  view: "menu" | "level";
};

export const Game = makeSprite<GameProps, GameState, WebInputs | iOSInputs>({
  init({ updateState, preloadFiles }) {
    preloadFiles({
      audioFileNames: ["boop.wav"],
      imageFileNames: ["icon.png", "Pink_Monster.png", "flipped-pink-player.png"],
    }).then(() => {
      updateState((state) => ({ ...state, loaded: true }));
    });

    return {
      loaded: false,
      view: "level"
    };
  },

  loop({ state }) {
    if (!state.loaded) return state;

    // const { pointer } = getInputs();
    // const { posX, posY } = state;
    // let { targetX, targetY } = state;

    // if (pointer.justPressed) {
    //   device.audio("boop.wav").play();
    //   targetX = pointer.x;
    //   targetY = pointer.y;
    // }

    return {
      loaded: true,
      // posX: posX + (targetX - posX) / 10,
      // posY: posY + (targetY - posY) / 10,
      // targetX,
      // targetY,
      view: "level"
    };
  },

  render({ state, updateState }) {
    if (!state.loaded) {
      return [
        t.text({
          text: "Loading...",
          color: "black",
        }),
      ];
    }
    const inMenuScreen = state.view === "menu";
    return [
      Level({
        id: "level",
        paused: inMenuScreen,
      }),
      inMenuScreen
        ? Menu({
          id: "menu",
          start: () => {
            updateState((prevState) => {
              return {
                ...prevState,
                view: "level",
              };
            });
          },
        })
        : null,
    ];
  },
});
