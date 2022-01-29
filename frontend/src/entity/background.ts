import { Sprite } from "pixi.js";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";
import { Player } from "./player";

const MAP_WIDTH = 2000;
const MAP_HEIGHT = 2000;

export class Background extends Entity {
  backgroundSprites: Sprite[][] = [];
  textureWidth: number;
  textureHeight: number;
  trackedPlayer: Player;

  constructor(playState: PlayState) {
    super(playState);

    const texture = this.getSpriteTexture();
    const textureWidth = texture.width;
    const textureHeight = texture.height;

    this.textureWidth = textureWidth;
    this.textureHeight = textureHeight;

    for (let i = 0; i < MAP_HEIGHT / textureHeight + 1; i++) {
      this.backgroundSprites.push([]);
      for (let j = 0; j < MAP_WIDTH / textureWidth + 1; j++) {
        let sprite = new Sprite(texture);
        sprite.x = textureWidth * j;
        sprite.y = textureHeight * i;
        this.backgroundSprites[i].push(sprite);

        playState.app.stage.addChild(sprite);
      }
    }
  }

  lockToPlayer(player: Player) {
    this.trackedPlayer = player;
  }

  applyToAllSprites(func: (sprite: Sprite, i: number, j: number) => void) {
    for (let i = 0; i < this.backgroundSprites.length; i++) {
      for (let j = 0; j < this.backgroundSprites[i].length; j++) {
        func(this.backgroundSprites[i][j], i, j);
      }
    }
  }

  draw(delta: number) {
    this.applyToAllSprites((sprite, i, j) => {
      sprite.x = j * this.textureWidth - this.trackedPlayer.x;
      sprite.y = i * this.textureHeight - this.trackedPlayer.y;
    });
  }
  getSpriteName(): string {
    return "background";
  }
}
