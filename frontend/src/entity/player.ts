import { getRendererHeight, getRendererWidth } from "..";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

export class Player extends Entity {
  constructor(playState: PlayState) {
    super(playState);
    this.setOriginToCenter();
    this.setPos(getRendererWidth() / 2, getRendererHeight() / 2)
    this.vx = 1;
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
    this.setDisplayX(getRendererWidth() / 2);
    this.setDisplayY(getRendererHeight() / 2);
    //this.setRotation(this.getRotation() + delta / 50);
  }
}