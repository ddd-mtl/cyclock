import * as PIXI from "pixi.js"
import { Cloxel } from "./cloxel"
import { Clockface } from "./ui/clockface"
import {CloxelType, createCloxel} from "./cloxel_type";
import {CyCircle} from "./cloxel_elements/circle";
import {MixedRadixNumeralSystem} from "./MixedRadix/MixidRadixNumeralSystem";
import {MixedRadixValue} from "./MixedRadix/MixedRadixValue";
import {VariableObserver, MixedRadixVariable} from "./MixedRadix/MixedRadixVariable";

/**
 * Class holding the data model for a Cyclock
 */
export class ClockModel {
    // fields
    public readonly title: string;
    private numeralSystem: MixedRadixNumeralSystem;
    private variableMap: Map<string, MixedRadixVariable>;

    // methods
    constructor(title: string, numeralSystem: MixedRadixNumeralSystem) {
        this.title = title;
        this.numeralSystem = numeralSystem;
        this.variableMap = new Map();
    }

    // setSystem(numeralSystem: MixedRadixNumeralSystem) {
    //     this.numeralSystem = numeralSystem;
    // }

    getTopRadix(): number {
        return this.numeralSystem.getRadices()[0];
    }

    getRadix(index: number): number {
        const radices = this.numeralSystem.getRadices();
        if (index >= radices.length) {
            throw new Error(`Invalid argument: "radix index cannot be >= radices length`);
        }
        return radices[index];
    }

    getVariable(name: string): MixedRadixVariable {
        if (!this.variableMap.has(name)) {
            throw new Error(`Invalid argument: "ClockModel does not have variable with that name`);
        }
        let res = this.variableMap.get(name);
        return res;
    }

    addVariable(variable: MixedRadixVariable) {
        if(variable.getNumeralSystem() != this.numeralSystem) {
            console.warn('Failed adding variable: not in same numeral system as the clock');
            return;
        }
        this.variableMap.set(variable.name, variable);
    }

} // end class ClockModel


