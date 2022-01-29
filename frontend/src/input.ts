import { PlayState } from "./gameState/playState";

let keys = {};

window.addEventListener("keydown",keysDown);
window.addEventListener("keyup",keysUp);

function keysDown(e)
{
    keys[e.keyCode] = true;
}

function keysUp(e)
{
    keys[e.keyCode] = false;
}