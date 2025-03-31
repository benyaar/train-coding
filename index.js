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
function inArray(array1, array2) {
    return array1.filter(e => array2.some(word => word.includes(e))).sort();
}
// Best solution
function inArray2(array1, array2) {
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
/**
 * Roman Numerals Encoder
 *
*/

// Simple solution
function solution(n) {
    const dictionary = {
        1: 'I', 4: 'IV', 5: 'V', 9: 'IX',
        10: 'X', 40: 'XL', 50: 'L', 90: 'XC',
        100: 'C', 400: 'CD', 500: 'D', 900: 'CM',
        1000: 'M'
    };

    let result = '';
    let keys = Object.keys(dictionary).map(Number).reverse();

    for (let key of keys) {
        while (n >= key) {
            result += dictionary[key];
            n -= key;
        }
    }
    return result;
}

// Tests
describe("Roman Numerals Encoder", function () {
    it("should handle small numbers", function () {
        assert.strictEqual(solution(1), 'I', '1 should return "I"')
        assert.strictEqual(solution(2), 'II', '2 should return "II"')
        assert.strictEqual(solution(3), 'III', '3 should return "III"')
        assert.strictEqual(solution(4), 'IV', '4 should return "IV"')
        assert.strictEqual(solution(5), 'V', '5 should return "V"')
        assert.strictEqual(solution(9), 'IX', '9 should return "IX"')
        assert.strictEqual(solution(10), 'X', '10 should return "X"')
        assert.strictEqual(solution(11), 'XI', '11 should return "XI"')
        assert.strictEqual(solution(19), 'XIX', '19 should return "XIX"')
        assert.strictEqual(solution(22), 'XXII', '22 should return "XXII"')
        assert.strictEqual(solution(15), 'XV', '15 should return "XV"')
    });

    it("should handle large numbers", function () {
        assert.strictEqual(solution(1000), 'M', '1000 should, "M"')
        assert.strictEqual(solution(1001), 'MI', '1001 should, "MI"')
        assert.strictEqual(solution(1990), 'MCMXC', '1990 should, "MCMXC"')
        assert.strictEqual(solution(2007), 'MMVII', '2007 should, "MMVII"')
        assert.strictEqual(solution(2008), 'MMVIII', '2008 should, "MMVIII"')
    });
});

/**
 *Are we alternate? 
 * Create a function that accepts a string as an argument and validates whether the vowels (a, e, i, o, u) and consonants are in alternate order.
*/

// Simple solution
function isAlt(word) {
    const dictionary = new Set(['a', 'e', 'i', 'o', 'u'])
    for (let i = 1; i < word.length; i++) {
        const prev = dictionary.has(word[i - 1])
        const cur = dictionary.has(word[i])

        if (prev === cur) {
            return false
        }
    }
    return true;
}

// Best solution
function isAlt2(word) {
    return !/[aeiou]{2}|[^aeiou]{2}/.test(word);
}

// Tests
describe("Are we alternate? ", function () {
    it("Are we alternate?1", function () {
        assert.strictEqual(isAlt('amazon'), true)
        assert.strictEqual(isAlt('apple'), false)
        assert.strictEqual(isAlt('banana'), true)
        assert.strictEqual(isAlt('a'), true)
        assert.strictEqual(isAlt('ee'), false)
    });

    it("Are we alternate?2", function () {
        assert.strictEqual(isAlt2('amazon'), true)
        assert.strictEqual(isAlt2('apple'), false)
        assert.strictEqual(isAlt2('banana'), true)
        assert.strictEqual(isAlt2('a'), true)
        assert.strictEqual(isAlt2('ee'), false)
    });
});

/**
 * Counting Change Combinations
 * Write a function that counts how many different ways you can make change for an amount of money, given an array of coin denominations. 
 * For example, there are 3 ways to give change for 4 if you have coins with denomination 1 and 2:
 * 1+1+1+1, 1+1+2, 2+2.
 *
*/

// Simple solution
function countChange(money, coins) {
    if (money === 0) return 1
    if (money < 0 || !coins.length) return 0
    return countChange(money - coins[0], coins) + countChange(money, coins.slice(1))

}
// Tests
const test = (money, coins, expected) => {
    assert.strictEqual(countChange(money, coins), expected, `Test failed for input (money = ${money}, coins = [${coins}])`);
};
describe('Counting Change Combinations', () => {
    it('Counting Change Combinations', () => {
        test(0, [1, 2], 1);
        test(4, [1, 2], 3);
        test(10, [5, 2, 3], 4);
        test(11, [5, 7], 0);
        test(300, [5, 10, 20, 50, 100, 200, 500], 1022);
    });
});

/**
 * Boggle Word Checker,
 * Write a function that determines whether a string is a valid guess in a Boggle board, as per the rules of Boggle. A Boggle board is a 2D array of individual characters, e.g.:
 * [ ["I","L","A","W"],
 * ["B","N","G","E"],
 * ["I","U","A","O"],
 * ["A","S","R","L"] ]
 * Valid guesses are strings which can be formed by connecting adjacent cells (horizontally, vertically, or diagonally) without re-using any previously used cells.
 * For example, in the above board "BINGO", "LINGO", and "ILNBIA" would all be valid guesses, while "BUNGIE", "BINS", and "SINUS" would not.
*/

// Simple solution
function checkWord(board, word) {
    let rows = board.length;
    let cols = board[0].length;

    let directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    function dfs(i, j, index, visited) {

        if (index === word.length) return true;

        if (i < 0 || j < 0 || i >= rows || j >= cols || visited.has(`${i},${j}`) || board[i][j] !== word[index]) {
            return false;
        }

        visited.add(`${i},${j}`);

        for (let [dx, dy] of directions) {
            if (dfs(i + dx, j + dy, index + 1, visited)) {
                return true;
            }
        }
        visited.delete(`${i},${j}`);

        return false;
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === word[0]) {
                let visited = new Set();
                if (dfs(i, j, 0, visited)) {
                    return true;
                }
            }
        }
    }

    return false;
}



