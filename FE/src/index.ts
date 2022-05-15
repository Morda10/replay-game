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

export enum audioEnums {
  boop,
  jump
};

export const audioFileNames = [
  "boop.wav", "jump.wav"
];

export const Game = makeSprite<GameProps, GameState, WebInputs | iOSInputs>({
  init({ updateState, preloadFiles }) {
    preloadFiles({
      audioFileNames: audioFileNames,
      imageFileNames: ["icon.png", "Pink_Monster.png", "flipped-pink-player.png", "Pink_Monster2.png", "flipped-pink-player2.png"],
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


    return {
      loaded: true,
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
