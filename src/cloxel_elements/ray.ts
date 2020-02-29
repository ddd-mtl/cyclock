import {Clockface} from "../ui/clockface";
import {toClockAngle} from "../clock_utils";
import {Cloxel} from "../cloxel";

export function ray_setPhase(ray: Ray, phase: number) {
    ray.setPhase(phase);
}

/**
 * Most basic cloxel:
 * A Ray that goes from center to edge.
 */
export class Ray extends Cloxel {
    public phase: number;
    public radix: number;

    //
    constructor(
        owner: Clockface,
        name: string,
        radix: number,
        color: number,
        phase: number,
        ) {
        super(owner, name, color);
        this.radix = radix;
        this.phase = phase % this.radix;
    }

    setPhase(phase: number) {
        this.phase = phase % this.radix;
    }

    draw(delta): void {
        // determine line width
        const width = Math.max(1, this.owner.x / 100);
        // render
        this.gfx.clear();
        this.gfx.lineStyle(width, this.main_color, 1);
        this.gfx.position.x = this.owner.x;
        this.gfx.position.y = this.owner.y;
        const phi = toClockAngle(this.phase, this.radix);

        const x = this.owner.radius * Math.cos(phi);
        const y = this.owner.radius * Math.sin(phi);
        this.gfx.lineTo(x, y);
    }
}
