import * as PIXI from "pixi.js"
import { Cloxel } from "../cloxel"
import {CloxelType, createCloxel} from "../cloxel_type";
import {CyCircle} from "../cloxel_elements/circle";
import {MixedRadixVariable} from "../MixedRadix/MixedRadixVariable";
import {Cyclock} from "../cyclock";

/**
 *
 */
export class CyclockUI {
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
    //protected clock: Cyclock;

    static create(app: PIXI.Application, params: object): CyclockUI {
        let ui = new CyclockUI(app, params['radius_pct'], params['radix']);
        return ui;
    }

    // getRadix(): number {
    //     return this.clock.getRadix();
    // }

    // methods
    constructor(app: PIXI.Application, radius_pct: number, radix: number) {
        this.app = app;
        //this.radix = radix;
        this.radius = 0;
        this.variableViewList = [];
        this.radius_pct = radius_pct;
        this.main_color = 0x111111;
        this.bg_color = 0xffffff;
        this.cloxel_map = new Map();
        this.main_circle = new CyCircle(this, "main_circle", this.bg_color,this.main_color, 1.0);

    }

    addVariable(variable: MixedRadixVariable) {
        this.variableViewList.push(new VariableView(variable));
    }

    elementCount(): number {
        return this.cloxel_map.size;
    }

    add(cloxelDesc: object) {
        let el = createCloxel(this, cloxelDesc);
        this.cloxel_map.set(el.name, el);
    }

    insert(el: Cloxel) {
        this.cloxel_map.set(el.name, el);
    }

    // Called on window resize
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
} // end class CyclockUI
