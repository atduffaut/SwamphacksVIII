import * as PIXI from "pixi.js";
import { addToApp, render } from "./game";

let app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);

addToApp(app);

app.ticker.add((delta: number) => {
  render(delta);
});

console.log("test");
