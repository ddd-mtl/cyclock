import {Cyclock} from "../cyclock";
import {toClockAngle} from "../clock_utils";
import {Cloxel} from "../cloxel";

/**
 * Most basic cloxel:
 * A Ray that goes from center to edge.
 */
export class Ray extends Cloxel {
    public phase: number;
    public length_pct: number;

    constructor(owner: Cyclock, name: string, color: number, phase: number) {
        super(owner, name, color);
        this.phase = phase % owner.radix;
        this.length_pct = 1.0;
    }

    draw(delta): void {
        this.gfx.clear();
        this.gfx.lineStyle(3, this.main_color, 1);
        this.gfx.position.x = this.owner.x;
        this.gfx.position.y = this.owner.y;
        const phi = toClockAngle(this.phase, this.owner.radix);

        const x = this.owner.radius * this.length_pct * Math.cos(phi);
        const y = this.owner.radius * this.length_pct * Math.sin(phi);
        this.gfx.lineTo(x, y);
    }
}
