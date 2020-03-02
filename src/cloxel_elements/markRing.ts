import {Clockface} from "../ui/clockface";
import {Cloxel} from "../cloxel";
import {toClockAngle} from "../clock_utils";

/**
 * A circle with fill and edge
 */
export class MarkRing extends Cloxel {
    public style: PIXI.TextStyle;
    public radix: number;
    public indexes: number[];

    constructor(owner: Clockface, name: string, style: PIXI.TextStyle, radix: number, indexes?: number[]) {
        super(owner, name);
        this.style = style;
        this.radix = radix;
        if (indexes === undefined) {
            this.indexes = [];
            for (let i = 0; i < radix; i++) {
                this.indexes.push(i);
            }
        } else {
            this.indexes = Object.assign([], indexes);
        }
    }

    draw(delta): void {
        this.gfx.clear();
        this.gfx.lineStyle(this.style.strokeThickness, +this.style.stroke, 1);

        for (let index of this.indexes) {
            index = index % this.radix;
            const phi = toClockAngle(index, this.radix);
            const x = this.owner.radius * Math.cos(phi);
            const y = this.owner.radius * Math.sin(phi);
            this.gfx.moveTo(x, y);
            this.gfx.lineTo(x / 2, y / 2);
        }

        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }
}