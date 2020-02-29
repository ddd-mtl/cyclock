import {Clockface} from "../ui/clockface";
import {toClockAngle} from "../clock_utils";
import {Ray, ray_setPhase} from "../cloxel_elements/ray";
import {VariableObserver, MixedRadixVariable} from "../MixedRadix/MixedRadixVariable";

class Binding {
    public readonly name: string;
    public readonly index: number;
    public readonly fn: {(ray: Ray, value: number): void};

    constructor(name: string, index: number, fn: {(ray: Ray, value: number): void}) {
        this.name = name;
        this.index = index;
        this.fn = fn;
    }
}

/**
 * An extended Ray: has a start and end radius in radius percentage
 * A Ray that goes from center to edge.
 */
export class CyHand extends Ray implements VariableObserver {
    public phase: number;
    public length_pct: number;
    public offset_pct: number;
    protected bindingList: Binding[];

    constructor(
        owner: Clockface,
        name: string,
        radix: number,
        color: number,
        phase: number,
        length_pct: number,
        offset_pct: number,
        ) {
        super(owner, name, radix, color, phase);
        this.phase = phase % radix;
        this.length_pct = length_pct;
        this.offset_pct = offset_pct;
        this.bindingList = [];
    }

    draw(delta): void {
        // determine line width
        const width = Math.max(1, this.owner.x / 100);
        // pre-calc
        const phi = toClockAngle(this.phase, this.radix);
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

    onVariableUpdate(variable: MixedRadixVariable): void {
        for (let binding of this.bindingList) {
            if (binding.name == variable.name) {
                let digit = variable.getValue().getDigits()[binding.index];
                binding.fn(this, digit);
            }
        }
    }

    addBinding(variable: MixedRadixVariable, index: number) {
        variable.registerObserver(this);
        this.bindingList.push(new Binding(variable.name, index, ray_setPhase));

    }
}
