import { Application } from "pixi.js";
import { Entity } from "../entity/entity";

export abstract class GameState {
  app: Application;
  entities: Entity[] = [];

  constructor(app: Application) {
    this.app = app;
  }

  abstract update(delta: number);
  abstract draw(delta: number);

  addEntity(entity: Entity) {
    this.entities.push(entity);
    this.app.stage.addChild(entity.sprite);
  }
}
