# kaprekars-constant  
Derives Kaprekar's Constant from any 4 digit integer  
  
Originally written in JavaScript which was then translated to TypeScript.  
  
## Kaprekar's constant  
Named after the Indian mathematician D.R. Kaprekar.  
   
The number 6174, also known as Kaprekar's constant, is a fascinating number that always arises when repeatedly applying a specific mathematical operation to any four-digit number with at least two distinct digits.   
  
## To run it:  
### JavaScript  
Clone this repo or simply copy the JavaScript file locally.  
  
Change to appropriate subdirectory  
`cd javascript`   
   
In `KaprekarsConstant.js` edit the test values array to include any integers desired  
`const testValues = [1205, 6174, 1234, 6598, 5432, 4321, 8835]`  
  
Save the file     
  
Run  
`node KaprekarsConstant.js`  
  
### TypeScript  
Clone this repo or simply copy the TypeScript file locally.  
  
Change to appropriate subdirectory  
`cd typescript`   
   
In `KaprekarsConstant.ts` edit the test values array to include any integers desired  
`const testValues:number[] = [1205, 6174, 1234, 6598, 5432, 4321, 8835]`  
  
Save the file     
  
Compile to JavaScript (or run directly with node if you have TypeScript support enabled for node) 
`tsc --lib es2019,dom KaprekarsConstant.ts`  (see __TypeScript --lib parameters__ below)

Run  
`node KaprekarsConstant.js`  

#### TypeScript --lib parameters  
es2019 - JavaScript version emitted by compiler. Required here for use of `<array>.flat()`  
dom - include DOM library. Required here for use of `console.log`  