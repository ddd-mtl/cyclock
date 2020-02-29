import * as PIXI from "pixi.js"
import { Cloxel } from "../cloxel"
import {CloxelType, createCloxel} from "../cloxel_type";
import {CyCircle} from "../cloxel_elements/circle";
import {MixedRadixVariable} from "../MixedRadix/MixedRadixVariable";
import {ClockModel} from "../clockModel";
import {ClockCanvas} from "./clockCanvas";
import {CyHand} from "../cloxel_elements/hand";

export enum ClockDisplayType {
    TOP_ONLY = 1,
    ALL_RADICES,
}

/**
 *
 */
export class Clockface {
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
    private displayType: ClockDisplayType;
    private model: ClockModel;
    private canvas: ClockCanvas;

    // static create(app: PIXI.Application, params: object): Clockface {
    //     let ui = new Clockface(app, model: ClockModel, params['radius_pct'], params['radix']);
    //     return ui;
    // }

    // getRadix(): number {
    //     return this.clock.getRadix();
    // }

    // -- methods -- //

    constructor(canvas: ClockCanvas, model: ClockModel, radius_pct: number, displayType: ClockDisplayType) {
        this.canvas = canvas;
        this.app = canvas.app;
        //this.radix = radix;
        // this.variableViewList = [];
        this.displayType = displayType;
        this.radius = 0;
        this.radius_pct = radius_pct;
        this.main_color = 0x111111;
        this.bg_color = 0xffffff;
        this.cloxel_map = new Map();

        // Register self to parent canvas
        canvas.addClock(this);

        // Build starting clock display
        this.buildDisplay();
    }

    buildDisplay() {
        switch (this.displayType) {
            case ClockDisplayType.TOP_ONLY: {
                this.main_circle = new CyCircle(this, "main_circle", this.bg_color, this.main_color, 1.0);
                return;
            }
            case ClockDisplayType.ALL_RADICES: {
                // FIXME
                return;
            }
        }
    }

    // addVariable(variable: MixedRadixVariable) {
    //     this.variableViewList.push(new VariableView(variable));
    // }

    elementCount(): number {
        return this.cloxel_map.size;
    }

    addCloxel(cloxelDesc: object) {
        let el = createCloxel(this, cloxelDesc);
        this.cloxel_map.set(el.name, el);
    }

    insertCloxel(el: Cloxel) {
        this.cloxel_map.set(el.name, el);
    }

    addHand(variableName: string, radix_index: number, radius_pct) {
        // get variable
        let variable = this.model.getVariable(variableName);
        // get radix
        let radix = this.model.getRadix(radix_index);
        // create hand
        const name = 'hand_' + variableName + '_' + radix_index;
        let hand = new CyHand(this, name, radix, /* this.main_color*/ 0xff00ff, variable.getValue().getDigits()[radix_index], radius_pct, 0);
        this.insertCloxel(hand);
    }

    /**
     * Called on window resize
     */
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

    /**
     * Called each frame
     * @param delta
     */
    update(delta): void {
        this.draw(delta);
    }

    /**
     * Called each frame
     * @param delta
     */
    private draw(delta) {
        this.main_circle.draw(delta);
        for (let cloxel of this.cloxel_map.values()) {
            cloxel.draw(delta);
        }
    }
} // end class Clockface
