import { Sprite, Texture } from "pixi.js";
import { TEXTURES } from "../assetManager";
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
    this.setSpriteTexture(this.getSpriteTexture());
  }

  abstract update(delta: number);
  abstract draw(delta: number);

  private setSpriteTexture(texture: Texture) {
    this.sprite = new Sprite(texture);
  }
  getSpriteTexture(): Texture {
    return TEXTURES[this.getSpriteName()];
  }
  abstract getSpriteName(): string;

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
