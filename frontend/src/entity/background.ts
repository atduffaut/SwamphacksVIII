import { Sprite } from "pixi.js";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

const MAP_WIDTH = 2000;
const MAP_HEIGHT = 2000;

export class Background extends Entity {
  backgroundSprites: Sprite[][] = [];

  constructor(playState: PlayState) {
    super(playState);

    const texture = this.getSpriteTexture();
    const textureWidth = texture.width;
    const textureHeight = texture.height;

    console.log(textureWidth);

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

  applyToAllSprites(func) {
    for (let i = 0; i < this.backgroundSprites.length; i++) {
      for (let j = 0; j < this.backgroundSprites[i].length; j++) {
        func(this.backgroundSprites[i][j]);
      }
    }
  }

  draw(delta: number) {
    // this.applyToAllSprites((sprite: Sprite) => sprite.draw(delta));
  }
  getSpriteName(): string {
    return "background";
  }
}
