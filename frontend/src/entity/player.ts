import { getRendererHeight, getRendererWidth, SCALE } from "..";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

export class Player extends Entity {
  constructor(playState: PlayState) {
    super(playState);
    this.setOriginToCenter();
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
    let myX = this.getDisplayX()*SCALE;
    let myY = this.getDisplayY()*SCALE;

    let dist = Math.sqrt(Math.pow(myX - x, 2) + Math.pow(myY - y, 2));

    this.setVx((x - myX) / dist);
    this.setVy((y - myY) / dist);
  }
  rotate(x, y) {
    this.setRotation(Math.atan2(y - SCALE*this.getDisplayY(), x - SCALE*this.getDisplayX()) + 3*Math.PI/2);
  }   
  draw(delta: number) {
    this.setDisplayX(getRendererWidth() / 2);
    this.setDisplayY(getRendererHeight() / 2);
    this.setRotation(this.getRotation());
  }
}