// Tests
describe("Boggle Word Checker", () => {
    it("Boggle Word Checker", () => {
        var testBoard = [
            ["E", "A", "R", "A"],
            ["N", "L", "E", "C"],
            ["I", "A", "I", "S"],
            ["B", "Y", "O", "R"]
        ];

        assert.strictEqual(checkWord(testBoard, "C"), true);
        assert.strictEqual(checkWord(testBoard, "EAR"), true);
        assert.strictEqual(checkWord(testBoard, "EARS"), false);
        assert.strictEqual(checkWord(testBoard, "BAILER"), true);
        assert.strictEqual(checkWord(testBoard, "RSCAREIOYBAILNEA"), true);
        assert.strictEqual(checkWord(testBoard, "CEREAL"), false);
        assert.strictEqual(checkWord(testBoard, "ROBES"), false);
        assert.strictEqual(checkWord(testBoard, "BAKER"), false);
        assert.strictEqual(checkWord(testBoard, "CARS"), false);

    });
});

/**
 * Moving Zeros To The End
 *
*/

// Simple solution
function moveZeros(arr) {
    let filtedList = arr.filter((num) => num !== 0);
    let zeroList = arr.filter((num) => num === 0);
    return filtedList.concat(zeroList);
}

// Tests
describe('Moving Zeros To The End', () => {
    it('Moving Zeros To The End', () => {
        assert.deepEqual(
            moveZeros([1, 2, 0, 1, 0, 1, 0, 3, 0, 1]),
            [1, 2, 1, 1, 3, 1, 0, 0, 0, 0]
        );

        assert.deepEqual(
            moveZeros([9, 0.0, 0, 9, 1, 2, 0, 1, 0, 1, 0.0, 3, 0, 1, 9, 0, 0, 0, 0, 9]),
            [9, 9, 1, 2, 1, 1, 3, 1, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        );

        assert.deepEqual(
            moveZeros(["a", 0, 0, "b", "c", "d", 0, 1, 0, 1, 0, 3, 0, 1, 9, 0, 0, 0, 0, 9]),
            ["a", "b", "c", "d", 1, 1, 3, 1, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        );

    });
});

/**
 * Simple Pig Latin,
 * Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.
*/

// Simple solution

function pigIt(str) {
    return str.split(' ').map(e => {
        if (!/^[a-zA-Z]+$/.test(e)) return e
        e = e + e[0] + 'ay'
        e = e.substring(1)
        return e
    }).join(' ')
}

// Tests
describe("Simple Pig Latin,", () => {
    it("Simple Pig Latin", () => {
        assert.strictEqual(pigIt('Pig latin is cool'), 'igPay atinlay siay oolcay')
        assert.strictEqual(pigIt('This is my string'), 'hisTay siay ymay tringsay')
    });
});

/**
 * Human Readable Time
 * Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)
 * HH = hours, padded to 2 digits, range: 00 - 99
 * MM = minutes, padded to 2 digits, range: 00 - 59
 * SS = seconds, padded to 2 digits, range: 00 - 59
 *
*/

// Simple solution
function humanReadable(seconds) {
    let HH = Math.floor(seconds / 3600);
    let MM = Math.floor((seconds % 3600) / 60);
    let SS = seconds % 60;

    return `${HH.toString().padStart(2, 0)}:${MM.toString().padStart(2, 0)}:${SS.toString().padStart(2, 0)}`
}

// Tests
describe("Human Readable Time", () => {
    it("Human Readable Time", () => {
        assert.strictEqual(humanReadable(59), '00:00:59');
        assert.strictEqual(humanReadable(60), '00:01:00');
        assert.strictEqual(humanReadable(90), '00:01:30');
        assert.strictEqual(humanReadable(3599), '00:59:59');
        assert.strictEqual(humanReadable(3600), '01:00:00');
        assert.strictEqual(humanReadable(45296), '12:34:56');
        assert.strictEqual(humanReadable(86399), '23:59:59');
        assert.strictEqual(humanReadable(86400), '24:00:00');
        assert.strictEqual(humanReadable(359999), '99:59:59');
    });
});
/**
 * RGB To Hex Conversion
 * The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.
*/

// Simple solution
function rgb(r, g, b) {
    const arr = [r, g, b]
    return arr.map(e => {
        if (e < 0) e = 0
        if (e > 255) e = 255
        return e.toString(16).padStart(2, 0)
    }).join('').toUpperCase()
}

// Tests
describe("RGB To Hex Conversion", () => {
    it("RGB To Hex Conversion", () => {
        assert.strictEqual(rgb(0, 0, 0), '000000');
        assert.strictEqual(rgb(0, 0, -20), '000000');
        assert.strictEqual(rgb(300, 255, 255), 'FFFFFF');
        assert.strictEqual(rgb(173, 255, 47), 'ADFF2F');
    });
});

/**
 * Calculating with Functions
 * This time we want to write calculations using functions and get the results. Let's have a look at some examples:
 * seven(times(five())); // must return 35
 * four(plus(nine())); // must return 13
 * eight(minus(three())); // must return 5
 * six(dividedBy(two())); // must return 3
*/

// Simple solution
function zero(f) { return f ? f(0) : 0; }
function one(f) { return f ? f(1) : 1; }
function two(f) { return f ? f(2) : 2; }
function three(f) { return f ? f(3) : 3; }
function four(f) { return f ? f(4) : 4; }
function five(f) { return f ? f(5) : 5; }
function six(f) { return f ? f(6) : 6; }
function seven(f) { return f ? f(7) : 7; }
function eight(f) { return f ? f(8) : 8; }
function nine(f) { return f ? f(9) : 9; }

function plus(b) { return (a) => a + b; }
function minus(b) { return (a) => a - b; }
function times(b) { return (a) => a * b; }
function dividedBy(b) { return (a) => Math.floor(a / b); }

// Tests
describe("Calculating with Functions", () => {
    it("Calculating with Functions", () => {
        assert.strictEqual(seven(times(five())), 35, "seven(times(five ()))");
        assert.strictEqual(four(plus(nine())), 13, "four (plus(nine ()))");
        assert.strictEqual(eight(minus(three())), 5, "eight(minus(three()))");
        assert.strictEqual(six(dividedBy(two())), 3, "six(dividedBy(two()))");
    });
});

/**
 * Pete, the baker,
 * Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?
*/

// Simple solution

function cakes(recipe, available) {
    const res = Object.keys(recipe).map(e => {
        return available[e] / recipe[e] >> 0
    })
    return Math.min(...res)
}

// Tests

describe('Pete, the baker', function () {
    it('basic recipes', function () {
        let recipe = { flour: 500, sugar: 200, eggs: 1 };
        let available = { flour: 1200, sugar: 1200, eggs: 5, milk: 200 };
        let result = 2;
        assert.equal(cakes(recipe, available), result);

        recipe = { cream: 200, flour: 300, sugar: 150, milk: 100, oil: 100 };
        available = { sugar: 1700, flour: 20000, milk: 20000, oil: 30000, cream: 5000 };
        result = 11;
        assert.equal(cakes(recipe, available), result);
    });

    it('missing ingredient', function () {
        let recipe = { apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 };
        let available = { sugar: 500, flour: 2000, milk: 2000 };
        let result = 0;
        assert.equal(cakes(recipe, available), result);
    });

    it('not enough ingredients', function () {
        let recipe = { apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 };
        let available = { sugar: 500, flour: 2000, milk: 2000, apples: 15, oil: 20 };
        let result = 0;
        assert.equal(cakes(recipe, available), result);
    });

    it('no ingredients available', function () {
        let recipe = { eggs: 4, flour: 400 };
        let available = {};
        let result = 0;
        assert.equal(cakes(recipe, available), result);
    });

    it('exactly enough ingredients for 1 cake', function () {
        let recipe = { cream: 1, flour: 3, sugar: 1, milk: 1, oil: 1, eggs: 1 };
        let available = { cream: 1, flour: 3, sugar: 1, milk: 1, oil: 1, eggs: 1 };
        let result = 1;
        assert.equal(cakes(recipe, available), result);
    });
});

/**
 * Weight for weight,
 * When two numbers have the same "weight", let us class them as if they were strings (alphabetical ordering) and not numbers:
 * 180 is before 90 since, having the same "weight" (9), it comes before as a string.
*/

// Simple solution

function orderWeight(str) {
    return str.split(' ').sort((a, b) => {
        const sumA = a.split('').reduce((e, a) => Number(e) + Number(a), 0)
        const sumB = b.split('').reduce((e, a) => Number(e) + Number(a), 0)
        if (sumA == sumB) {
            return a.localeCompare(b)
        }
        return sumA - sumB
    }).join(' ');
}

// Tests

describe("Weight for weight", function () {
    it("Weight for weight", function () {
        assert.strictEqual(orderWeight("103 123 4444 99 2000"), "2000 103 123 4444 99")
        assert.strictEqual(orderWeight("2000 10003 1234000 44444444 9999 11 11 22 123"), "11 11 2000 10003 22 123 1234000 44444444 9999")
    })
})


/**
 * Scramblies,
 * Complete the function scramble(str1, str2) that returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false.
*/

// Simple solution
function scramble(str1, str2) {
    const freq = {};

    for (let char of str1) {
        freq[char] = (freq[char] || 0) + 1;
    }

    for (let char of str2) {
        if (!freq[char]) return false;
        freq[char]--;
    }

    return true;
}

// Best solution
function scramble2(str1, str2) {
    let occurences = str1.split("").reduce((arr, cur) => { arr[cur] ? arr[cur]++ : arr[cur] = 1; return arr; }, {});
    return str2.split("").every((character) => --occurences[character] >= 0);
}

// Tests
function dotest(s1, s2, expected) {
    assert.strictEqual(scramble(s1, s2), expected, `Incorrect answer for inputs:\ns1='${s1}'\ns2='${s2}'\n`);
}

describe('Scramblies Tests', function () {

    const charList = "abcdefghijklmnopqrstuvwxyz";
    let rand = function (min, max) { return Math.floor(Math.random() * (max - min + 1) + min) };
    let char = function () { return charList[Math.random() * 26 | 0] };

    function sol(str1, str2) {
        let map = {};
        for (let c of str1) map[c] = map[c] + 1 || 1;
        for (let c of str2) {
            if (!map[c]) return false;
            map[c]--;
        }
        return true;
    }
    let randomStr = function (length, exclude) {
        let arr = [], c;
        for (let i = 0; i <= length; i++) {
            while ((c = char()) == exclude) { };
            arr.push(c);
        }
        return arr.join('');
    };
    it('Testing small strings', function () {
        for (let i = 0; i < 50; i++) {
            let s1 = randomStr(rand(0, 500));
            let s2 = randomStr(rand(0, 200));
            dotest(s1, s2, sol(s1, s2));
        }
    });
});

/**
 * Sum of Pairs
 * Given a list of integers and a single sum value, return the first two values (parse from the left please) in order of appearance that add up to form the sum.
 * If there are two or more pairs with the required sum, the pair whose second element has the smallest index is the solution.
 *
*/

// Simple solution
function sumPairs(ints, s) {
    const seen = new Set()
    for (const element of ints) {
        const diff = s - element
        if (seen.has(element)) {
            return [diff, element]
        }
        seen.add(diff)
    }
    return undefined
}


// Tests
describe("Sum of Pairs", function () {
    it("Sum of Pairs", function () {
        assert.deepEqual(sumPairs([1, 4, 8, 7, 3, 15], 8), [1, 7], "Basic: [1, 4, 8, 7, 3, 15] should return [1, 7] for sum = 8");
        assert.deepEqual(sumPairs([1, -2, 3, 0, -6, 1], -6), [0, -6], "Negatives: [1, -2, 3, 0, -6, 1] should return [0, -6] for sum = -6");
        assert.deepEqual(sumPairs([20, -13, 40], -7), undefined, "No Match: [20, -13, 40] should return undefined for sum = -7");
        assert.deepEqual(sumPairs([1, 2, 3, 4, 1, 0], 2), [1, 1], "First Match From Left: [1, 2, 3, 4, 1, 0] should return [1, 1] for sum = 2");
        assert.deepEqual(sumPairs([10, 5, 2, 3, 7, 5], 10), [3, 7], "First Match From Left REDUX!: [10, 5, 2, 3, 7, 5] should return [3, 7] for sum = 10");
        assert.deepEqual(sumPairs([4, -2, 3, 3, 4], 8), [4, 4], "Duplicates: [4, -2, 3, 3, 4] should return [4, 4] for sum = 8");
        assert.deepEqual(sumPairs([0, 2, 0], 0), [0, 0], "Zeroes: [0, 2, 0] should return [0, 0] for sum = 0");
        assert.deepEqual(sumPairs([5, 9, 13, -3], 10), [13, -3], "Subtraction: [5, 9, 13, -3] should return [13, -3] for sum = 10");
    });
});

/**
 * First non-repeating character
 *
*/

// Simple solution
function firstNonRepeatingLetter(s) {
    const seen = new Set()

    s.replace(/\s+/g, "").split('').forEach(el => {

        if (!seen.has(el.toLowerCase()) && !seen.has(el.toUpperCase())) {
            seen.add(el)
        } else {
            seen.delete(el.toLowerCase())
            seen.delete(el.toUpperCase())
        }
    });

    return [...seen][0] || '';

}

// Best solution
function firstNonRepeatingLetter2(s) {
    var t = s.toLowerCase();
    for (var x = 0; x < t.length; x++)
        if (t.indexOf(t[x]) === t.lastIndexOf(t[x]))
            return s[x];
    return "";
}

// Tests

describe("First non-repeating character", function () {
    it("First non-repeating character", function () {
        assert.strictEqual(firstNonRepeatingLetter("sTreSS"), "T")
        assert.strictEqual(firstNonRepeatingLetter("Go hang a salami, I\'m a lasagna hog!"), ",")
    })
})
/**
 * Greed is Good,
 * Greed is a dice game played with five six-sided dice. Your mission, should you choose to accept it, is to score a throw according to these rules. You will always be given an array with five six-sided dice values.
*/

// Simple solution
function score(dice) {
    let res = 0
    const count = {}
    for (const el of dice) {
        count[el] = count[el] ? count[el] += 1 : 1

    }
    const dictionary = { 1: 1000, 2: 200, 3: 300, 4: 400, 5: 500, 6: 600 }
    count
    for (const key in count) {
        count
        if (count[key] >= 3) {
            res += dictionary[key]
            count[key] -= 3
        }
    }
    if (count[1]) res += count[1] * 100;
    if (count[5]) res += count[5] * 50;
    return res

}

// Best solution
function score2(dice) {
    var dc = [0, 0, 0, 0, 0, 0];
    var tdr = [1000, 200, 300, 400, 500, 600];
    var sdr = [100, 0, 0, 0, 50, 0];
    dice.forEach(function (x) { dc[x - 1]++; });
    return dc.reduce(function (s, x, i) {
        return s + (x >= 3 ? tdr[i] : 0) + sdr[i] * (x % 3);
    }, 0);
}

// Tests
describe("Greed is Good", function () {
    it("should value this as worthless", function () {
        assert.strictEqual(score([2, 3, 4, 6, 2]), 0, "Incorrect answer for dice = [2, 3, 4, 6, 2]");
    });

    it("should value this triplet correctly", function () {
        assert.strictEqual(score([4, 4, 4, 3, 3]), 400, "Incorrect answer for dice = [4, 4, 4, 3, 3]");
    });

    it("should value this mixed set correctly", function () {
        assert.strictEqual(score([2, 4, 4, 5, 4]), 450, "Incorrect answer for dice = [2, 4, 4, 5, 4]");
    });
});

/**
 * PaginationHelper
 *
*/

// Simple solution

class PaginationHelper {
    constructor(collection, itemsPerPage) {
        this.collection = collection
        this.itemsPerPage = itemsPerPage
    }
    itemCount() {
        return this.collection.length
    }
    pageCount() {
        return Math.ceil(this.collection.length / this.itemsPerPage)
    }
    pageItemCount(pageIndex) {

        if (pageIndex === this.pageCount() - 1 && this.pageCount() > 0) {
            return this.itemCount() - ((this.pageCount() - 1) * this.itemsPerPage)
        } else if (pageIndex < this.pageCount() - 1 && pageIndex >= 0) {
            return this.itemsPerPage
        } else {
            return -1
        }
    }
    pageIndex(itemIndex) {
        if (itemIndex > this.itemCount() - 1 || itemIndex < 0) {
            return -1
        } else {
            return Math.floor(itemIndex / this.itemsPerPage)
        }
    }
}



// Tests
describe("PaginationHelper", () => {


    function doTest(instance, methodName, expected, ...args) {
        const actual = instance[methodName](...args);
        assert.strictEqual(actual, expected, `for ${methodName}(${args.join(', ')})`);
    }

    it("sample test : 24 items with 10 per page", () => {
        const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        const helper = new PaginationHelper(collection, 10)

        doTest(helper, 'pageCount', 3);
        doTest(helper, 'itemCount', 24);

        doTest(helper, 'pageItemCount', 10, 1);
        doTest(helper, 'pageItemCount', 4, 2);
        doTest(helper, 'pageItemCount', -1, 3);
        doTest(helper, 'pageIndex', -1, 40);

        doTest(helper, 'pageIndex', 2, 22);
        doTest(helper, 'pageIndex', 0, 3);
        doTest(helper, 'pageIndex', 0, 0);
        doTest(helper, 'pageIndex', -1, -1);
        doTest(helper, 'pageIndex', -1, -23);
        doTest(helper, 'pageIndex', -1, -15);
    });

    it('empty collection', () => {
        const empty = new PaginationHelper([], 10);

        doTest(empty, 'pageCount', 0);
        doTest(empty, 'itemCount', 0);
        doTest(empty, 'pageIndex', -1, 0);
        doTest(empty, 'pageItemCount', -1, 0);
    });

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    describe('random tests', () => {
        for (let i = 0; i < 100; i++) {
            const itemCount = randInt(0, 100);
            const itemsPerPage = randInt(1, itemCount * 2);
            const pagesCount = Math.ceil(itemCount / itemsPerPage);

            const helper = new PaginationHelper(Array(itemCount), itemsPerPage);

            it(`for itemCount = ${itemCount} itemsPerPage = ${itemsPerPage}`, function () {
                doTest(helper, 'pageCount', pagesCount);
                doTest(helper, 'itemCount', itemCount);

                for (let i = 0; i < 5; i++) {
                    const pageIndex = randInt(-2, pagesCount + 3);

                    let pageItemCount;
                    if (pageIndex < 0 || pageIndex >= pagesCount)
                        pageItemCount = -1;
                    else if (pageIndex === (pagesCount - 1)) // last page
                        pageItemCount = (itemCount % itemsPerPage) || itemsPerPage;
                    else
                        pageItemCount = itemsPerPage;

                    doTest(helper, 'pageItemCount', pageItemCount, pageIndex);
                }

                for (let i = 0; i < 5; i++) {
                    const itemIndex = randInt(-2, itemCount + 5);
                    const pageIndex = (itemIndex < 0 || itemIndex >= itemCount) ? -1 : Math.floor(itemIndex / itemsPerPage);

                    doTest(helper, 'pageIndex', pageIndex, itemIndex);
                }
            });
        }
    });
});

/**
 * Product of consecutive Fib numbers
 * 714 ---> (21, 34, true)
 * --> since F(8) = 21, F(9) = 34 and 714 = 21 * 34
*/

// Simple solution


function productFib(prod) {
    let a = 1
    let b = 1
    while ((a * b) < prod) {
        let next = a + b
        a = b
        b = next

    }
    return [a, b, a * b === prod]

}

// Tests
describe("Product of consecutive Fib numbers", () => {
    it("Product of consecutive Fib numbers", () => {
        assert.sameOrderedMembers(productFib(4895), [55, 89, true])
        assert.sameOrderedMembers(productFib(5895), [89, 144, false])
        assert.sameOrderedMembers(productFib(74049690), [6765, 10946, true])
        assert.sameOrderedMembers(productFib(84049690), [10946, 17711, false])
        assert.sameOrderedMembers(productFib(193864606), [10946, 17711, true])
        assert.sameOrderedMembers(productFib(447577), [610, 987, false])
        assert.sameOrderedMembers(productFib(602070), [610, 987, true])
    });
});

/**
 * Integers: Recreation One
 * 1, 246, 2, 123, 3, 82, 6, 41 are the divisors of number 246.
 * Squaring these divisors we get: 1, 60516, 4, 15129, 9, 6724, 36, 1681.
 * The sum of these squares is 84100 which is 290 * 290.
 *
*/

// Simple solution
function listSquared(m, n) {
    let start = m
    let finish = n
    const result = []

    function divisor(n) {
        const div = new Set()
        for (let i = 1; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                div.add(i)
                div.add(n / i);
            }

        }
        return [...div]

    }
    for (let i = start; i <= finish; i++) {
        const arr = divisor(i)
        const sum = arr.map(e =>
            Math.pow(e, 2)
        ).reduce((acc, e) => acc + e, 0)
        sum
        if (Number.isInteger(Math.sqrt(sum))) {
            result.push([i, sum])
        }


    }
    return result
}

// Tests
describe('Integers: Recreation One...', function () {
    it("Basic tests", function () {
        assert.deepEqual(listSquared(1, 250), [[1, 1], [42, 2500], [246, 84100]])
        assert.deepEqual(listSquared(42, 250), [[42, 2500], [246, 84100]])
        assert.deepEqual(listSquared(250, 500), [[287, 84100]])
        assert.deepEqual(listSquared(300, 600), [])
        assert.deepEqual(listSquared(600, 1500), [[728, 722500], [1434, 2856100]])
        assert.deepEqual(listSquared(1500, 1800), [[1673, 2856100]])
        assert.deepEqual(listSquared(1800, 2000), [[1880, 4884100]])
        assert.deepEqual(listSquared(2000, 2200), [])
        assert.deepEqual(listSquared(2200, 5000), [[4264, 24304900]])
        assert.deepEqual(listSquared(5000, 10000), [[6237, 45024100], [9799, 96079204], [9855, 113635600]])
    })

    it("Random tests", function () {
        function randint(a, b) {
            return Math.floor(Math.random() * (b - a + 1) + a);
        }

        function solAux130412(n) {
            let s = 0;
            let nf = 0;
            let res = [];
            for (let i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
                if (n % i === 0) {
                    s += i * i;
                    nf = n / i;
                    if (nf !== i)
                        s += nf * nf;
                }
            if (Math.pow(~~Math.sqrt(s), 2) === s) {
                res.push(n);
                res.push(s);
                return res;
            } else return null;
        }

        function solution130412(m, n) {
            let res = [];
            for (let i = m; i <= n; i++) {
                let r = solAux130412(i);
                if (r !== null) {
                    res.push(r);
                }
            }
            return res;
        }

        for (let i = 0; i < 50; i++) {
            let m = randint(200, 1000);
            let n = randint(1100, 8000);
            let exp = solution130412(m, n)
            assert.deepEqual(listSquared(m, n), exp)
        }
    })
})
/**
 * Best travel
 * ts = [50, 55, 56, 57, 58] choose_best_sum(163, 3, ts) -> 163
 * With list ls and 3 towns to visit they can make a choice between: [50,55,57],[50,55,58],[50,55,60],[50,57,58],[50,57,60],[50,58,60],[55,57,58],[55,57,60],[55,58,60],[57,58,60].
 * The sums of distances are then: 162, 163, 165, 165, 167, 168, 170, 172, 173, 175.
*/

// Simple solution

function chooseBestSum(t, k, ls) {
    function combinations(arr, k) {
        if (k === 0) return [[]];
        if (arr.length === 0) return [];

        let [first, ...rest] = arr;
        let withFirst = combinations(rest, k - 1).map(comb => [first, ...comb]);
        let withoutFirst = combinations(rest, k);

        return [...withFirst, ...withoutFirst];
    }

    let possibleSums = combinations(ls, k)
        .map(comb => comb.reduce((sum, val) => sum + val, 0))
        .filter(sum => sum <= t);

    return possibleSums.length ? Math.max(...possibleSums) : null;
}

// Tests
describe("Best travel", function () {
    it("Basic tests ", function () {
        let ts = [50, 55, 56, 57, 58];
        assert.strictEqual(chooseBestSum(163, 3, ts), 163)
        ts = [50]
        assert.strictEqual(chooseBestSum(163, 3, ts), null)
        ts = [91, 74, 73, 85, 73, 81, 87]
        assert.strictEqual(chooseBestSum(230, 3, ts), 228)
        assert.strictEqual(chooseBestSum(331, 2, ts), 178)
        assert.strictEqual(chooseBestSum(331, 4, ts), 331)
        assert.strictEqual(chooseBestSum(331, 5, ts), null)
        assert.strictEqual(chooseBestSum(331, 1, ts), 91)
        assert.strictEqual(chooseBestSum(700, 6, ts), 491)
        let xs = [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333, 144, 50, 132, 123, 34, 89];
        assert.strictEqual(chooseBestSum(230, 4, xs), 230)
        assert.strictEqual(chooseBestSum(430, 5, xs), 430)
        assert.strictEqual(chooseBestSum(430, 8, xs), null)
        assert.strictEqual(chooseBestSum(880, 8, xs), 876)
        assert.strictEqual(chooseBestSum(2430, 15, xs), 1287)
        assert.strictEqual(chooseBestSum(100, 2, xs), 100)
        assert.strictEqual(chooseBestSum(276, 3, xs), 276)
        assert.strictEqual(chooseBestSum(3760, 17, xs), 3654)
        assert.strictEqual(chooseBestSum(3760, 40, xs), null)
        assert.strictEqual(chooseBestSum(50, 1, xs), 50)
        assert.strictEqual(chooseBestSum(1000, 18, xs), null)
        xs = [100, 64, 123, 2333, 144, 50, 132, 123, 34, 89]
        assert.strictEqual(chooseBestSum(230, 4, xs), null)
        assert.strictEqual(chooseBestSum(230, 2, xs), 223)
        assert.strictEqual(chooseBestSum(2333, 1, xs), 2333)
        assert.strictEqual(chooseBestSum(2333, 8, xs), 825)
        xs = [1000, 640, 1230, 2333, 1440, 500, 1320, 1230, 340, 890, 732, 1346]
        assert.strictEqual(chooseBestSum(2300, 4, xs), 2212)
        assert.strictEqual(chooseBestSum(2300, 5, xs), null)
        assert.strictEqual(chooseBestSum(2332, 3, xs), 2326)
        assert.strictEqual(chooseBestSum(23331, 8, xs), 10789)
        assert.strictEqual(chooseBestSum(331, 2, xs), null)
    })
})

/**
 * Gap in Primes,
 *
*/

// Simple solution


function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function gap(g, m, n) {
    let prevPrime = null;

    for (let i = m; i <= n; i++) {
        if (isPrime(i)) {
            if (prevPrime !== null && i - prevPrime === g) {
                return [prevPrime, i];
            }
            prevPrime = i;
        }
    }

    return null;
}


// Tests
describe("Gap", function () {
    it("Basic tests", function () {
        assert.deepEqual(gap(2, 100, 110), [101, 103]);
        assert.deepEqual(gap(4, 100, 110), [103, 107]);
        assert.deepEqual(gap(6, 100, 110), null);
        assert.deepEqual(gap(8, 300, 400), [359, 367]);
        assert.deepEqual(gap(10, 300, 400), [337, 347]);
    })
})

/**
 * groupAnagrams
 *
*/

// Simple solution

function groupAnagrams(params) {
    const map = new Map()
    for (let i = 0; i < params.length; i++) {
        const wordInArr = params[i].split("").sort().join('');
        if (map.has(wordInArr)) {
            map.get(wordInArr).push(params[i])

        } else {
            map.set(wordInArr, [params[i]])
        }

    }
    return Array.from(map.values())
}


// Tests
describe("groupAnagrams", function () {
    it("Basic tests", function () {
        assert.deepEqual(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]), [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]);
    })
})

