import { cyEncode, cyDecode } from "./codec";
import * as chai from "chai"
import {MixedRadixNumeralSystem} from "./MixidRadixNumeralSystem";
import {RadixModel} from "./RadixModel";
let expect = chai.expect;
let assert = chai.assert;

describe("MixedRadixNumeralSystem", () => {

    it("expect nominal behaviour DECIMAL", () => {
        let decimal_system = new MixedRadixNumeralSystem("decimal");
        let decimal_radix = new RadixModel(10, "decimal");

        decimal_system.push(decimal_radix);

        expect(decimal_system.toValue([0])).equal(0);
        expect(decimal_system.toValue([3])).equal(3);
        expect(() => decimal_system.toValue([10])).throw();
        expect(() => decimal_system.toValue([11])).throw();

        expect(decimal_system.toDigits(0)).eql([0]);
        expect(decimal_system.toDigits(3)).eql([3]);
        expect(decimal_system.toDigits(10)).eql([0]);
        expect(decimal_system.toDigits(11)).eql([1]);

        expect(decimal_system.toNames([3])).eql(['3']);
        expect(decimal_system.valueToNames(3)).eql(['3']);

    });

    it("expect nominal behaviour BINARY", () => {
        let oSystem = new MixedRadixNumeralSystem("binary");
        let oRadix = new RadixModel(2, "binary");

        oSystem.push(oRadix);
        oSystem.push(oRadix);
        oSystem.push(oRadix);

        expect(() => oSystem.toValue([1])).throw();
        expect(() => oSystem.toValue([1, 0, 0, 0])).throw();
        expect(oSystem.toValue([0, 1, 1])).equal(3);
        expect(oSystem.toValue([1, 0, 0])).equal(4);

        expect(oSystem.toNames([0, 1, 1])).eql(['0', '1', '1']);
        expect(oSystem.toNames([1, 0, 0])).eql(['1', '0', '0']);
    });

    it("expect nominal behaviour Weekly", () => {
        let oSystem = new MixedRadixNumeralSystem("weekly");
        let oRadix = new RadixModel(7, "weekly",
            ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']);
        oSystem.push(oRadix);

        expect(oSystem.toValue([3])).equal(3);
        expect(oSystem.toDigits(8)).eql([1]);

        expect(oSystem.toNames([2])).eql(['Wednesday']);
        expect(oSystem.valueToNames(2)).eql(['Wednesday']);
        expect(oSystem.valueToNames(0)).eql(['Monday']);

        // Double Weekly
        oSystem.push(oRadix);

        expect(oSystem.toNames([0])).eql(['Monday']);
        expect(oSystem.toNames([1, 2])).eql(['Tuesday', 'Wednesday']);
        expect(oSystem.valueToNames(8)).eql(['Tuesday', 'Tuesday']);
        expect(oSystem.toDigitName(0, 1)).equal('Tuesday');
        expect(oSystem.toDigitName(1, 2)).equal('Wednesday');
    });
});
