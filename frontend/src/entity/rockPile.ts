import { Entity } from "./entity";

export class RockPile extends Entity {
  draw(delta: number) {}
  getSpriteName() {
    return "rock_pile";
  }
}
