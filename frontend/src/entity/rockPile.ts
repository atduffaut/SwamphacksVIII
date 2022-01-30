import { Entity } from "./entity";
import { PlayState } from "../gameState/playState";
import { getRendererHeight, getRendererWidth, SCALE } from "..";

export class RockPile extends Entity {
  speed: number = 10;
  xDir = 0;
  yDir = 0;

  constructor(playState: PlayState) {
    super(playState);
    this.setOriginToCenter();
    this.setPos(getRendererWidth() / 2, getRendererHeight() / 2);
  }

  getSpriteName() {
    return "rock_pile";
  }
  hit(x, y, speed) {
    this.xDir = x;
    this.yDir = y;
    this.speed = speed;
  }
  move() {
    let myX = this.getDisplayX() * SCALE;
    let myY = this.getDisplayY() * SCALE;

    let dist = Math.sqrt(Math.pow(this.xDir, 2) + Math.pow(this.yDir, 2));
    dist = dist < 1 ? 1 : dist; // Fixes division by zero

    this.setVx((this.xDir * this.speed) / dist);
    this.setVy((this.yDir * this.speed) / dist);
  }
  speedManager(delta) {
    if (this.speed > 0) {
      this.speed = this.speed - delta / 10;
    }
    if (this.speed < 0) {
      this.speed = 0;
    }
  }
  draw(delta: number) {
    this.speedManager(delta);
    this.move();
  }
}
