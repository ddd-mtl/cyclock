import {Clockface} from "../ui/clockface";
import {Cloxel} from "../cloxel";
import {toClockAngle} from "../clock_utils";
import {CyText} from "./text";

/**
 * A circle with fill and edge
 */
export class MarkRing extends Cloxel {
    public style: PIXI.TextStyle;
    public radix: number;
    public indexes: number[];
    protected names: CyText[];

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

        // Create sub CyText for each index
        const distance = 1 - (this.style.lineHeight + 0.05);
        this.names = [];
        if (this.style.fontSize > 0) {
            let textStyle = Object.assign({}, style);
            textStyle.strokeThickness = 1;
            textStyle.lineHeight = 1; // FIXME
            for (let index of this.indexes) {
                let text = new CyText(owner, name + '_' + index, radix, +this.style.stroke, index, distance, '' + index, false, textStyle);
                this.names.push(text);
            }
        }
    }

    draw(delta): void {
        this.gfx.clear();
        this.gfx.lineStyle(this.style.strokeThickness, +this.style.stroke, 1);

        const lengthPct = 1 - this.style.lineHeight;
        for (let index of this.indexes) {
            index = index % this.radix;
            // Draw mark lines
            const phi = toClockAngle(index, this.radix);
            const x = this.owner.radius * Math.cos(phi);
            const y = this.owner.radius * Math.sin(phi);
            this.gfx.moveTo(x, y);
            this.gfx.lineTo(x * lengthPct, y * lengthPct);
        }
        //
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;

        for (let text of this.names) {
            text.draw(delta);
        }
    }
}