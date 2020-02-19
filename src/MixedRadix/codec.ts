/**
 * Encode using mixed radix (i.e. [1, 2, 3] => 123)
 * @param {number[]} radices - Mixed bases, must be integers.
 * @param {number[]} valueDigits - Values to encode, must be an array of integer with
 * the same length as bases.
 * @returns {number} - Encoded values.
 */
export function cyEncode(radices: number[], valueDigits: number[]): number {
    // Validate args
    if (radices.length !== valueDigits.length) {
        throw new Error(`Invalid parameter: "radices" and "valueDigits" must have the same length.
      radices: "${radices}" valueDigits: "${valueDigits}"`);
    }
    // Encode
    let baseAcc = 1;
    return radices.reduceRight((acc, radix, index) => {
        if (radix <= 0) {
            throw new Error(`Invalid parameter: "radix cannot be <= 0`);
        }
        if (!Number.isInteger(radix)) {
            throw new Error(`Invalid parameter: "radix cannot be a float`);
        }

        let v = valueDigits[index];
        if (v < 0) {
            throw new Error(`Invalid parameter: "digit cannot be < 0`);
        }
        if (!Number.isInteger(v)) {
            throw new Error(`Invalid parameter: "digit cannot be a float`);
        }
        const r = acc + (baseAcc * v);
        baseAcc = baseAcc * radix;
        return r;
    }, 0);
}


/**
 * Decode mixed radix (i.e. 1123 => [1, 1, 2, 3])
 * @param {number[]} radices - Mixed bases, must be an array integers.
 * @param {number[]} v - Values to decode, must be an integer.
 * @returns {number[]} - Decoded values.
 */
export function cyDecode(radices: number[], v: number): number[] {
    // Validate args
    if (radices == undefined || radices.length <= 0) {
        throw new Error(`Invalid parameter: "radices" must not be null / undefined.`);
    }
    if (v == undefined || v < 0 || !Number.isInteger(v)) {
        throw new Error(`Invalid parameter: "v" must not be null / undefined, negative or a float.`);
    }

    // let digits  = Object.assign([], radices);
    // deep copy + reverse + check radices
    let digits = [];
    for (let i = radices.length - 1; i >= 0; i--) {
        const radix = radices[i];
        if (radix <= 0) {
            throw new Error(`Invalid parameter: "radix cannot be <= 0`);
        }
        if (!Number.isInteger(radix)) {
            throw new Error(`Invalid parameter: "radix cannot be a float`);
        }
        digits = digits.concat(radix);
    }

    // Decode
    return digits.map((radix) => {
        const r = v % radix;
        v = Math.floor(v / radix);
        return r;
    }).reverse();
}