import {Radix} from "../MixedRadix/Radix";
import {MixedRadixNumeralSystem} from "./MixidRadixNumeralSystem";

export class MixedRadixValue {
    public value: number;
    public valueDigits: number[];
    public isTimeBound: boolean;
    public numeralSystem: MixedRadixNumeralSystem;

    constructor(value: number, numeralSystem: MixedRadixNumeralSystem) {
        this.value = value;
        this.valueDigits = numeralSystem.toDigits(value);
        this.isTimeBound = false;
        this.numeralSystem = numeralSystem;
    }
}