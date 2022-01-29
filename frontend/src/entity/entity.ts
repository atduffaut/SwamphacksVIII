import { Sprite } from "pixi.js";
import { GameState } from "../gameState/gameState";

export abstract class Entity implements Updatable {
  gameState: GameState;

  x: number;
  y: number;
  vx: number;
  vy: number;
  sprite: Sprite;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.setSpriteFromPath(this.getSpritePath());
  }

  abstract update(delta: number);
  abstract draw(delta: number);

  private setSpriteFromPath(path: string) {
    this.sprite = Sprite.from(path);
  }
  abstract getSpritePath(): string;

  setX(x: number) {
    this.x = x;
  }
  setY(y: number) {
    this.y = y;
  }
  setPos(x: number, y: number) {
    this.setX(x);
    this.setY(y);
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}
