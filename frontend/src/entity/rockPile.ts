import { Entity } from "./entity";

export class RockPile extends Entity {
  update(delta: number) {}
  draw(delta: number) {}
  getSpriteName() {
    return "rock_pile";
  }
}
