import { getRendererHeight, getRendererWidth, SCALE } from "..";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

export class Player extends Entity {
  speed: number = 1;
  cooldown: number = 0;

  mouseX: number = 0;
  mouseY: number = 0;

  constructor(playState: PlayState) {
    super(playState);
    this.setOriginToCenter();
    this.setPos(getRendererWidth() / 2, getRendererHeight() / 2)
  }
  getSpriteName() {
    return "knight";
  }
  update(delta: number) {
    super.update(delta);
  }
  setMouse(x, y)
  {
    if(this.speed <= 1)
    {
      this.mouseX = x;
      this.mouseY = y;
      this.rotate(x, y);
    }
  }
  move()
  {
    let myX = this.getDisplayX()*SCALE;
    let myY = this.getDisplayY()*SCALE;

    let dist = Math.sqrt(Math.pow(myX - this.mouseX, 2) + Math.pow(myY - this.mouseY, 2));
    dist = dist < 1 ? 1 : dist; // Fixes division by zero

    this.setVx(((this.mouseX - myX) * this.speed) / dist);
    this.setVy(((this.mouseY - myY) * this.speed) / dist);
  }
  speedUp()
  {
      if(this.cooldown <= 0)
      {
        this.speed = this.speed + 5;
        this.cooldown = 5;
      }
  }
  speedManager(delta)
  {
    if(this.speed > 1)
    {
      this.speed = this.speed - (delta/20);
    }
    if(this.speed < 1)
    {
      this.speed = 1;
    }
    if(this.cooldown > 0)
    {
      this.cooldown = this.cooldown - delta/60;
    }
  }
  rotate(x, y) {
    this.setRotation(Math.atan2(y - SCALE*this.getDisplayY(), x - SCALE*this.getDisplayX()) + 3*Math.PI/2);
  }
  bounce() {

  } 
  draw(delta: number) {
    this.speedManager(delta);
  }
}