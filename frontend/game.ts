import {PIXI} from "./pixi.min.js"; 

let sprite = PIXI.Sprite.from('sample.jpg');

export const addToApp = (app: PIXI.Application): void => {
    app.stage.addChild(sprite);
    console.log("Added")
}

let elapsed = 0.0;
export const render = (delta: number): void => {
    elapsed += delta;
    sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
}