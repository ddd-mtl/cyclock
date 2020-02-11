import * as PIXI from "pixi.js"
import { CyCircle, Cloxel } from "./cloxel"

/**
 * Or TimeCycle (as opposed to timeline)
 * Clock display of time/calendar in a circular form
 */
export class Cyclock {
    // fields
    public readonly radix: number;
    public app: PIXI.Application;
    protected main_circle: CyCircle;
    public x: number;
    public y: number;
    private cloxel_map: Map<String, Cloxel>;

    // methods
    constructor(app: PIXI.Application, radius_pct: number, radix: number) {
        this.app = app;
        this.radix = radix;
        this.cloxel_map = new Map();
        this.main_circle = new CyCircle(this, "main_circle", 0x00aaff,0);

    }

    add(el: Cloxel) {
        this.cloxel_map.set(el.name, el);
    }

    resize(size: number) {
        const canvas_center = size / 2;
        this.x = canvas_center;
        this.y = canvas_center;
        this.main_circle.resize(size);
        for (let cloxel of this.cloxel_map.values()) {
            cloxel.resize(size);
        }
    }

    // Called each frame
    update(delta): void {
        this.draw(delta);
    }

    // Called each frame
    private draw(delta) {
        this.main_circle.radius = this.x;
        this.main_circle.draw(delta);
        for (let cloxel of this.cloxel_map.values()) {
            cloxel.draw(delta);
        }
    }
} // end class Cyclock
