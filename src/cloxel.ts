import * as PIXI from "pixi.js"
import {Clockface} from "./ui/clockface";


/**
 * ClockModel Element.
 * Drawing basic blocks.
 */
export abstract class Cloxel {
   public readonly name: String;
   protected gfx: PIXI.Graphics;
   protected owner: Clockface;

    constructor(owner: Clockface, name: string) {
        this.owner = owner;
        this.name = name;
        this.gfx = new PIXI.Graphics();
        this.owner.app.stage.addChild(this.gfx);
    }

    init() {
        // n/a
   }

   setFilters(filters) {
       this.gfx.filters = filters;

   }
    abstract draw(delta): void;

    resize(size: number): void {
        this.draw(0);
    }
}

