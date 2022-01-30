import { Application } from "pixi.js";
import { getRendererHeight, getRendererWidth } from "..";
import { Background } from "../entity/background";
import { Player } from "../entity/player";
import { RockPile } from "../entity/rockPile";
import { GameState } from "./gameState";
import {TotalGameState, PlayerState} from "../types";

type OtherPlayers = {
  [id: string]: Player;
}

export class PlayState extends GameState implements Updatable {
  player: Player;
  otherPlayers: OtherPlayers = {};
  background: Background;
  stateSet: boolean = false;

  constructor(app: Application) {
    super(app);

    this.background = new Background(this);

    this.player = new Player(this);
    this.player.setOriginToCenter();
    this.player.setPos(getRendererWidth() / 2, getRendererHeight() / 2);

    app.stage.addChild(this.player.sprite);

    this.background.lockToPlayer(this.player);
  }

  setState(state: TotalGameState) {
    state.entities.forEach(entity => {
      if (entity.type === "rock"){
        let rockPile = new RockPile(this);
        rockPile.setPos(entity.x, entity.y);
        this.addEntity(rockPile);
      }
    })

    Object.entries(state.players).reduce((object, [id, playerState]: [string, PlayerState]) => {
      this.addOtherPlayerFromState(id, playerState);
      return ({...object,
        [id]: playerState});
      }, {});

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
    console.log("colliding");
    if(entity.getSpriteName() == "rock_pile") {
      if(entity.speed == 0)
      {
        if(player.speed >= 2){
          entity.hit(player.getVx(), player.getVy(), player.speed * 2);
        }
        else{
          player.bounce();
        }
      }
    }
    if (entity.getSpriteName() == "knight") {
      //player.takedamage();
    }
  }

  handleCollisions() {
    this.entities.forEach((entity) => {
      if (this.isColliding(this.player, entity)) {
        this.onCollide(this.player, entity);
      }
    });
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

    Object.values(this.otherPlayers).forEach(player => {
      player.update(delta);
      player.setDisplayX(
        player.getX() - this.player.getX() + this.player.getDisplayX()
      );
      player.setDisplayY(
        player.getY() - this.player.getY() + this.player.getDisplayY()
      );
    });
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
  }

  addOtherPlayerFromState(id: string, playerState: PlayerState) {
    console.log("pstate", playerState);
    let otherPlayer = new Player(this);
    otherPlayer.setPos(playerState.x, playerState.y);
    this.addOtherPlayer(id, otherPlayer);
  }

  addOtherPlayer(id: string, player: Player) {
    this.otherPlayers[id] = player;
    this.app.stage.addChild(player.sprite);
  }
}
