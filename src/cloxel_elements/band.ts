import {Clockface} from "../ui/clockface";
import {Slice} from "../cloxel_elements/slice";
import {toClockAngle} from "../clock_utils";

/**
 * A slice of the main circle.
 * A thick arc
 */
export class Band extends Slice {
    public length_start: number;
    public length_end: number;

    constructor(owner: Clockface, name: string, radix: number, bg_color: number, color: number, phase: number, width: number, start: number, end: number) {
        super(owner, name, radix, bg_color, color, phase, 1.0, 0.0, width);
        this.length_start = start;
        this.length_end = end;
    }

    draw(delta): void {
        // compute triangle: b is first vertex.
        const phase_start = this.phase - this.half_width;
        const phase_end = this.phase + this.half_width;

        const phi_start = toClockAngle(phase_start, this.owner.radix);
        const phi_end = toClockAngle(phase_end, this.owner.radix);

        const start = this.length_start * this.owner.radius;
        const end = this.length_end * this.owner.radius;

        // render thick arc
        this.gfx.clear();
        this.gfx.lineStyle(end - start, this.main_color, 1);
        const arc_radius = start + ((end - start) / 2); // because line style outgrows radius
        this.gfx.arc(0, 0, arc_radius, phi_start, phi_end);
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }
}