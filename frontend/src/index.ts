import * as PIXI from "pixi.js";
import { PlayState } from "./gameState/playState";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
export const SCALE = 3;

let app = new PIXI.Application({ resizeTo: window });
app.stage.scale.x = SCALE;
app.stage.scale.y = SCALE;

document.body.appendChild(app.view);

let gameState = new PlayState(app);

app.ticker.add((delta: number) => {
  gameState.update(delta);
  gameState.draw(delta);
});
