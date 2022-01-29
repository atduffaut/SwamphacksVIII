import { getRendererHeight, getRendererWidth } from "..";
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
  draw(delta: number) {
    this.setDisplayX(getRendererWidth() / 2);
    this.setDisplayY(getRendererHeight() / 2);
    this.setRotation(this.getRotation() + delta / 50);
  }
}
