import { ASSET_PATHS } from "../assetManager";
import { Entity } from "./entity";

export class RockPile extends Entity {
  update(delta: number) {}
  draw(delta: number) {}
  getSpritePath(): string {
    return ASSET_PATHS.rock_pile;
  }
}
