
export enum OverflowStrategyEnum {
    Discard = 1,
    Infinity,
    Propagate,
}

/**
 * Encode using mixed radix (i.e. [1, 2, 3] => 123)
 * @param {number[]} radices - Mixed bases, must be integers.
 * @param {number[]} valueDigits - Values to encode, must be an array of integer with
 * the same length as bases.
 * @returns {number} - Encoded values.
 */
export function cyEncode(radices: number[], valueDigits: number[], strategy?: OverflowStrategyEnum): number {
    // Validate args
    if (radices.length !== valueDigits.length) {
        throw new Error(`Invalid parameter: "radices" and "valueDigits" must have the same length.
      radices: "${radices}" valueDigits: "${valueDigits}"`);
    }
    // Encode
    let total_value = 1;
    return radices.reduceRight((acc, radix, index) => {
        if (radix <= 1) {
            throw new Error(`Invalid parameter: "radix cannot be <= 1`);
        }
        if (!Number.isInteger(radix)) {
            throw new Error(`Invalid parameter: "radix cannot be a float`);
        }
        let digit = valueDigits[index];
        if (digit < 0) {
            throw new Error(`Invalid parameter: "digit cannot be < 0`);
        }
        if (digit >= radix) {
            throw new Error(`Invalid parameter: "digit cannot be >= radix`);
        }
        if (!Number.isInteger(digit)) {
            throw new Error(`Invalid parameter: "digit cannot be a float`);
        }
        const r = acc + (total_value * digit);
        total_value = total_value * radix;
        return r;
    }, 0);
}

/**
 * Decode mixed radix (i.e. 1123 => [1, 1, 2, 3])
 * @param {number[]} radices - Mixed bases, must be an array integers.
 * @param {number[]} v - Values to decode, must be an integer.
 * @returns {number[]} - Decoded values.
 */
export function cyDecode(radices: number[], value: number, strategy?: OverflowStrategyEnum): number[] {
    // Validate args
    if (radices == undefined || radices.length <= 0) {
        throw new Error(`Invalid parameter: "radices" must not be null / undefined.`);
    }
    if (value == undefined || value < 0 || !Number.isInteger(value)) {
        throw new Error(`Invalid parameter: "value" must not be null / undefined, negative or a float.`);
    }

    // let digits  = Object.assign([], radices);
    // deep copy + reverse + check radices
    let digits = [];
    for (let i = radices.length - 1; i >= 0; i--) {
        const radix = radices[i];
        if (radix <= 1) {
            throw new Error(`Invalid parameter: "radix cannot be <= 1`);
        }
        if (!Number.isInteger(radix)) {
            throw new Error(`Invalid parameter: "radix cannot be a float`);
        }
        digits = digits.concat(radix);
    }

    // Decode
    let v = value;
    let res = digits.map((radix) => {
        const r = v % radix;
        v = Math.floor(v / radix);
        return r;
    }).reverse();

    // Handle overflow
    if(strategy && strategy == OverflowStrategyEnum.Infinity && v > 0) {
        res = [v].concat(res);
    }

    if(strategy && strategy == OverflowStrategyEnum.Propagate && v > 0) {
        while(v >= radices[0]) {
            const r = v % radices[0];
            v = Math.floor(v / radices[0]);
            res = [r].concat(res);
        }
        res = [v].concat(res);
    }

    return res;

}