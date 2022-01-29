import { Application } from "pixi.js";

export abstract class GameState {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  abstract update(delta: number);
  abstract draw(delta: number);
}
