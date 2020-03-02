import {MixedRadixNumeralSystem} from "./MixidRadixNumeralSystem";
import {RadixModel} from "./RadixModel";
import {OverflowStrategyEnum} from "./codec";

export const radixBinary = new RadixModel(2, "binary");
export const radixDecimal = new RadixModel(10, "decimal");
export const radix12 = new RadixModel(12, "halfday");
export const radix24 = new RadixModel(24, "day");
export const radix60 = new RadixModel(60, "sixty");
export const radix365 = new RadixModel(365, "year");
export const radix100 = new RadixModel(100, "cent");
export const radix1000 = new RadixModel(1000, "milli");

export const radixWeek = new RadixModel(7, "week",
    ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday']);


export function create_decimal_system(): MixedRadixNumeralSystem {
    let system = new MixedRadixNumeralSystem("decimal", OverflowStrategyEnum.Propagate);
    system.push(radixDecimal);
    return system;
}

export function create_time_system(): MixedRadixNumeralSystem {
    let system = new MixedRadixNumeralSystem("time", OverflowStrategyEnum.Infinity);
    system.push(radix24);
    system.push(radix60);
    system.push(radix60);
    system.push(radix1000);
    return system;
}