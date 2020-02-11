import * as PIXI from "pixi.js"
import {Cyclock} from "./cyclock"
import {toClockAngle} from "./clock_utils";

/**
 * Cyclock Element.
 * Drawing basic blocks.
 */
export abstract class Cloxel {
   public readonly name: String;
   public main_color: number;
   protected gfx: PIXI.Graphics;
   protected owner: Cyclock;

    constructor(owner: Cyclock, name: string, color: number) {
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

/**
 * Most basic cloxel. a ray that goes from center to edge.
 */
export class Ray extends Cloxel {
    public phase: number;
    public length_pct: number;

    constructor(owner: Cyclock, name: string, color: number, phase: number) {
        super(owner, name, color);
        this.phase = phase % owner.radix;
        this.length_pct = 1.0;
    }

    draw(delta): void {
        this.gfx.clear();
        this.gfx.lineStyle(3, this.main_color, 1);
        this.gfx.position.x = this.owner.x;
        this.gfx.position.y = this.owner.y;
        const phi = toClockAngle(this.phase, this.owner.radix);

        const x = this.owner.x * this.length_pct * Math.cos(phi);
        const y = this.owner.y * this.length_pct * Math.sin(phi);
        this.gfx.lineTo(x, y);
    }
}

/**
 * A circle with fill and edge
 */
export class CyCircle extends Cloxel {
    public radius: number;
    public edge_color: number;
    public can_draw_edge: boolean;
    public can_draw_fill: boolean;

    constructor(owner: Cyclock, name: string, color: number, radius: number) {
        super(owner, name, color);
        this.radius = radius;
        this.edge_color = 0xffffff;
        this.can_draw_edge = false;
        this.can_draw_fill = true;
    }

    draw(delta): void {
        this.gfx.clear();
        this.gfx.beginFill(this.main_color);
        this.gfx.drawCircle(0, 0, this.radius);
        this.gfx.endFill();
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }
}