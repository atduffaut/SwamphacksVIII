import { RENDERER_HEIGHT, RENDERER_WIDTH } from "..";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

export class Player extends Entity {
  constructor(playState: PlayState) {
    super(playState);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
  }
  getSpriteName() {
    return "knight";
  }
  update(delta: number) {}
  draw(delta: number) {
    this.sprite.x = RENDERER_WIDTH / 2;
    this.sprite.y = RENDERER_HEIGHT / 2;
    this.sprite.rotation += delta / 50;
  }
}
