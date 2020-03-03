import {Clockface} from "../ui/clockface";
import {CySlice} from "./slice";
import {toClockAngle} from "../clock_utils";
import * as PIXI from "pixi.js";

/**
 * A slice of the main circle.
 * A thick arc
 */
export class Band extends CySlice {
    public length_start: number;
    public length_end: number;

    // -- methods -- //

    constructor(
        owner: Clockface,
        name: string,
        radix: number,
        fillColor: number,
        edgeColor: number,
        phase: number,
        width: number,
        canDrawEdge: boolean,
        canDrawFill: boolean,
        canDrawLabel: boolean,
        start: number,
        end: number,
        textStyle?: PIXI.TextStyle,
        ) {
        super(owner, name, radix, fillColor, edgeColor, phase, 1.0, 0.0, width, canDrawEdge, canDrawFill, canDrawLabel, textStyle);
        this.length_start = start;
        this.length_end = end;
    }

    draw(delta): void {
        // compute triangle: b is first vertex.
        const phase_start = this.phase - this.halfWidth;
        const phase_end = this.phase + this.halfWidth;

        const phi_start = toClockAngle(phase_start, this.radix);
        const phi_end = toClockAngle(phase_end, this.radix);

        const start = this.length_start * this.owner.radius;
        const end = this.length_end * this.owner.radius;

        // render thick arc
        this.gfx.clear();
        this.gfx.lineStyle(end - start, this.lineColor, 1);
        const arc_radius = start + ((end - start) / 2); // because line style outgrows radius
        this.gfx.arc(0, 0, arc_radius, phi_start, phi_end);
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }
}