import * as PIXI from "pixi.js"
import {ClockModel} from "./clockModel"
import {Ray} from "./cloxel_elements/ray";
import {CyCircle} from "./cloxel_elements/circle";
import {Clockface} from "./ui/clockface";


/**
 * ClockModel Element.
 * Drawing basic blocks.
 */
export abstract class Cloxel {
   public readonly name: String;
   public main_color: number;
   protected gfx: PIXI.Graphics;
   protected owner: Clockface;

    constructor(owner: Clockface, name: string, color: number) {
        this.owner = owner;
        this.name = name;
        this.main_color = color;
        this.gfx = new PIXI.Graphics();
        this.owner.app.stage.addChild(this.gfx);
    }

    init() {
        // n/a
   }

    abstract draw(delta): void;

    resize(size: number): void {
        this.draw(0);
    }
}

