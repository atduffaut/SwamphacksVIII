import { RENDERER_HEIGHT, RENDERER_WIDTH } from "..";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

export class Player extends Entity {
  constructor(playState: PlayState) {
    super(playState);
    this.setOriginToCenter();
  }
  getSpriteName() {
    return "knight";
  }
  update(delta: number) {
    super.update(delta);
  }
  draw(delta: number) {
    this.setDisplayX(RENDERER_WIDTH / 2);
    this.setDisplayY(RENDERER_HEIGHT / 2);
    this.setRotation(this.getRotation() + delta / 50);
  }
}
