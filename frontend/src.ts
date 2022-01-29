import {PIXI} from "./pixi.min.js"; 
import {addToApp, render} from "./game";

let app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);
console.log("hello world");

// let sprite = PIXI.Sprite.from('sample.jpg');
// app.stage.addChild(sprite);
addToApp(app);

// let elapsed = 0;
app.ticker.add((delta: number) => {
    render(delta);
    // elapsed += delta;
    // sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});