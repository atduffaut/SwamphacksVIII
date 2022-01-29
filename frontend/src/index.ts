import * as PIXI from "pixi.js";
import { PlayState } from "./gameState/playState";

export const SCALE = 2;

let app = new PIXI.Application({ resizeTo: window });
app.stage.scale.x = SCALE;
app.stage.scale.y = SCALE;

export const getRendererWidth = () => app.renderer.width / SCALE;
export const getRendererHeight = () => app.renderer.height / SCALE;

document.body.appendChild(app.view);

setTimeout(() => {
  let gameState = new PlayState(app);

  window.addEventListener('mousemove', function (event) {
    gameState.player.setMouse(event.x, event.y);
  });
  window.addEventListener('click', function (event) {
    gameState.player.speedUp();
    gameState.player.rotate(event.x, event.y);
  });

  app.ticker.add((delta: number) => {
    gameState.update(delta);
    gameState.draw(delta);
  });
}, 1000);