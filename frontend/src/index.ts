import { Sound } from "@pixi/sound";
import * as PIXI from "pixi.js";
import { PlayState } from "./gameState/playState";
import { setupNetworking } from "./networking";
import {TotalGameState, PlayerState, PlayerInfo, EntityState} from "./types";

alert("Once started, click anywhere to dash.")

export const SCALE = 2;

let app = new PIXI.Application({ resizeTo: window });
app.stage.scale.x = SCALE;
app.stage.scale.y = SCALE;

export const getRendererWidth = () => app.renderer.width / SCALE;
export const getRendererHeight = () => app.renderer.height / SCALE;

document.body.appendChild(app.view);

let gameState: PlayState = new PlayState(app);;

export const onReceiveSetup = (state: TotalGameState, playerInfo: PlayerInfo) => {
  console.log("Game state received:", state);

  gameState.setState(state);
  gameState.player.setX(playerInfo.x);
  gameState.player.setY(playerInfo.y);
  gameState.player.setId(playerInfo.id);
  gameState.player.setName("Knight " + playerInfo.id);

  window.addEventListener("mousemove", function (event) {
    gameState.player.setMouse(event.x, event.y);
  });
  window.addEventListener("click", function (event) {
    gameState.player.speedUp();
    gameState.player.rotate(event.x, event.y);
  });

  const interval = 1/60;
  setInterval(() => {
    gameState.update(interval);
    gameState.draw(interval);
  }, interval)
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

export const onMovePlayer = (id: string, x: number, y: number, rotation: number) => {
  if (gameState.player.getId() == id) {
    gameState.player.setX(x);
    gameState.player.setY(y);
    if (Math.abs(gameState.player.getRotation() - rotation) > 0.01) {
      gameState.player.setRotation(rotation);
    }
    return;
  }
  
  if (!(id in gameState.otherPlayers)) {
    console.error("Player", id, "not in players array.");
    return;
  }
  gameState.otherPlayers[id].setX(x);
  gameState.otherPlayers[id].setY(y);
  if (Math.abs(gameState.otherPlayers[id].getRotation() - rotation) > 0.01) {
    gameState.otherPlayers[id].setRotation(rotation);
  }
}

export const onReceiveRocks = (rocks: EntityState[]) => {
  rocks.forEach((entity, i) => {
    gameState.entities[i].x = entity.x;
    gameState.entities[i].y = entity.y;
  });
}

const socket = setupNetworking();

setInterval(() => {
  socket.emit("move", gameState.player.getVx(), gameState.player.getVy(), gameState.player.getRotation());
}, 1/30);

const sound = Sound.from('assets/battleThemeA.mp3');
sound.play();