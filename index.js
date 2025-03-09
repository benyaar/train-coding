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

/**
 * Enter task name,
 * The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:
 * should be 6: [4, -1, 2, 1]
*/

// Simple solution
function maxSequence(arr) {
    let max = 0
    for (let i = 0; i < arr.length; i++) {
        const neArr = []
        if (arr[i] > 0) {
            neArr.push(arr[i])
            for (let j = i + 1; j < arr.length; j++) {
                if (neArr.length >= 1) {
                    neArr.push(arr[j])
                    let sum = neArr.reduce((acc, el) => {
                        return acc + el
                    }, 0)
                    if (sum > max) max = sum

                }
            }
        }
    }
    arr.push(max)
    return Math.max(...arr)
}

// Best solution
function maxSequence2(arr) {
    var min = 0, ans = 0, i, sum = 0;
    for (i = 0; i < arr.length; ++i) {
        sum += arr[i];
        min = Math.min(sum, min);
        ans = Math.max(ans, sum - min);
    }
    return ans;
}

// Tests
describe("Maximum subarray sum", function () {
    it("Maximum subarray sum", function () {
        assert.strictEqual(maxSequence([]), 0);
        assert.strictEqual(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
    });
    it("Maximum subarray sum2", function () {
        assert.strictEqual(maxSequence2([]), 0);
        assert.strictEqual(maxSequence2([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
    });
});
/**
 * String incrementer
 * Your job is to write a function which increments a string, to create a new string.
 * If the string already ends with a number, the number should be incremented by 1.
 * If the string does not end with a number. the number 1 should be appended to the new string.
 * Examples:
 * foo -> foo1
 * foobar23 -> foobar24
 * foo0042 -> foo0043
 * foo9 -> foo10
 * foo099 -> foo100,
 *
*/

// Simple solution
function incrementString(str) {
    let match = str.match(/\d+$/);
    let num = match ? String(Number(match[0]) + 1).padStart(match[0].length, '0') : '1';
    return match ? str.replace(/\d+$/, num) : str + num;
}

// Best solution
let incrementString2 = str => str.replace(/([0-8]|\d?9+)?$/, (e) => e ? + e + 1 : 1)

// Tests
describe("String incrementer", function () {
    it("incrementString1", function () {
        assert.strictEqual(incrementString("foobar999"), "foobar1000");
        assert.strictEqual(incrementString("foobar000"), "foobar001");
        assert.strictEqual(incrementString("foobar00999"), "foobar01000");
        assert.strictEqual(incrementString("foo"), "foo1");
        assert.strictEqual(incrementString("foobar001"), "foobar002");
        assert.strictEqual(incrementString("foobar1"), "foobar2");
        assert.strictEqual(incrementString("1"), "2");
        assert.strictEqual(incrementString("009"), "010");
        assert.strictEqual(incrementString("fo99obar99"), "fo99obar100");
    });
    it("incrementString2", function () {
        assert.strictEqual(incrementString2("foobar000"), "foobar001");
        assert.strictEqual(incrementString2("foobar999"), "foobar1000");
        assert.strictEqual(incrementString2("foobar00999"), "foobar01000");
        assert.strictEqual(incrementString2("foo"), "foo1");
        assert.strictEqual(incrementString2("foobar001"), "foobar002");
        assert.strictEqual(incrementString2("foobar1"), "foobar2");
        assert.strictEqual(incrementString2("1"), "2");
        assert.strictEqual(incrementString2("009"), "010");
        assert.strictEqual(incrementString2("fo99obar99"), "fo99obar100");
    });
});
/**
 * Enter task name,
 *Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.
*/

// Simple solution
function inArray(array1,array2){
    return array1.filter(e => array2.some(word => word.includes(e))).sort();
}
// Best solution
function inArray2(array1,array2){
    return array1
      .filter(a1 => array2.find(a2 => a2.match(a1)))
      .sort()
  }

// Tests
describe("Which are in?", () => {
    it("Which are in?1", () => {
      
      let a2 = ["lively", "alive", "harp", "sharp", "armstrong"]
  
      let a1 = ["xyz", "live", "strong"]
      assert.sameOrderedMembers(inArray(a1, a2), ["live", "strong"])
  
      a1 = ["live", "strong", "arp"]
      assert.sameOrderedMembers(inArray(a1, a2), ["arp", "live", "strong"])
  
      a1 = ["tarp", "mice", "bull"]
      assert.sameOrderedMembers(inArray(a1, a2), [])
    });
    it("Which are in?2", () => {
      
        let a2 = ["lively", "alive", "harp", "sharp", "armstrong"]
    
        let a1 = ["xyz", "live", "strong"]
        assert.sameOrderedMembers(inArray2(a1, a2), ["live", "strong"])
    
        a1 = ["live", "strong", "arp"]
        assert.sameOrderedMembers(inArray2(a1, a2), ["arp", "live", "strong"])
    
        a1 = ["tarp", "mice", "bull"]
        assert.sameOrderedMembers(inArray2(a1, a2), [])
      });
  });