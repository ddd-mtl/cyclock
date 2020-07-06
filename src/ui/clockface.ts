import * as PIXI from "pixi.js"
import { Cloxel } from "../cloxel"
import {CloxelType, createCloxel} from "../cloxel_type";
import {CyCircle} from "../cloxel_elements/circle";
import {MixedRadixVariable} from "../MixedRadix/MixedRadixVariable";
import {ClockModel} from "../clockModel";
import {ClockCanvas} from "./clockCanvas";
import {CyHand} from "../cloxel_elements/hand";
import {MarkRing} from "../cloxel_elements/markRing";
import {CySlice} from "../cloxel_elements/slice";

export enum ClockDisplayType {
    TOP_ONLY = 1,
    ALL_RADICES,
}

/**
 *
 */
export class Clockface {
    // -- fields -- //
    private canvas: ClockCanvas;
    public app: PIXI.Application;
    private displayType: ClockDisplayType;
    protected mainCircle: CyCircle;
    private cloxelMap: Map<String, Cloxel[]>;
    private model: ClockModel;
    public labelStyle: PIXI.TextStyle;
    //public readonly radix: number;
    public x: number;
    public y: number;
    public lineColor: number;
    public fillColor: number;
    public radiusPct: number;
    public radius: number;
    public canDrawRim: boolean;

    // static create(app: PIXI.Application, params: object): Clockface {
    //     let ui = new Clockface(app, model: ClockModel, params['radiusPct'], params['radix']);
    //     return ui;
    // }

    // getRadix(): number {
    //     return this.clock.getRadix();
    // }

    // -- methods -- //

    constructor(
        canvas: ClockCanvas,
        model: ClockModel,
        radiusPct: number,
        displayType: ClockDisplayType,
        lineColor: number,
        fillColor: number,
        canDrawRim: boolean) {
        const halfSize = canvas.canvasSize / 2;
        this.canvas = canvas;
        this.app = canvas.app;
        //this.radix = radix;
        // this.variableViewList = [];
        this.displayType = displayType;
        this.radius = halfSize * radiusPct ;
        this.radiusPct = radiusPct;
        this.lineColor = lineColor;
        this.fillColor = fillColor;
        this.cloxelMap = new Map();
        this.x = halfSize;
        this.y = halfSize;
        this.model = model;
        this.canDrawRim = canDrawRim;

        this.labelStyle = new PIXI.TextStyle();

        // Register self to parent canvas
        canvas.addClock(this);

        // Build starting clock display
        this.buildDisplay();
    }

    buildDisplay() {
        switch (this.displayType) {
            case ClockDisplayType.TOP_ONLY: {
                if(this.canDrawRim) {
                    this.mainCircle = new CyCircle(this, "rim", this.fillColor, this.lineColor, 1.0, 2, true, true);
                } else {
                    this.mainCircle = new CyCircle(this, "rim", this.fillColor, this.lineColor, 1.0, 2, false, false);

                }

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
        return this.cloxelMap.size;
    }

    addCloxel(cloxelDesc: object) {
        let el = createCloxel(this, cloxelDesc);
        this.insertCloxel(el);
    }

    getCloxel(name: string): Cloxel | undefined {
        let elementList = this.cloxelMap.get(name);
        if (elementList == undefined) {
            return undefined;
        }
        return elementList[0];
    }

    insertCloxel(el: Cloxel) {
        let elementList = this.cloxelMap.get(el.name);
        if (elementList === undefined) {
            elementList = [el];
        } else {
            elementList.push(el);
        }
        this.cloxelMap.set(el.name, elementList);
    }

    setLabelStyle(labelStyle: PIXI.TextStyle) {
        this.labelStyle = labelStyle;
    }

    addHand(variableName: string, radixIndex: number, canFloat: boolean,radiusPct: number) {
        // get variable
        let variable = this.model.getVariable(variableName);
        // get radix
        let radix = this.model.getRadix(radixIndex);
        // create hand
        const name = 'hand_' + variableName + '_' + radixIndex;
        const digit = variable.getValue().getDigits()[radixIndex];
        let hand = new CyHand(this, name, radix, /* this.lineColor*/ 0x111111, digit, radiusPct, 0);
        this.insertCloxel(hand);
        hand.addBinding(variable, radixIndex, canFloat);
    }

    addMarks(radixIndex: number, style: PIXI.TextStyle, indexes?: number[]) {
        let radix = this.model.getRadix(radixIndex);
        const name = "markRing_" + radixIndex;
        let markRing = new MarkRing(this, name, style, radix, indexes);
        this.insertCloxel(markRing);
    }

    addCircle(bg_color: number, line_color: number, radius_pct: number,
              line_width?: number,
              can_draw_edge?: boolean,
              can_draw_fill?: boolean,
              edge_alpha?: number,
              bg_alpha?: number,
              nameParam?: string): string {
        let name = nameParam != undefined? nameParam : "circle_" + this.elementCount();
        let circle = new CyCircle(this, name, bg_color, line_color, radius_pct, line_width, can_draw_edge, can_draw_fill, edge_alpha, bg_alpha);
        this.insertCloxel(circle);
        return name;
    }

    addSlice(radixIndex: number, phaseStart: number, phaseEnd: number, name: string, color: number, edgeColor?: number) {
        if (phaseStart >= phaseEnd) {
            throw new Error(`Invalid parameter: phaseStart >= phaseEnd`);
        }
        let radix = this.model.getRadix(radixIndex);
        const width = (phaseEnd - phaseStart) % radix;
        const phase = phaseStart + width / 2;
        if (edgeColor === undefined) {
            edgeColor = color;
        }
        let slice = new CySlice(
            this,
            name, // "slice_" + name,
            radix,
            color,
            edgeColor,
            phase,
            1.0,
            0.0,
            width,
            false,
            true,
            true,
            this.labelStyle,
            );
        this.insertCloxel(slice);
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
        this.radius = canvas_center * this.radiusPct;
        this.mainCircle.resize(size);
        for (let cloxelList of this.cloxelMap.values()) {
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
        this.mainCircle.draw(delta);
        for (let cloxelList of this.cloxelMap.values()) {
            for (let cloxel of cloxelList) {
                cloxel.draw(delta);
            }
        }
    }
} // end class Clockface
