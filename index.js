import { assert } from 'chai';


/* Write Number in Expanded Form
    You will be given a number and you will need to return it as a string in Expanded Form. For example:

   12 --> "10 + 2"
   45 --> "40 + 5"
   70304 --> "70000 + 300 + 4"
*/
//simple solution
function expandedForm(num) {
    const b = num.toString().split('')
    let l = b.length;
    const f = b.map(e => {
        for (let i = l - 1; i > 0; i--) {
            if (e == 0) {
                continue;
            }
            e += '0';
        }
        l -= 1;
        return e;
    })
    return f.filter(e => e != 0).join(' + ');
}

//best solution
const expandedForm2 = n => n.toString().split('').reverse().map((e, i) => e * Math.pow(10, i)).filter(e => e > 0).reverse().join(' + ');

//tests
describe(" Write Number in Expanded Form", () => {
    it("func1", () => {
        assert.strictEqual(expandedForm(12), '10 + 2');
        assert.strictEqual(expandedForm(42), '40 + 2');
        assert.strictEqual(expandedForm(70304), '70000 + 300 + 4');
    });
    it("func2", () => {
        assert.strictEqual(expandedForm2(12), '10 + 2');
        assert.strictEqual(expandedForm2(42), '40 + 2');
        assert.strictEqual(expandedForm2(70304), '70000 + 300 + 4');
    });
});

/**
 * Flatten array,
 * [1, [2, 3, [4, 5]], 6] ->  [1, 2, 3, 4, 5, 6]
*/

// Simple solution
function flatten(arr) {
    let result = [];

    arr.forEach(item => {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item)); 
        } else {
            result.push(item); 
        }
    });

    return result;
}

// Best solution
const flatten2 = arr => arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten2(val)) : acc.concat(val), []);

// Tests
describe("Flatten", () => {
    it("func1", () => {
        assert.deepEqual(flatten([1, [2, 3, [4, 5]], 6]), [1, 2, 3, 4, 5, 6]);
    });
    it("func2", () => {
        assert.deepEqual(flatten2([1, [2, 3, [4, 5]], 6]), [1, 2, 3, 4, 5, 6]);
    });
});