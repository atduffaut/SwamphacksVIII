import { RENDERER_HEIGHT, RENDERER_WIDTH } from "..";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

export class Player extends Entity {
  constructor(playState: PlayState) {
    super(playState);
    this.setOriginToCenter();

    this.setDisplayX(RENDERER_WIDTH / 2);
    this.setDisplayY(RENDERER_HEIGHT / 2);
  }
  getSpriteName() {
    return "knight";
  }
  update(delta: number) {
    super.update(delta);
  }
  move(x, y)
  {
    let myX = this.getDisplayX()*3;
    let myY = this.getDisplayY()*3;

    let dist = Math.sqrt(Math.pow(myX - x, 2) + Math.pow(myY - y, 2));

    this.setVx((x - myX) / dist);
    this.setVy((y - myY) / dist);
  }
  draw(delta: number) {
    this.setRotation(this.getRotation() + delta / 50);
  }
}