import {Cyclock} from "../cyclock";
import {toClockAngle} from "../clock_utils";
import {Cloxel} from "../cloxel";

/**
 * Most basic cloxel:
 * A Ray that goes from center to edge.
 */
export class Ray extends Cloxel {
    public phase: number;
    constructor(owner: Cyclock, name: string, color: number, phase: number) {
        super(owner, name, color);
        this.phase = phase % owner.radix;
    }

    draw(delta): void {
        // determine line width
        const width = Math.max(1, this.owner.x / 100);
        // render
        this.gfx.clear();
        this.gfx.lineStyle(width, this.main_color, 1);
        this.gfx.position.x = this.owner.x;
        this.gfx.position.y = this.owner.y;
        const phi = toClockAngle(this.phase, this.owner.radix);

        const x = this.owner.radius * Math.cos(phi);
        const y = this.owner.radius * Math.sin(phi);
        this.gfx.lineTo(x, y);
    }
}
