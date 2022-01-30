import { getRendererHeight, getRendererWidth, SCALE } from "..";
import * as PIXI from "pixi.js";
import { TEXTURES } from "../assetManager";
import { PlayState } from "../gameState/playState";
import { Entity } from "./entity";

export class Player extends Entity {
  id: string;
  speed: number = 1;
  cooldown: number = 0;
  damageCooldown: number = 0;
  lives: number = 3;

  nameplate: PIXI.Text;

  mouseX: number = 0;
  mouseY: number = 0;

  constructor(playState: PlayState, name: string) {
    super(playState);

    this.nameplate = new PIXI.Text(name);

    this.nameplate.width = 40;
    this.nameplate.height = 20;

    this.sprite.addChild(this.nameplate);
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
  takeDamage()
  {
    //die
  }
  speedManager(delta)
  {
    if(this.speed > 1)
    {
      this.speed = this.speed - (delta);
    }
    if(this.speed < 1)
    {
      this.speed = 1;
    }
    if(this.cooldown > 0)
    {
      this.cooldown = this.cooldown - delta / 3;
    }
    if(this.damageCooldown>0)
    {
      this.damageCooldown -= delta / 3;
    }
    if(this.damageCooldown<=0){
      this.sprite.texture = TEXTURES["knight"];
    }
    
  }
  rotate(x, y) {
    this.setRotation(Math.atan2(y - SCALE*this.getDisplayY(), x - SCALE*this.getDisplayX()) + 3*Math.PI/2);
  }
  bounce() {

  }
  
  draw(delta: number) {
    this.speedManager(delta);
    this.nameplate.rotation = -1 * this.getRotation();

    this.nameplate.x = -60 * Math.sin(this.getRotation()) - 20 * Math.cos(this.getRotation()); 
    this.nameplate.y = -60 * Math.cos(this.getRotation()) + 20 * Math.sin(this.getRotation()); 

  }

  setId(id: string) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
}