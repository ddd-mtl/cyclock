import {RadixModel} from "./RadixModel";
import {MixedRadixNumeralSystem} from "./MixidRadixNumeralSystem";

export class MixedRadixValue {
    private value: number;
    private valueDigits: number[];
    private numeralSystem: MixedRadixNumeralSystem;

    constructor(value: number, numeralSystem: MixedRadixNumeralSystem) {
        this.numeralSystem = numeralSystem;
        this.setValue(value);
    }

    setValue(value: number) {
        this.value = value;
        this.valueDigits = this.numeralSystem.toDigits(value);
    }

    setDigits(digits: number[]) {
        this.value = this.numeralSystem.toValue(digits);
        this.valueDigits = digits;
    }

    setNumeralSystem(numeralSystem: MixedRadixNumeralSystem) {
        this.numeralSystem = numeralSystem;
        this.setValue(this.value);
    }

    getValue(): number {
        return this.value;
    }

    getDigits(): number[] {
        return this.valueDigits;
    }

    getNumeralSystem(): MixedRadixNumeralSystem {
        return this.numeralSystem;
    }
}