const fs = require('fs');
const path = require('path');

function parseTextFileToArrays(filePath) {
    try {
        // Read the file synchronously 
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Split the content into lines
        const lines = fileContent.trim().split('\n');        

        const result = []
       
        // Iterate through each line and split into left and right numbers
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

const getDirection = (num1, num2) => num1 > num2 ? 'asc' : 'desc'

const isSafe = (arr) => {
    let isSafe = true;

    let direction = getDirection(arr[0], arr[1])

    if(direction === 'asc'){        
        for(let i = 0; i < arr.length - 1; i++){
            const diff = arr[i] - arr[i+1]
            
            if(diff <= 0 || diff > 3){
                isSafe = false
            }
        }
    } else {
         for(let i = 0; i < arr.length - 1; i++){
            const diff = arr[i + 1] - arr[i]
            console.log(diff);
            
            if(diff <= 0 ||  diff > 3){
                isSafe = false
            }
        }
    }
    if(isSafe){
        safeReportsAmount++
    }

}

result.forEach(arr => isSafe(arr))

console.log(safeReportsAmount);