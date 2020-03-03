import {Clockface} from "../ui/clockface";
import {CyHand} from "../cloxel_elements/hand";
import {toClockAngle} from "../clock_utils";
import * as PIXI from "pixi.js";
import {CyText} from "./text";

/**
 * A slice of the main circle.
 * A half-circle (arc) than a triangle.
 */
export class CySlice extends CyHand {
    public halfWidth: number;
    public fillColor: number;
    public canDrawEdge: boolean;
    public canDrawFill: boolean;
    public canDrawLabel: boolean;
    protected label: CyText;

    // -- methods -- //

    constructor(
        owner: Clockface,
        name: string,
        radix: number,
        fillColor: number,
        edgeColor: number,
        phase: number,
        lengthPct: number,
        offsetPct: number,
        width: number,
        canDrawEdge: boolean,
        canDrawFill: boolean,
        canDrawLabel: boolean,
        textStyle?: PIXI.TextStyle,
        ) {
        super(owner, name, radix, edgeColor, phase, lengthPct, offsetPct);
        this.halfWidth = width / 2;
        this.fillColor = fillColor;
        this.canDrawEdge = canDrawEdge;
        this.canDrawFill = canDrawFill;
        this.canDrawLabel = canDrawLabel;
        // Place text in the middle
        const distance = offsetPct + lengthPct * 0.75;
        const textPhase = phase;// + this.halfWidth;
        this.label = new CyText(owner, name + '_label', radix, edgeColor,
            textPhase, distance, name, false, textStyle);
    }

    /**
     *
     */
    draw(delta): void {
        // compute triangle: b is first vertex.
        const phase_start = this.phase - this.halfWidth;
        const phase_end = this.phase + this.halfWidth;

        const phi_start = toClockAngle(phase_start, this.radix);
        const phi_end = toClockAngle(phase_end, this.radix);

        const b_x = this.owner.radius * Math.cos(phi_start);
        const b_y = this.owner.radius * Math.sin(phi_start);

        // render half-circle
        this.gfx.clear();
        if (this.canDrawEdge) {
            this.gfx.lineStyle(2, this.lineColor, 1);
        }
        if (this.canDrawFill) {
            this.gfx.beginFill(this.lineColor);
        }
        this.gfx.moveTo(0, 0);
        this.gfx.lineTo(b_x, b_y);
        this.gfx.arc(0, 0, this.owner.radius, phi_start, phi_end);
        this.gfx.lineTo(0, 0);
        if (this.canDrawFill) {
            this.gfx.endFill();
        }
        this.gfx.position.x = this.owner.x;
        this.gfx.position.y = this.owner.y;

        if (this.canDrawLabel) {
            this.label.draw(delta);
        }
    }
}