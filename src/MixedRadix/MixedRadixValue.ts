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

    /**
     * Get percentage value at index in float by adding sub radices values recursively
     * @param index
     */
    private getPercentValue(index: number) {
        const radices =  this.numeralSystem.getRadices();
        let subValue = 0;
        if (index + 1 < radices.length) {
            subValue = this.getPercentValue(index + 1) /*/ radices[index + 1]*/;
        }
        let result = (this.valueDigits[index] + subValue) / radices[index];
        return result;
    }

    getValueFloat(index: number): number {
        if (index >= this.valueDigits.length) {
            throw new Error(`Invalid argument: "index >= this.valueDigits.length`);
        }
        return this.getPercentValue(index) * this.numeralSystem.getRadices()[index];
    }

    getDigits(): number[] {
        return this.valueDigits;
    }

    getNumeralSystem(): MixedRadixNumeralSystem {
        return this.numeralSystem;
    }
}