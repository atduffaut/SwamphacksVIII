import { SCALE } from "..";
import { ASSET_PATHS } from "../assetManager";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

export class Player extends Entity {
  constructor(playState: PlayState) {
    super(playState);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
  }
  getSpritePath(): string {
    return ASSET_PATHS.knight;
  }
  update(delta: number) {}
  draw(delta: number) {
    this.sprite.x = this.gameState.app.renderer.width / 2 / SCALE;
    this.sprite.y = this.gameState.app.renderer.height / 2 / SCALE;
    this.sprite.rotation += delta / 50;
  }
}
