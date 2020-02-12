import * as PIXI from "pixi.js"
import { CyCircle, Cloxel, CloxelType } from "./cloxel"

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
    public main_color: number;
    public bg_color: number;
    public radius_pct: number;
    public radius: number;

    static create(app, params: object): Cyclock {
       let cyclock = new Cyclock(app, params['radius_pct'], params['radix']);
       return cyclock;
    }

    // methods
    constructor(app: PIXI.Application, radius_pct: number, radix: number) {
        this.app = app;
        this.radix = radix;
        this.radius = 0;
        this.radius_pct = radius_pct;
        this.main_color = 0x111111;
        this.bg_color = 0xffffff;
        this.cloxel_map = new Map();
        this.main_circle = new CyCircle(this, "main_circle", this.bg_color,this.main_color, 1.0);

    }

    element_count(): number {
        return this.cloxel_map.size;
    }

    add(e: CloxelType, params: object) {
        let el = Cloxel.create(this, e, params);
        this.cloxel_map.set(el.name, el);
    }

    insert(el: Cloxel) {
        this.cloxel_map.set(el.name, el);
    }

    resize(size: number) {
        const canvas_center = size / 2;
        this.x = canvas_center;
        this.y = canvas_center;
        this.radius = canvas_center * this.radius_pct;
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
        this.main_circle.draw(delta);
        for (let cloxel of this.cloxel_map.values()) {
            cloxel.draw(delta);
        }
    }
} // end class Cyclock
