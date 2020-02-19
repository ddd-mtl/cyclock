import {Cyclock} from "../cyclock";
import {toClockAngle} from "../clock_utils";
import {Ray} from "../cloxel_elements/ray";

/**
 * An extended Ray: has a start and end radius in radius percentage
 * A Ray that goes from center to edge.
 */
export class CyHand extends Ray {
    public phase: number;
    public length_pct: number;
    public offset_pct: number;

    constructor(
        owner: Cyclock,
        name: string,
        color: number,
        phase: number,
        length_pct: number,
        offset_pct: number,
        ) {
        super(owner, name, color, phase);
        this.phase = phase % owner.radix;
        this.length_pct = length_pct;
        this.offset_pct = offset_pct;
    }

    draw(delta): void {
        // determine line width
        const width = Math.max(1, this.owner.x / 100);
        // pre-calc
        const phi = toClockAngle(this.phase, this.owner.radix);
        const x = this.owner.radius * Math.cos(phi);
        const y = this.owner.radius * Math.sin(phi);
        // compute end pos
        const end_x = x * this.length_pct;
        const end_y = y * this.length_pct;
        // compute start pos
        const start_x = x * this.offset_pct;
        const start_y = y * this.offset_pct;
        // render
        this.gfx.clear();
        this.gfx.lineStyle(width, this.main_color, 1);
        this.gfx.position.x = this.owner.x;
        this.gfx.position.y = this.owner.y;
        this.gfx.moveTo(start_x, start_y);
        this.gfx.lineTo(end_x, end_y);
    }
}