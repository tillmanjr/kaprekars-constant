// Kaprekar's constant
// Named after the Indian mathematician D.R. Kaprekar.
// 
// The number 6174, also known as Kaprekar's constant,
//   is a fascinating number that arises when applying
//   a specific mathematical operation to any four-digit 
//   number with at least two distinct digits, 
//   repeatedly leading to 6174.
// Starting with the digits of any 4 digit number 
//   1. create two new numbers:
//   2. from the digits sorted in descending order of value, ref DESC
//   3. from the digits sorted in descending order of value, ref ASC
//   4. Subtract ASC from DESC to generate a new 4 digit number 
//   5. Repeat 1-4 until the digits of DESC, ASC, and the new number are the same
/** @type {number}  Kapreskar's Constant */
var KaprekarsConstantValue = 6174;
/** @type {string} KaprekarsConstantValue as a string */
var KaprekarsConstantString = KaprekarsConstantValue.toString();
/**
 *  For the digits of the passed value calculate the difference of
 *    the digits sorted in descending order and
 *    the digits sorted in ascending order
 * Returns an object
 *  {
 *      value,       // original value
 *      ascValue,    // orginal value with the digits sorted ascending
 *      descValue,   // orginal value with the digits sorted descending
 *      difference   // result of descValue - ascValue
 *  }
 * @param {number} value: integer where >= 1000 && <= 9999
 * @return {OrdinalDifferenceResultType}
 */
function calculateOrdinalDifference(value) {
    if (value < 1000 || value > 9999) {
        throw new Error('Value must be a four-digit number');
    }
    var digits = value
        .toString()
        .split('')
        .map(Number);
    var asc = digits
        .slice()
        .sort(function (a, b) { return a - b; })
        .join('');
    var desc = digits
        .slice()
        .sort(function (a, b) { return b - a; })
        .join('');
    var ascValue = parseInt(asc, 10);
    var descValue = parseInt(desc, 10);
    var difference = descValue - ascValue;
    return {
        value: value,
        ascValue: ascValue,
        descValue: descValue,
        difference: difference
    };
}
/**
 * Converts an integer to a string.
 * Return value will be left padded with '0'
 *   to ensure minimum of 4 char length
 *
 * @param {number} value: integer
 * @return {string} .length >= 4
 */
function ensure4DigitString(value) {
    var valueStr = value.toString();
    while (valueStr.length < 4) {
        valueStr = '0' + valueStr;
    }
    return valueStr;
}
/**
 * For one Kapersky Operation return the individual operations
 *   as an array of formatted strings
 *
 * @param {OrdinalDifferenceResultType} param0
 * @return {string[]}
 */
function oneResult(_a) {
    var value = _a.value, descValue = _a.descValue, ascValue = _a.ascValue, difference = _a.difference;
    return [
        "".concat(value),
        "       ".concat(ensure4DigitString(descValue)),
        "     - ".concat(ensure4DigitString(ascValue)),
        "     = ".concat(ensure4DigitString(difference))
    ];
}
/**
 * Determine whether the individual digits of two integers are equivalent.
 *   e.g.  lhs   rhs    returns
 *         1234  4321   true
 *         1234  1233   false
 *
 * @param {number} lhs: integer
 * @param {number} rhs: integer
 * @return {boolean}
 */
function haveSameDigits(lhs, rhs) {
    var lhsDigits = lhs
        .toString()
        .split('')
        .map(Number)
        .slice()
        .sort(function (a, b) { return a - b; })
        .join('');
    var rhsDigits = rhs
        .toString()
        .split('')
        .map(Number)
        .slice()
        .sort(function (a, b) { return a - b; })
        .join('');
    return lhsDigits === rhsDigits; // use compare instead?
}
/**
 * Starting with startValue repeat Operation until Kapersky's constant is resolved.
 * returns an array of strings containing details of each Operation in order of execution
 *
 * @param {number} startValue: integer
 * @return {string[]}
 */
function seekKaprekarsConstant(startValue) {
    var value = startValue;
    var output = ['   Begin   '];
    var found = false;
    var safety = 30;
    while (!found) {
        if (safety < 1) {
            output.push('Seek failed to terminate');
            break;
        }
        safety = safety - 1;
        var result = calculateOrdinalDifference(value);
        var oneOutput = oneResult(result);
        output.push.apply(output, oneOutput);
        found = haveSameDigits(value, result.difference);
        value = result.difference;
    }
    output.push('___________', '');
    return output;
}
/**
 * Print line to console
 *
 * @param {string} line
 */
var printLine = function (line) { return console.log(line); };
function go(values) {
    if (values === void 0) { values = []; }
    values
        .map(seekKaprekarsConstant)
        .flat()
        .forEach(printLine);
}
var testValues = [1205, 6174, 1234, 6598, 5432, 4321, 8835];
go(testValues);
