import {Radix} from "../MixedRadix/Radix";
import {MixedRadixNumeralSystem} from "./MixidRadixNumeralSystem";

export class MixedRadixValue {
    public value: number;
    public value_digits: number[];
    public is_time_bound: boolean;
    public numeral_system: MixedRadixNumeralSystem;

    constructor(value: number) {
        this.name = name;
        this.radixStack = [];
    }
}