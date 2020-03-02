import * as PIXI from "pixi.js"
import { Cloxel } from "../cloxel"
import {CloxelType, createCloxel} from "../cloxel_type";
import {CyCircle} from "../cloxel_elements/circle";
import {MixedRadixVariable} from "../MixedRadix/MixedRadixVariable";
import {ClockModel} from "../clockModel";
import {ClockCanvas} from "./clockCanvas";
import {CyHand} from "../cloxel_elements/hand";
import {MarkRing} from "../cloxel_elements/markRing";

export enum ClockDisplayType {
    TOP_ONLY = 1,
    ALL_RADICES,
}

/**
 *
 */
export class Clockface {
    // fields
    private canvas: ClockCanvas;
    public app: PIXI.Application;
    private displayType: ClockDisplayType;
    //public readonly radix: number;
    public x: number;
    public y: number;
    protected main_circle: CyCircle;
    private cloxel_map: Map<String, Cloxel[]>;
    public main_color: number;
    public bg_color: number;
    public radius_pct: number;
    public radius: number;
    private model: ClockModel;

    // static create(app: PIXI.Application, params: object): Clockface {
    //     let ui = new Clockface(app, model: ClockModel, params['radius_pct'], params['radix']);
    //     return ui;
    // }

    // getRadix(): number {
    //     return this.clock.getRadix();
    // }

    // -- methods -- //

    constructor(canvas: ClockCanvas, model: ClockModel, radius_pct: number, displayType: ClockDisplayType) {
        const halfSize = canvas.canvasSize / 2;
        this.canvas = canvas;
        this.app = canvas.app;
        //this.radix = radix;
        // this.variableViewList = [];
        this.displayType = displayType;
        this.radius = halfSize * radius_pct ;
        this.radius_pct = radius_pct;
        this.main_color = 0x111111;
        this.bg_color = 0xffffff;
        this.cloxel_map = new Map();
        this.x = halfSize;
        this.y = halfSize;
        this.model = model;

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
        this.insertCloxel(el);
    }

    insertCloxel(el: Cloxel) {
        let elementList = this.cloxel_map.get(el.name);
        if (elementList === undefined) {
            elementList = [el];
        } else {
            elementList.push(el);
        }
        this.cloxel_map.set(el.name, elementList);
    }

    addHand(variableName: string, radix_index: number, radius_pct) {
        // get variable
        let variable = this.model.getVariable(variableName);
        // get radix
        let radix = this.model.getRadix(radix_index);
        // create hand
        const name = 'hand_' + variableName + '_' + radix_index;
        const digit = variable.getValue().getDigits()[radix_index];
        let hand = new CyHand(this, name, radix, /* this.main_color*/ 0xff00ff, digit, radius_pct, 0);
        this.insertCloxel(hand);
        hand.addBinding(variable, radix_index);
    }

    addMarks(radix_index: number, style: PIXI.TextStyle, indexes?: number[]) {
        let radix = this.model.getRadix(radix_index);
        const name = "markRing_" + radix_index;
        let markRing = new MarkRing(this, name, style, radix, indexes);
        this.insertCloxel(markRing);
    }

    onUpdate() {
    // FIXME
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
        for (let cloxelList of this.cloxel_map.values()) {
            for (let cloxel of cloxelList) {
                cloxel.resize(size);
            }
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
        for (let cloxelList of this.cloxel_map.values()) {
            for (let cloxel of cloxelList) {
                cloxel.draw(delta);
            }
        }
    }
} // end class Clockface
