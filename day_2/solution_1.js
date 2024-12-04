const fs = require('fs');
const path = require('path');

function parseTextFileToArrays(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        
        const lines = fileContent.trim().split('\n');        

        const result = []
       
       
        lines.forEach(line => {
            const arr = line.trim().split(" ").map(Number);
            
            result.push(arr)
        });
        
        return result;
    } catch (error) {
        console.error('Error reading the file:', error.message);
        return null;
    }
}

const inputFilePath = path.join(__dirname, 'input.txt');

const result = parseTextFileToArrays(inputFilePath);

let safeReportsAmount = 0

const isSafe = (arr) => {
    const inc = arr[1] > arr[0];
    if (inc) {
        for (let i = 1; i < arr.length; i++) {
            const diff = arr[i] - arr[i - 1];
            if (!(diff >= 1 && diff <= 3)) {
                return false;
            }
        }
        return true;
    } else {
        for (let i = 1; i < arr.length; i++) {
            const diff = arr[i] - arr[i - 1];
            if (!(diff >= -3 && diff <= -1)) {
                return false;
            }
        }
        return true;
    }
}
function isReallySafe(nums) {
    if (isSafe(nums)) {
        return true;
    }
    for (let i = 0; i < nums.length; i++) {
        const modifiedNums = [...nums.slice(0, i), ...nums.slice(i + 1)];
        if (isSafe(modifiedNums)) {
            return true;
        }
    }
    return false;
}


result.forEach(arr => {
    safeReportsAmount += isReallySafe(arr) ? 1 : 0
})

console.log(safeReportsAmount);
