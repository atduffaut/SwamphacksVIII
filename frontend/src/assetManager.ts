import { SCALE_MODES, settings, Texture } from "pixi.js";
settings.SCALE_MODE = SCALE_MODES.NEAREST;

const PREFIX = "assets";

const RAW_ASSET_PATHS = {
  knight: "knight.png",
  red_knight: "red_knight.png",
  rock_pile: "rock_pile.png",
  background: "background.png",
};

const ASSET_PATHS = Object.entries(RAW_ASSET_PATHS).reduce(
  (object, [key, value]) => {
    return { ...object, [key]: [PREFIX, value].join("/") };
  },
  {}
);

export const TEXTURES = Object.entries(ASSET_PATHS).reduce(
  (object, [key, value]: [string, string]) => {
    return { ...object, [key]: Texture.from(value) };
  },
  {}
);
