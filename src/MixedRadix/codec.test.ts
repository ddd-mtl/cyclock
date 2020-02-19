import { cyEncode, cyDecode } from "./codec";
import * as chai from "chai"
let expect = chai.expect;
let assert = chai.assert;

describe("codec", () => {

    it("expect cyEncode nominal behaviour", () => {
        expect(cyEncode([10], [0])).equal(0);
        expect(cyEncode([10], [3])).equal(3);
        expect(cyEncode([10], [10])).equal(10);

        expect(cyEncode([2, 3], [0, 0])).equal(0);
        expect(cyEncode([2, 3], [0, 1])).equal(1);
        expect(cyEncode([2, 3], [1, 0])).equal(3);
        expect(cyEncode([2, 3], [1, 1])).equal(4);
        expect(cyEncode([2, 3], [1, 2])).equal(5);

        expect(cyEncode([4, 6], [0, 3])).equal(3);
        expect(cyEncode([4, 6], [2, 2])).equal(14);

        expect(cyEncode([3, 3, 2], [0, 0, 0])).equal(0);
        expect(cyEncode([3, 3, 2], [0, 2, 1])).equal(5);
        expect(cyEncode([3, 3, 2], [1, 0, 1])).equal(7);
        expect(cyEncode([3, 3, 2], [1, 2, 1])).equal(11);
        expect(cyEncode([3, 3, 2], [2, 2, 1])).equal(17);

        expect(cyEncode([24, 60, 60], [1,   1,  1])).equal(3661);
        expect(cyEncode([24, 60, 60], [7,  21, 13])).equal(26473);
        expect(cyEncode([24, 60, 60], [20, 12,  6])).equal(72726);
    });


    it("expect cyEncode to throw when bases and values length is not equal", () => {
        expect(() => cyEncode([1], [])).throw();
        expect(() => cyEncode([], [2])).throw();
        expect(() => cyEncode([1, 2], [])).throw();
        expect(() => cyEncode([], [1, 2])).throw();

    });

    it("expect cyEncode to throw when it recieves null / undefined", () => {
        // undefined
        expect(() => cyEncode(undefined, undefined)).throw();
        expect(() => cyEncode(undefined, [13])).throw();
        expect(() => cyEncode([1, 3], undefined)).throw();
        // null
        expect(() => cyEncode(null, null)).throw();
        expect(() => cyEncode(null, [13])).throw();
        expect(() => cyEncode([1, 3], null)).throw();
    });

    it("expect cyEncode to throw when it recieves zero, negative or float radices", () => {
        // zero
        expect(() => cyEncode([1, 2, 0], [1, 2, 3])).throw();
        expect(() => cyEncode([0, 2, 3], [1, 2, 3])).throw();
        expect(cyEncode([1, 2, 3], [0, 2, 3])).equal(9);
        expect(cyEncode([1, 2, 3], [1, 2, 0])).equal(12);
        // negative
        expect(() => cyEncode([1, 2, -3], [1, 2, 3])).throw();
        expect(() => cyEncode([-1, 2, 3], [1, 2, 3])).throw();
        expect(() => cyEncode([1, 2, 3], [-1, 2, 3])).throw();
        expect(() => cyEncode([1, 2, 3], [1, 2, -3])).throw();
        // float
        expect(() => cyEncode([1, 2, 3.3], [1, 2, 3])).throw();
        expect(() => cyEncode([1.1, 2, 3], [1, 2, 3])).throw();
        expect(() => cyEncode([1, 2, 3], [1.1, 2, 3])).throw();
        expect(() => cyEncode([1, 2, 3], [1, 2, 3.3])).throw();
    });


    it("expect mrDecode nominal behaviour", () => {

        const res = cyDecode([10],  0);
        expect(cyDecode([10],  0)).eql([0]);
        expect(cyDecode([10],  3)).eql([3]);
        expect(cyDecode([10], 10)).eql([0]);

        expect(cyDecode([2, 3], 0)).eql([0, 0]);
        expect(cyDecode([2, 3], 1)).eql([0, 1]);
        expect(cyDecode([2, 3], 3)).eql([1, 0]);
        expect(cyDecode([2, 3], 4)).eql([1, 1]);
        expect(cyDecode([2, 3], 5)).eql([1, 2]);
        expect(cyDecode([2, 3], 6)).eql([0, 0]);
        expect(cyDecode([2, 3], 9)).eql([1, 0]);

        expect(cyDecode([4, 6],  3)).eql([0, 3]);
        expect(cyDecode([4, 6], 14)).eql([2, 2]);

        expect(cyDecode([3, 3, 2],  0)).eql([0, 0, 0]);
        expect(cyDecode([3, 3, 2],  5)).eql([0, 2, 1]);
        expect(cyDecode([3, 3, 2],  7)).eql([1, 0, 1]);
        expect(cyDecode([3, 3, 2], 11)).eql([1, 2, 1]);
        expect(cyDecode([3, 3, 2], 17)).eql([2, 2, 1]);

        expect(cyDecode([24, 60, 60],  3661)).eql([ 1,  1,  1]);
        expect(cyDecode([24, 60, 60], 26473)).eql([ 7, 21, 13]);
        expect(cyDecode([24, 60, 60], 72726)).eql([20, 12,  6]);

    });

    it("expect cyDecode to throw when it recieves null / undefined", () => {
        // undefined
        expect(() => cyDecode(undefined, undefined)).throw();
        expect(() => cyDecode(undefined, 13)).throw();
        expect(() => cyDecode([1, 3], undefined)).throw();
        // null
        expect(() => cyDecode(null, null)).throw();
        expect(() => cyDecode(null, 13)).throw();
        expect(() => cyDecode([1, 3], null)).throw();
    });

    it("expect cyDecode to throw when it recieves zero, negative or float radices", () => {
        // zero
        expect(() => cyDecode([1, 2, 0], 123)).throw();
        expect(() => cyDecode([0, 2, 3], 123)).throw();
        // negative
        expect(() => cyDecode([1, 2, -3], 123)).throw();
        expect(() => cyDecode([-1, 2, 3], 123)).throw();
        expect(() => cyDecode([1, 2, 3], -123)).throw();
        // float
        expect(() => cyDecode([1, 2, 3.3], 123)).throw();
        expect(() => cyDecode([1.1, 2, 3], 123)).throw();
        expect(() => cyDecode([1, 2, 3], 123.4)).throw();
    });
});