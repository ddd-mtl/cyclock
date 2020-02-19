import {Cyclock} from "../cyclock";

/**
 * A Radix definition as part of a numeral system.
 * Each value can have a name example:
 *  Radix: 7, 'DaysOfWeek', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
 */
export class Radix {
    public value: number;
    public denomination: string;
    public names: string[];

    constructor(value: number, denomination: string, names?: string[]) {
        this.value = value;
        this.denomination = denomination;
        if (names != undefined && this.names.length) {
            console.error('Radix\' value names count does not match radix');
        }
        this.names = names;
    }

    has_names(): boolean {
        return this.names != undefined && this.names.length == this.value;
    }
}