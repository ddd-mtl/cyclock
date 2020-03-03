import {Clockface} from "../ui/clockface";
import {toClockAngle} from "../clock_utils";
import {Cloxel} from "../cloxel";
import {MixedRadixVariable, VariableObserver} from "../MixedRadix/MixedRadixVariable";

/**
 * Class holding all info needed for a data binding
 */
export class VariableBinding {
    public readonly name: string; // name of the variable to bind to
    public readonly index: number; // index of the radix to use
    public readonly canAsFloat: boolean; // True if variable value must be in float form
    public readonly fn: {(value: number): void}; // Function to call when variable is updated

    constructor(name: string, index: number, canFloat: boolean, fn: {(value: number): void}) {
        this.name = name;
        this.index = index;
        this.fn = fn;
        this.canAsFloat = canFloat;
    }
}

/**
 * Most basic cloxel:
 * A Ray that goes from center to edge.
 */
export class Ray extends Cloxel implements VariableObserver {
    public phase: number;
    public radix: number;
    public lineColor: number;
    protected bindingList: VariableBinding[];

    //
    constructor(
        owner: Clockface,
        name: string,
        radix: number,
        lineColor: number,
        phase: number,
        ) {
        super(owner, name);
        this.radix = radix;
        this.phase = phase % this.radix;
        this.lineColor = lineColor;
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
        this.gfx.lineStyle(width, this.lineColor, 1);
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
                let digit;
                if (binding.canAsFloat) {
                    digit = variable.getValueFloat(binding.index);
                } else {
                    digit = variable.getValue().getDigits()[binding.index];
                }
                binding.fn(digit);
            }
        }
    }
}
