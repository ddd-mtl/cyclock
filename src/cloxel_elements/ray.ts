import {Clockface} from "../ui/clockface";
import {toClockAngle} from "../clock_utils";
import {Cloxel} from "../cloxel";
import {MixedRadixVariable, VariableObserver} from "../MixedRadix/MixedRadixVariable";

/**
 *
 */
export class VariableBinding {
    public readonly name: string;
    public readonly index: number;
    public readonly fn: {(value: number): void};

    constructor(name: string, index: number, fn: {(value: number): void}) {
        this.name = name;
        this.index = index;
        this.fn = fn;
    }
}

/**
 * Most basic cloxel:
 * A Ray that goes from center to edge.
 */
export class Ray extends Cloxel implements VariableObserver {
    public phase: number;
    public radix: number;
    public main_color: number;
    protected bindingList: VariableBinding[];

    //
    constructor(
        owner: Clockface,
        name: string,
        radix: number,
        color: number,
        phase: number,
        ) {
        super(owner, name);
        this.radix = radix;
        this.phase = phase % this.radix;
        this.main_color = color;
        this.bindingList = [];
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

    onVariableUpdate(variable: MixedRadixVariable): void {
        for (let binding of this.bindingList) {
            if (binding.name == variable.name) {
                let digit = variable.getValue().getDigits()[binding.index];
                binding.fn(digit);
            }
        }
    }
}
