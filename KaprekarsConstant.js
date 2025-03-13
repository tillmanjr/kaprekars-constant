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


/** @type {Number}  Kapreskar's Constant */
const KaprekarsConstant = 6174

/** @type {String} Kapreskar's Constant as string */
const KaprekarsConstantStr = KaprekarsConstant.toString()

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
 * @param {Number} value: integer where >= 1000 && <= 9999
 * @return {object}{
 *    value,
 *    ascValue,
 *    descValue,
 *    difference
 * }  
 */
function calculateOrdinalDifference(value) {
    if (value < 1000 || value > 9999) {
        throw new Error('Value must be a four-digit number');
    }
    
    const digits = value
        .toString()
        .split('')
        .map(Number);
    const asc = digits
        .slice()
        .sort((a, b) => a - b)
        .join('')
    const desc = digits
        .slice()
        .sort((a, b) => b - a)
        .join('')

    const ascValue = parseInt(asc, 10);
    const descValue = parseInt(desc, 10);
    const difference = descValue - ascValue;
    
    return {
        value,
        ascValue,
        descValue,
        difference
    }
}

/**
 * Converts an integer to a string.
 * Return value will be left padded with '0' 
 *   to ensure minimum of 4 char length 
 *
 * @param {Number} value: integer
 * @return {string} .length >= 4 
 */
function ensure4DigitString(value) {
    let valueStr = value.toString()
    while (valueStr.length < 4) {
        valueStr = '0' + valueStr
    }
    return valueStr
}

/**
 * For one Kapersky Operation return the individual operations
 *   as an array of formatted strings 
 *
 * @param {Object} {
 *         value,
 *         descValue,
 *         ascValue,
 *         difference
 *     }
 * @return {string[]} 
 */
function oneResult({
        value,
        descValue,
        ascValue,
        difference
    }) {
    return [
        `${value}`,
        `       ${ensure4DigitString(descValue)}`,
        `     - ${ensure4DigitString(ascValue)}`,
        `     = ${ensure4DigitString(difference)}`
    ]
}


/**
 * Determine whether the individual digits of two integers are equivalent.
 *   e.g.  lhs   rhs    returns
 *         1234  4321   true
 *         1234  1233   false
 *
 * @param {Number} lhs: integer
 * @param {Number} rhs: integer
 * @return {Boolean} 
 */
function haveSameDigits (lhs, rhs) {
    const lhsDigits = lhs
        .toString()
        .split('')
        .map(Number)
        .slice()
        .sort((a, b) => a - b)
        .join('')

    const rhsDigits = rhs
        .toString()
        .split('')
        .map(Number)
        .slice()
        .sort((a, b) => a - b)
        .join('')

    return lhsDigits === rhsDigits
}


/**
 * Starting with startValue repeat Operation until Kapersky's constant is resolved.
 * returns an array of strings containing details of each Operation in order of execution
 *
 * @param {Number} startValue: integer
 * @return {string[]} 
 */
function seekKaprekarsConstant(startValue) {
    let value = startValue
    let output = ['   Begin   ']
    let found = false
    let safety = 30
    while (!found) {
        if (safety < 1) {
            output.push('Seek failed to terminate')
            break
        }
        safety = safety - 1

        const result = calculateOrdinalDifference(value);
        const oneOutput = oneResult(result)
        output.push(...oneOutput)

        found = haveSameDigits(value, result.difference)
        value = result.difference;  
    }
    output.push('___________', '')
    return output
}

/**
 * Print line to console
 *
 * @param {string} line
 */
const printLine = (line) => console.log(line)

function go(values = []) {
    values
        .map(seekKaprekarsConstant)
        .flat()
        .forEach(printLine)
}


const testValues = [1205, 6174, 1234, 6598, 5432, 4321, 8835]
go(testValues)
