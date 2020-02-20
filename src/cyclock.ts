import * as PIXI from "pixi.js"
import { Cloxel } from "./cloxel"
import { CyclockUI } from "./cyclockUI"
import {CloxelType, createCloxel} from "./cloxel_type";
import {CyCircle} from "./cloxel_elements/circle";
import {MixedRadixNumeralSystem} from "./MixedRadix/MixidRadixNumeralSystem";
import {MixedRadixValue} from "./MixedRadix/MixedRadixValue";

/**
 * Or TimeCycle (as opposed to timeline)
 * Clock system for displaying values in a circular form
 */
export class Cyclock {
    // fields
    public readonly title: string;
    private ui: CyclockUI;
    private numeralSystem: MixedRadixNumeralSystem;
    private valueList: MixedRadixValue[];

    // static func
    static create(app: PIXI.Application, params: object): Cyclock {
        let cyclock = new Cyclock(app, params['radius_pct'], params['radix'], params['title']);
        return cyclock;
    }

    // methods
    constructor(app: PIXI.Application, radius_pct: number, radix: number, title: string) {
        this.title = title;
        this.ui = new CyclockUI(app, radius_pct, radix);
        this.numeralSystem = null;
        this.valueList = [];
    }

    setSystem(numeralSystem: MixedRadixNumeralSystem) {
        this.numeralSystem = numeralSystem;
    }

    addValue(mrValue: MixedRadixValue) {
        if(mrValue.numeralSystem == this.numeralSystem) {
            this.valueList.push(mrValue);
        } else {
            console.warn('Failed adding value: not in same numeral system as the clock');
        }
    }

} // end class Cyclock
