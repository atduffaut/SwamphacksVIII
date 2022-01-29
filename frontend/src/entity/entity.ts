import { Sprite, Texture } from "pixi.js";
import { TEXTURES } from "../assetManager";
import { GameState } from "../gameState/gameState";

export abstract class Entity implements Updatable {
  gameState: GameState;

  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  sprite: Sprite;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.setSpriteTexture(this.getSpriteTexture());
  }

  update(delta: number) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;
  }
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

  addX(x: number) {
    this.x += x;
  }
  addY(y: number) {
    this.y += y;
  }

  setVx(vx: number) {
    this.vx = vx;
  }
  setVy(vy: number) {
    this.vy = vy;
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }

  setDisplayX(x: number) {
    this.sprite.x = x;
  }
  setDisplayY(y: number) {
    this.sprite.y = y;
  }

  getDisplayX(): number {
    return this.sprite.x;
  }
  getDisplayY(): number {
    return this.sprite.y;
  }

  getWidth(): number {
    return this.sprite.width;
  }
  getHeight(): number {
    return this.sprite.height;
  }

  setRotation(rotation: number) {
    this.sprite.rotation = rotation;
  }
  getRotation(): number {
    return this.sprite.rotation;
  }

  setOriginToCenter() {
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
  }
}
