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
const KaprekarsConstantValue:number=6174;

/** @type {string} KaprekarsConstantValue as a string */
const KaprekarsConstantString:string = KaprekarsConstantValue.toString();

type OrdinalDifferenceResultType = {
    value: number, // original value
    ascValue: number, // orginal value with the digits sorted ascending
    descValue: number, // orginal value with the digits sorted descending
    difference: number  // result of descValue - ascValue
};

/**
 *  For the digits of the passed value calculate the difference of
 *    the digits sorted in descending order and 
 *    the digits sorted in ascending order
 * Returns OrdinalDifferenceResultType 
 * @param {number} value: integer where >= 1000 && <= 9999
 * @return {OrdinalDifferenceResultType}
 */
function calculateOrdinalDifference(value:number):OrdinalDifferenceResultType {
    if (value < 1000 || value > 9999) {
        throw new Error('Value must be a four-digit number');
    }
    
    const digits:number[] = value
        .toString()
        .split('')
        .map(Number);
    const asc:string = digits
        .slice()
        .sort((a:number, b:number) => a - b)
        .join('');
    const desc:string = digits
        .slice()
        .sort((a:number, b:number) => b - a)
        .join('');

    const ascValue:number = parseInt(asc, 10);
    const descValue:number = parseInt(desc, 10);
    const difference:number = descValue - ascValue;
    
    return {
        value,
        ascValue,
        descValue,
        difference
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
function ensure4DigitString(value:number):string {
    let valueStr:string = value.toString();
    while (valueStr.length < 4) {
        valueStr = '0' + valueStr
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
function oneResult({
    value,
    descValue,
    ascValue,
    difference
}: OrdinalDifferenceResultType): string[] {
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
 * @param {number} lhs: integer
 * @param {number} rhs: integer
 * @return {boolean} 
 */
function haveSameDigits (lhs:number, rhs:number): boolean {
    const lhsDigits:string = lhs
        .toString()
        .split('')
        .map(Number)
        .slice()
        .sort((a, b) => a - b)
        .join('')

    const rhsDigits:string = rhs
        .toString()
        .split('')
        .map(Number)
        .slice()
        .sort((a, b) => a - b)
        .join('')

    return lhsDigits === rhsDigits  // use compare instead?
}

/**
 * Starting with startValue repeat Operation until Kapersky's constant is resolved.
 * returns an array of strings containing details of each Operation in order of execution
 *
 * @param {number} startValue: integer
 * @return {string[]} 
 */
function seekKaprekarsConstant(startValue: number) {
    let value: number = startValue
    let output: string[] = ['   Begin   ']
    let found: boolean = false
    let safety: number = 30
    while (!found) {
        if (safety < 1) {
            output.push('Seek failed to terminate')
            break
        }
        safety = safety - 1

        const result: OrdinalDifferenceResultType = calculateOrdinalDifference(value);
        const oneOutput: string[] = oneResult(result)
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
const printLine = (line:string) => console.log(line)

function go(values:number[] = []) {
    values
        .map(seekKaprekarsConstant)
        .flat()
        .forEach(printLine)
}

const testValues:number[] = [1205, 6174, 1234, 6598, 5432, 4321, 8835]

go(testValues)
