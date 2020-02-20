import {MixedRadixNumeralSystem} from "./MixidRadixNumeralSystem";
import {Radix} from "../MixedRadix/Radix";
import {OverflowStrategyEnum} from "./codec";

export const radixBinary = new Radix(2, "binary");
export const radixDecimal = new Radix(10, "decimal");
export const radix12 = new Radix(12, "halfday");
export const radix24 = new Radix(24, "day");
export const radix60 = new Radix(60, "sixty");
export const radix365 = new Radix(365, "year");
export const radix100 = new Radix(100, "cent");
export const radix1000 = new Radix(1000, "milli");

export const radixWeek = new Radix(7, "week",
    ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday']);


export function create_decimal_system(): MixedRadixNumeralSystem {
    let system = new MixedRadixNumeralSystem("Decimal", OverflowStrategyEnum.Propagate);
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