import {Clockface} from "../ui/clockface";
import {toClockAngle} from "../clock_utils";
import {Ray, VariableBinding} from "../cloxel_elements/ray";
import {VariableObserver, MixedRadixVariable} from "../MixedRadix/MixedRadixVariable";


/**
 * An extended Ray: has a start and end radius in radius percentage
 * A Ray that goes from center to edge.
 */
export class CyHand extends Ray {
    public phase: number;
    public lengthPct: number;
    public offsetPct: number;

    constructor(
        owner: Clockface,
        name: string,
        radix: number,
        lineColor: number,
        phase: number,
        lengthPct: number,
        offsetPct: number,
        ) {
        super(owner, name, radix, lineColor, phase);
        this.phase = phase % radix;
        this.lengthPct = lengthPct;
        this.offsetPct = offsetPct;
    }

    draw(delta): void {
        // determine line width
        const width = Math.max(1, this.owner.x / 100);
        // pre-calc
        const phi = toClockAngle(this.phase, this.radix);
        const x = this.owner.radius * Math.cos(phi);
        const y = this.owner.radius * Math.sin(phi);
        // compute end pos
        const end_x = x * this.lengthPct;
        const end_y = y * this.lengthPct;
        // compute start pos
        const start_x = x * this.offsetPct;
        const start_y = y * this.offsetPct;
        // render
        this.gfx.clear();
        this.gfx.lineStyle(width, this.lineColor, 1);
        this.gfx.position.x = this.owner.x;
        this.gfx.position.y = this.owner.y;
        this.gfx.moveTo(start_x, start_y);
        this.gfx.lineTo(end_x, end_y);
    }

    addBinding(variable: MixedRadixVariable, index: number, canFloat: boolean) {
        variable.registerObserver(this);
        let delegate = this.setPhase.bind(this);
        this.bindingList.push(new VariableBinding(variable.name, index, canFloat, delegate));
    }
}
