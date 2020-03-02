import {RadixModel} from "./RadixModel";
import {cyDecode, cyEncode, OverflowStrategyEnum} from "./codec";

export class MixedRadixNumeralSystem {
    public readonly name: string;
    public overflowStrategy: OverflowStrategyEnum;
    private radixStack: RadixModel[];
    private radices: number[];

    constructor(name: string, overflowStrategy?: OverflowStrategyEnum) {
        this.name = name;
        this.overflowStrategy = OverflowStrategyEnum.Discard;
        this.radixStack = [];
    }

    getRadices(): number[] {
        return this.radices;
    }

    getSize(): number {
        return this.radices.length;
    }

    toDigits(value: number): number[] {
        return cyDecode(this.radices, value);
    }

    toValue(digits: number[]): number {
        return cyEncode(this.radices, digits);
    }

    toDigitName(index: number, value: number): string {
        return this.radixStack[index].getName(value);
    }

    /**
     * digits length can be smaller than radix length.
     * We start with lowest value.
     * @param digits
     */
    toNames(digits: number[]): string[] {
        if(digits.length > this.radixStack.length) {
            throw new Error(`Invalid parameter: "More digits than radices`);
        }
        let names = [];
        let ri = this.radixStack.length - 1;
        for (let i = digits.length - 1; i >= 0; i--, ri--) {
            names.push(this.radixStack[ri].getName(digits[i]));
        }
        return names.reverse();
    }
    valueToNames(value: number): string[] {
        let digits = this.toDigits(value);
        return this.toNames(digits);
    }

    push(radix: RadixModel) {
        this.radixStack.push(radix);
        this._calcRadices();
    }

    _calcRadices() {
        this.radices = [];
        for (let oRadix of this.radixStack) {
            this.radices.push(oRadix.value);
        }
    }
}