import { Application } from "pixi.js";
import { getRendererHeight, getRendererWidth } from "..";
import { Background } from "../entity/background";
import { Player } from "../entity/player";
import { RockPile } from "../entity/rockPile";
import { GameState } from "./gameState";

export class PlayState extends GameState implements Updatable {
  player: Player;
  background: Background;

  constructor(app: Application) {
    super(app);

    this.background = new Background(this);

    this.player = new Player(this);
    app.stage.addChild(this.player.sprite);

    this.background.lockToPlayer(this.player);

    for (let i = 0; i < 10; i++) {
      let rockPile = new RockPile(this);
      rockPile.setX(Math.random() * (getRendererWidth() - rockPile.getWidth()));
      rockPile.setY(
        Math.random() * (getRendererHeight() - rockPile.getHeight())
      );
      // rockPile.setVy(0.1);
      this.addEntity(rockPile);
    }
  }

  update(delta: number) {
    this.player.update(delta);
    this.entities.forEach((entity) => {
      entity.update(delta);
      entity.setDisplayX(entity.getX() - this.player.getX());
      entity.setDisplayY(entity.getY() + this.player.getY());
    });
  }

  draw(delta: number) {
    this.background.draw(delta);
    this.player.draw(delta);
    this.entities.forEach((entity) => {
      entity.draw(delta);
    });
  }
}
