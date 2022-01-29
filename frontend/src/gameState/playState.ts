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

    for (let i = 0; i < 100; i++) {
      let rockPile = new RockPile(this);
      rockPile.setX(
        Math.random() * (this.background.getWidth() * 5 - rockPile.getWidth())
      );
      rockPile.setY(
        Math.random() * (this.background.getHeight() * 5 - rockPile.getHeight())
      );
      // rockPile.setVy(0.1);
      this.addEntity(rockPile);
    }

    for (let i = 0; i < 100; i++) {
      let otherPlayer = new Player(this);
      otherPlayer.setX(
        Math.random() *
          (this.background.getWidth() * 5 - otherPlayer.getWidth())
      );
      otherPlayer.setY(
        Math.random() *
          (this.background.getHeight() * 5 - otherPlayer.getHeight())
      );
      // rockPile.setVy(0.1);
      this.addEntity(otherPlayer);
    }
  }

  isColliding(player, entity) {
    let radiusPlayer = player.getWidth() / 2;
    let radiusEntity = entity.getWidth() / 2;
    let centerDistance = Math.sqrt(
      Math.pow(player.getX() - entity.getX(), 2) +
        Math.pow(player.getY() - entity.getY(), 2)
    );

    return centerDistance <= radiusEntity + radiusPlayer;
  }

  onCollide(player, entitiy) {}

  handleCollisions() {
    this.entities.forEach((entity) => {
      if (this.isColliding(this.player, entity)) {
        this.onCollide(this.player, entity);
      }
    });
  }

  update(delta: number) {
    this.player.update(delta);

    this.player.setX(Math.max(this.player.getX(), 0));
    this.player.setX(
      Math.min(this.player.getX(), 5 * this.background.getWidth())
    );
    this.player.setY(Math.max(this.player.getY(), 0));
    this.player.setY(
      Math.min(this.player.getY(), 5 * this.background.getHeight())
    );

    this.handleCollisions();

    this.entities.forEach((entity) => {
      entity.update(delta);
      entity.setDisplayX(
        entity.getX() - this.player.getX() + this.player.getDisplayX()
      );
      entity.setDisplayY(
        entity.getY() - this.player.getY() + this.player.getDisplayY()
      );
    });
  }

  draw(delta: number) {
    this.background.draw(delta);

    this.player.move();
    this.player.setDisplayX(getRendererWidth() / 2);
    this.player.setDisplayY(getRendererHeight() / 2);

    this.player.draw(delta);

    this.entities.forEach((entity) => {
      entity.draw(delta);
    });
  }
}
