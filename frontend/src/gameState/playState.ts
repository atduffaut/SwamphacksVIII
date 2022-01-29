import { Application } from "pixi.js";
import { SCALE } from "..";
import { Entity } from "../entity/entity";
import { Player } from "../entity/player";
import { RockPile } from "../entity/rockPile";
import { GameState } from "./gameState";

export class PlayState extends GameState implements Updatable {
  player: Player;
  entities: Entity[] = [];

  constructor(app: Application) {
    super(app);

    this.player = new Player(this);
    app.stage.addChild(this.player.sprite);

    for (let i = 0; i < 10; i++) {
      let rockPile = new RockPile(this);
      rockPile.sprite.x =
        (Math.random() * app.renderer.width) / SCALE - rockPile.sprite.width;
      rockPile.sprite.y = (Math.random() * app.renderer.height) / SCALE;
      this.entities.push(rockPile);
      app.stage.addChild(rockPile.sprite);
    }
  }

  update(delta: number) {}

  draw(delta: number) {
    this.player.draw(delta);
    this.entities.forEach((entity) => {
      entity.draw(delta);
    });
  }
}
