import { getRendererHeight, getRendererWidth } from "..";
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
    this.vx = 1;
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
    }
  }
  move()
  {
    let myX = this.getDisplayX()*3;
    let myY = this.getDisplayY()*3;

    let dist = Math.sqrt(Math.pow(myX - this.mouseX, 2) + Math.pow(myY - this.mouseY, 2));

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
    this.setRotation(Math.atan2(y - 3*this.getDisplayY(), x - 3*this.getDisplayX()) + 3*Math.PI/2);
  }   
  draw(delta: number) {
    this.setDisplayX(getRendererWidth() / 2);
    this.setDisplayY(getRendererHeight() / 2);
<<<<<<< HEAD
    this.setRotation(this.getRotation() + delta / 50);

    this.move();

    this.speedManager(delta);
=======
    this.setRotation(this.getRotation());
>>>>>>> 2705248610a3f2f13a6e429c7e0ec0b5788c8d8a
  }
}