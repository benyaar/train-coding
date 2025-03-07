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
    it("expandedForm", () => {
        assert.strictEqual(expandedForm(12), '10 + 2');
        assert.strictEqual(expandedForm(42), '40 + 2');
        assert.strictEqual(expandedForm(70304), '70000 + 300 + 4');
    });
    it("expandedForm2", () => {
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
            result.push(...flatten(item));
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
    it("Flatten1", () => {
        assert.deepEqual(flatten([1, [2, 3, [4, 5]], 6]), [1, 2, 3, 4, 5, 6]);
    });
    it("Flatten2", () => {
        assert.deepEqual(flatten2([1, [2, 3, [4, 5]], 6]), [1, 2, 3, 4, 5, 6]);
    });
});

/**
 * Extract the domain name from a URL
 *
*/

// Simple solution
function domainName(url) {
    return url.replace('http://', '').replace('https://', '').replace('www.', '').split('.')[0]
}


// Tests
describe("Extract the domain name from a URL", () => {
    it("Extract the domain name from a URL", () => {
        assert.equal(domainName("http://google.com"), "google");
        assert.equal(domainName("http://google.co.jp"), "google");
        assert.equal(domainName("https://youtube.com"), "youtube");
        assert.equal(domainName("www.xakep.ru"), "xakep");
    })
})

/**
 * Directions Reduction
 * In ["NORTH", "SOUTH", "EAST", "WEST"], the direction "NORTH" + "SOUTH" is going north and coming back right away.
 * The path becomes ["EAST", "WEST"], now "EAST" and "WEST" annihilate each other, therefore, the final result is [] (nil in Clojure).
*/

// Simple solution
function dirReduc(arr) {
    //or {'NORTH': 'SOUTH', 'EAST': 'WEST', 'SOUTH': 'NORTH', 'WEST': 'EAST'};
    return arr.reduce((acc, el) => {
        if ((acc[acc.length - 1] === 'NORTH' && el === 'SOUTH')  //  if (acc[acc.length - 1] === opposite[el])
            || (acc[acc.length - 1] === 'SOUTH' && el === 'NORTH')
            || (acc[acc.length - 1] === 'WEST' && el === 'EAST')
            || (acc[acc.length - 1] === 'EAST' && el === 'WEST')) {
            acc.pop(el)
        } else {
            acc.push(el);
        }
        return acc
    }, []);
}

// Best solution
const dirReduc2 = arr => arr.reduce((pre, val) => pre[pre.length - 1] === { NORTH: `SOUTH`, SOUTH: `NORTH`, EAST: `WEST`, WEST: `EAST` }[val] ? pre.slice(0, -1) : [...pre, val], []);

// Tests


describe("Directions Reduction", () => {
    it("Directions Reduction", () => {
        assert.deepEqual(dirReduc(
            ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]),
            ["WEST"]
        );
        assert.deepEqual(dirReduc(
            ["NORTH", "WEST", "SOUTH", "EAST"]),
            ["NORTH", "WEST", "SOUTH", "EAST"]
        );
        assert.deepEqual(dirReduc(
            ["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]),
            []
        );
    });
    it("Directions Reduction", () => {
        assert.deepEqual(dirReduc2(
            ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]),
            ["WEST"]
        );
        assert.deepEqual(dirReduc2(
            ["NORTH", "WEST", "SOUTH", "EAST"]),
            ["NORTH", "WEST", "SOUTH", "EAST"]
        );
        assert.deepEqual(dirReduc2(
            ["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]),
            []
        );
    });
});
