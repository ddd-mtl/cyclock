import {RadixModel} from "./RadixModel";
import {MixedRadixNumeralSystem} from "./MixidRadixNumeralSystem";
import {MixedRadixValue} from "./MixedRadixValue";

/**
 *
 */
export interface VariableObserver {
    onVariableUpdate(variable: MixedRadixVariable): void;
}

/**
 * Models a variable that can have e changing value.
 */
export class MixedRadixVariable {
    private value: MixedRadixValue;
    public isTimeBound: boolean;
    private observerList: VariableObserver[];
    public readonly name: string;

    constructor(name: string, value: number, numeralSystem: MixedRadixNumeralSystem) {
        this.name = name;
        this.value = new MixedRadixValue(value, numeralSystem);
        this.isTimeBound = false;
        this.observerList = [];
    }

    registerObserver(obs: VariableObserver) {
        this.observerList.push(obs);
    }

    unregisterObserver(obs: VariableObserver) {
        this.observerList = this.observerList.filter(obj => obj !== obs);
    }

    private notifyObservers() {
        for (let obs of this.observerList) {
            obs.onVariableUpdate(this);
        }
    }

    setValue(value: number) {
        this.value.setValue(value);
        this.notifyObservers();
    }

    setDigits(digits: number[]) {
        this.value.setDigits(digits);
        this.notifyObservers();
    }

    setNumeralSystem(numeralSystem: MixedRadixNumeralSystem) {
        this.value.setNumeralSystem(numeralSystem);
        // this.notifyObservers();
    }

    getNumeralSystem(): MixedRadixNumeralSystem {
        return this.value.getNumeralSystem();
    }

    getValue(): MixedRadixValue {
        return this.value;
    }

    getValueFloat(index: number): number {
        return this.value.getValueFloat(index);
    }

}

