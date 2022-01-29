import { Application } from "pixi.js";
import { RENDERER_HEIGHT, RENDERER_WIDTH } from "..";
import { Player } from "../entity/player";
import { RockPile } from "../entity/rockPile";
import { GameState } from "./gameState";

export class PlayState extends GameState implements Updatable {
  player: Player;

  constructor(app: Application) {
    super(app);

    this.player = new Player(this);
    app.stage.addChild(this.player.sprite);

    for (let i = 0; i < 10; i++) {
      let rockPile = new RockPile(this);
      rockPile.setDisplayX(
        Math.random() * (RENDERER_WIDTH - rockPile.getWidth())
      );
      rockPile.setDisplayY(
        Math.random() * (RENDERER_HEIGHT - rockPile.getHeight())
      );
      rockPile.setVx(0.5);
      this.addEntity(rockPile);
    }
  }

  update(delta: number) {
    this.player.update(delta);
    this.entities.forEach((entity) => {
      entity.update(delta);
    });
  }

  draw(delta: number) {
    this.player.draw(delta);
    this.entities.forEach((entity) => {
      entity.draw(delta);
    });
  }
}
