"use strict";
exports.__esModule = true;
var pixi_min_js_1 = require("./pixi.min.js");
var app = new pixi_min_js_1.PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);
console.log("hello world");
