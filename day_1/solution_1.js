const fs = require('fs');
const path = require('path');

function parseTextFileToArrays(filePath) {
    try {
        // Read the file synchronously 
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Split the content into lines
        const lines = fileContent.trim().split('\n');
        
        // Create two arrays to store the parsed numbers
        const leftArray = [];
        const rightArray = [];
        
        // Iterate through each line and split into left and right numbers
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

const leftSet = new Set(leftArray)

const obj = {}

rightArray.forEach((n) => {
    if(leftSet.has(n)){
        obj[n] ? obj[n]++ : obj[n] = 1
    }
})

let sum = 0

for( const [key, val] of Object.entries(obj)){
        sum += +key * val
}
console.log(sum)