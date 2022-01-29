import { add } from "./two";
import {PIXI} from "./pixi.min.js";

let app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);
console.log("hello world");