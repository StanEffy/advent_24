const fs = require('fs');
const path = require('path');

function parseTextFileToArrays(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        const lines = fileContent.trim().split('\n');
        
        const leftArray = [];
        const rightArray = [];
        
        lines.forEach(line => {
            const [leftNum, rightNum] = line.trim().split(/\s+/).map(Number);
            console.log(leftNum);
            
            leftArray.push(leftNum);
            rightArray.push(rightNum);
        });
        
        return { leftArray, rightArray };
    } catch (error) {
        console.error('Error reading the file:', error.message);
        return null;
    }
}

const inputFilePath = path.join(__dirname, 'input.txt');

const result = parseTextFileToArrays(inputFilePath);

const {leftArray, rightArray} = result;

let leftArraySorted = leftArray.sort((a, b) => a - b)
let rightArraySorted = rightArray.sort((a, b) => a - b)

let sum = 0

console.log(leftArraySorted)

leftArraySorted.forEach((n, i) => {
    sum += Math.abs(+n - +rightArraySorted[i])
})

console.log(sum)