/**
 * repeatCount
 *
*/

// Simple solution

function repeatCount(str) {
    const arr = []
    let obj = {}
    for (let i = 0; i < str.length; i++) {
        let curr = str[i]
        let next = str[i + 1]
        if (obj[curr]) {
            obj[curr] += 1
        }
        if (!obj[curr]) {
            obj[curr] = 1
        }
        if (curr === next) {
            continue
        } else {
            arr.push(obj)
            obj = {}
        }
    }
    return arr
}

// Best solution
function repeatCount2(str) {
    const result = [];
    let count = 1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result.push({ [str[i]]: count });
            count = 1;
        }
    }
    return result;
}


// Tests
describe("repeatCount", function () {
    it("Basic tests", function () {
        assert.deepEqual(repeatCount("aaaabbbcca"), [{ a: 4 }, { b: 3 }, { c: 2 }, { a: 1 }]);
        assert.deepEqual(repeatCount2("aaaabbbcca"), [{ a: 4 }, { b: 3 }, { c: 2 }, { a: 1 }]);
    })
})

/**
 * groupPalindromes
 *
 */

// Simple solution

function groupPalindromes(words) {
    const map = new Map();
    map.set("palindromes", []);
    map.set("others", []);

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const reversed = word.split("").reverse().join("");
        
        if (word === reversed) {
            map.get("palindromes").push(word);
        } else {
            map.get("others").push(word);
        }
    }

    return [map.get("palindromes"), map.get("others")];
}

// Tests
describe("groupPalindromes", function () {
    it("Basic tests", function () {
        assert.deepEqual(
            groupPalindromes(["madam", "hello", "racecar", "world", "level"]),
            [["madam", "racecar", "level"], ["hello", "world"]]
        );

        assert.deepEqual(
            groupPalindromes(["abc", "def", "ghi"]),
            [[], ["abc", "def", "ghi"]]
        );

        assert.deepEqual(
            groupPalindromes(["wow", "noon", "radar", "civic"]),
            [["wow", "noon", "radar", "civic"], []]
        );
    });
});

/**
 * Tic-Tac-Toe Checker
 * Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty, 1 if it is an "X", or 2 if it is an "O", like so:
*/

// Simple solution
function isSolved(board) {
    for (let i = 0; i < 3; i++) {

        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
        }
    }
    

    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }
    
  
    for (let row of board) {
        if (row.includes(0)) {
            return -1;
        }
    }
    
    return 0;
}



// Tests
describe("Tic-Tac-Toe Checker", () => {
    it("test", () => {
      assert.strictEqual(isSolved([[0,0,1],
                                   [0,1,2],
                                   [2,1,0]]), -1);
    });
  });