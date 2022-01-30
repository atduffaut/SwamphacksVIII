import * as PIXI from "pixi.js";
import { PlayState } from "./gameState/playState";
import { setupNetworking } from "./networking";
import {TotalGameState, PlayerState} from "./types";

export const SCALE = 2;

let app = new PIXI.Application({ resizeTo: window });
app.stage.scale.x = SCALE;
app.stage.scale.y = SCALE;

export const getRendererWidth = () => app.renderer.width / SCALE;
export const getRendererHeight = () => app.renderer.height / SCALE;

document.body.appendChild(app.view);

let gameState: PlayState = new PlayState(app);;

export const onReceiveSetup = (state: TotalGameState) => {
  console.log("Game state received:", state);

  gameState.setState(state);

  window.addEventListener("mousemove", function (event) {
    gameState.player.setMouse(event.x, event.y);
  });
  window.addEventListener("click", function (event) {
    gameState.player.speedUp();
    gameState.player.rotate(event.x, event.y);
  });

  app.ticker.add((delta: number) => {
    gameState.update(delta);
    gameState.draw(delta);
  });
};

export const onReceivePlayerDisconnect = (playerId: string) => {
  if (!(playerId in gameState.otherPlayers)) {
    return;
  }

  console.log("Player disconnected:", playerId);

  app.stage.removeChild(gameState.otherPlayers[playerId].sprite);
  gameState.otherPlayers[playerId].sprite.destroy();
  delete gameState.otherPlayers[playerId];

  console.log("Deleted player", playerId);
  console.log("Players are now", gameState.otherPlayers);
};

export const onReceivePlayerJoin = (id: string, player: PlayerState) => {
  gameState.addOtherPlayerFromState(id, player);

  console.log("New player:", id);
};

setupNetworking();