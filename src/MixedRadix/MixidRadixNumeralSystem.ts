import {Radix} from "../MixedRadix/Radix";

export class MixedRadixNumeralSystem {
    public readonly name: string;
    private radixStack: Radix[];

    constructor(name: string) {
        this.name = name;
        this.radixStack = [];
    }

    to_digits(value: number): number[] {
        const len = this.radixStack.length;

        let digits = new Array<number>(len + 1);
        let remain = value;
        for(let i = len - 1; i >= 0; i--) {
            const cur_radix = this.radixStack[i];
            const mod = remain % cur_radix.value;
            remain = Math.floor(remain / cur_radix.value);
            digits[i] = mod;
        }
        return digits;
    }

    insert(radix: Radix) {
        this.radixStack.
    }
}