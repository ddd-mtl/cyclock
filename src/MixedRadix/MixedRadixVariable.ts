import {Radix} from "../MixedRadix/Radix";
import {MixedRadixNumeralSystem} from "./MixidRadixNumeralSystem";
import {MixedRadixValue} from "./MixedRadixValue";

export interface VariableObserver {
    onVariableUpdate(value: MixedRadixValue): void;
}

export class MixedRadixVariable {
    private value: MixedRadixValue;
    public isTimeBound: boolean;
    private observerList: VariableObserver[];

    constructor(value: number, numeralSystem: MixedRadixNumeralSystem) {
        this.value = new MixedRadixValue(value, numeralSystem);
        this.isTimeBound = false;
        this.observerList = [];
    }

    private notify_observers() {
        for (let obs of this.observerList) {
            obs.onVariableUpdate(this.value);
        }
    }

    setValue(value: number) {
        this.value.setValue(value);
        this.notify_observers();
    }

    setDigits(digits: number[]) {
        this.value.setDigits(digits);
        this.notify_observers();
    }

    setNumeralSystem(numeralSystem: MixedRadixNumeralSystem) {
        this.value.setNumeralSystem(numeralSystem);
        // this.notify_observers();
    }
}

