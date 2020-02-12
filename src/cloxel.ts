import * as PIXI from "pixi.js"
import {Cyclock} from "./cyclock"
import {toClockAngle} from "./clock_utils";


export enum CloxelType {
    Ray,
    Circle,
    Slice,
    Band,
    Text,
    Sprite
}

/**
 * Cyclock Element.
 * Drawing basic blocks.
 */
export abstract class Cloxel {
   public readonly name: String;
   public main_color: number;
   protected gfx: PIXI.Graphics;
   protected owner: Cyclock;

   static create(owner: Cyclock, el: CloxelType, params: object): Cloxel {
       const count_str = '_' + owner.element_count();
        switch (el) {
            case CloxelType.Ray: {
                const name = 'ray' + count_str;
                return new Ray(owner, name, owner.main_color, params["phase"]);
            }
            case CloxelType.Circle: {
                const name = 'circle' + count_str;
                return new CyCircle(owner, name, owner.main_color, owner.bg_color, params["radius_pct"]);
            }
            default:
                console.error('unknown enum variant');
                break;
        }
   }

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

        const x = this.owner.radius * this.length_pct * Math.cos(phi);
        const y = this.owner.radius * this.length_pct * Math.sin(phi);
        this.gfx.lineTo(x, y);
    }
}

/**
 * A circle with fill and edge
 */
export class CyCircle extends Cloxel {
    public radius_pct: number;
    public edge_color: number;
    public can_draw_edge: boolean;
    public can_draw_fill: boolean;

    constructor(owner: Cyclock, name: string, bg_color: number, color: number, radius_pct: number) {
        super(owner, name, bg_color);
        this.radius_pct = radius_pct;
        this.edge_color = color;
        this.can_draw_edge = true;
        this.can_draw_fill = true;
    }

    draw(delta): void {
        this.gfx.clear();
        if (this.can_draw_edge) {
            this.gfx.lineStyle(2, this.edge_color, 1);
        }
        this.gfx.beginFill(this.main_color);
        this.gfx.drawCircle(0, 0, this.radius_pct * this.owner.radius);
        this.gfx.endFill();
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }
}