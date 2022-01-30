import { Application } from "pixi.js";
import * as PIXI from "pixi.js";
import { getRendererHeight, getRendererWidth } from "..";
import { Background } from "../entity/background";
import { Player } from "../entity/player";
import { RockPile } from "../entity/rockPile";
import { GameState } from "./gameState";
import { TotalGameState, PlayerState } from "../types";

type OtherPlayers = {
  [id: string]: Player;
};

export class PlayState extends GameState implements Updatable {
  player: Player;
  otherPlayers: OtherPlayers = {};
  background: Background;
  stateSet: boolean = false;
  cooldownBorder: PIXI.Graphics = new PIXI.Graphics();
  cooldownFilling: PIXI.Graphics = new PIXI.Graphics();


  constructor(app: Application) {
    super(app);

    this.background = new Background(this);

    this.player = new Player(this);
    this.player.setOriginToCenter();
    this.player.setPos(getRendererWidth() / 2, getRendererHeight() / 2);

    app.stage.addChild(this.player.sprite);

    this.background.lockToPlayer(this.player);

    this.cooldownBorder.lineStyle(2, 0x1020aa)
    this.cooldownBorder.drawRect(0, 0, 50, 10);
    this.cooldownBorder.x = (getRendererWidth() / 2) - 25;
    this.cooldownBorder.y = (getRendererHeight() / 2) - 40;

    this.cooldownFilling.beginFill(0x4455ff);
    this.cooldownFilling.drawRect(0, 0, 50 + 25, 10);
    this.cooldownFilling.x = (getRendererWidth() / 2 - 25);
    this.cooldownFilling.y = (getRendererHeight() / 2 - 40);
    this.app.stage.addChild(this.cooldownFilling);
    this.app.stage.addChild(this.cooldownBorder);
  }

  setState(state: TotalGameState) {
    state.entities.forEach((entity) => {
      if (entity.type === "rock") {
        let rockPile = new RockPile(this);
        rockPile.setPos(entity.x, entity.y);
        this.addEntity(rockPile);
      }
    });

    Object.entries(state.players).reduce(
      (object, [id, playerState]: [string, PlayerState]) => {
        this.addOtherPlayerFromState(id, playerState);
        return { ...object, [id]: playerState };
      },
      {}
    );

    this.stateSet = true;
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

  onCollide(player, entity) {
<<<<<<< HEAD
    if(entity.getSpriteName() == "rock_pile") {
      if(entity.speed == 0)
      {
        if(player.speed >= 2){
          entity.hit(player.getVx(), player.getVy(), player.speed * 2);
        }
        else if(entity.speed==0){
          player.bounce();
        }
        else
        {
          player.takeDamage();
        }
      }
    }
    if (entity.getSpriteName() == "knight") {
      console.log("player collision "+entity.speed+" "+player.speed);
      if(entity.speed>player.speed)
      {
        player.takeDamage();
      }
=======
    if (entity.getSpriteName() === "rock_pile") {
      if (entity.speed === 0 && player.speed <= 2) {
        player.bounce();
      } else if (entity.speed <= player.speed) {
        entity.hit(player.getVx(), player.getVy(), player.speed * 2);
      } else if (entity.speed > player.speed) {
        //player.takedamage();
      }
    }
    if (entity.getSpriteName() === "knight") {
      //player.takedamage();
>>>>>>> 433defa24b8a026f6f6e6fab99fed25d688aaae6
    }
  }

  handleCollisions() {
    this.entities.forEach((entity) => {
      if (this.isColliding(this.player, entity)) {
        this.onCollide(this.player, entity);
      }
    });
    for(let otherPlayer of Object.values(this.otherPlayers)){
      if(this.isColliding(this.player,otherPlayer)){
        this.onCollide(this.player,otherPlayer);
      }
    }
  }

  update(delta: number) {
    if (!this.stateSet) {
      return;
    }

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

    Object.values(this.otherPlayers).forEach((player) => {
      player.update(delta);
      player.setDisplayX(
        player.getX() - this.player.getX() + this.player.getDisplayX()
      );
      player.setDisplayY(
        player.getY() - this.player.getY() + this.player.getDisplayY()
      );
    });

  }

  drawPlayerCooldownBar()
  {
    this.cooldownFilling.width = 50 * (1 - (this.player.cooldown / 5));
    this.cooldownFilling.x = (getRendererWidth() / 2 - 25);
    this.cooldownFilling.y = (getRendererHeight() / 2 - 40);

    this.cooldownBorder.x = (getRendererWidth() / 2) - 25;
    this.cooldownBorder.y = (getRendererHeight() / 2) - 40;
  }

  draw(delta: number) {
    if (!this.stateSet) {
      return;
    }

    this.background.draw(delta);

    this.player.move();
    this.player.setDisplayX(getRendererWidth() / 2);
    this.player.setDisplayY(getRendererHeight() / 2);

    this.player.draw(delta);

    this.entities.forEach((entity) => {
      entity.draw(delta);
    });

    Object.values(this.otherPlayers).forEach((player) => {
      player.draw(delta);
    });

    this.drawPlayerCooldownBar();
  }

  addOtherPlayerFromState(id: string, playerState: PlayerState) {
    let otherPlayer = new Player(this);
    otherPlayer.setPos(playerState.x, playerState.y);
    this.addOtherPlayer(id, otherPlayer);
  }

  addOtherPlayer(id: string, player: Player) {
    this.otherPlayers[id] = player;
    this.app.stage.addChild(player.sprite);
  }
}
