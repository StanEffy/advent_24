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

const getDirection = (num1, num2) => num1 > num2 ? 'asc' :  num1 < num2 ? 'desc' : 'equal'

let asc = 0
let desc = 0

let arrays = []

const isSafe = (arr) => {
    let diffs = []

    for(let i = 0; i < arr.length - 1; i++){
        const diff = arr[i] - arr[i+1]
        diffs.push(diff)
    } 
    
    arrays.push(diffs)

    if(diffs.every(n => n < 0 && n > -4)){
        safeReportsAmount++
    } else if(diffs.every(n => n > 0 && n < 4)){
        safeReportsAmount++
    } else {
        let errors = 0
        let negatives = 0
        let positives = 0
        let equals = 0
        diffs.forEach(d => {
            d > 0 ? positives++ : d < 0 ? negatives++ : equals++
            if(d > 3 || d < -3 || d === 0){
                errors += 1
            }
        })

        

        if(errors < 2) {
            
            let currentError = 0;

            if(negatives > positives){
                
                diffs.forEach(d => {
                    if(d < -3 || d >= 0){
                        currentError += 1
                    }
                })

                if(currentError < 2){
                    safeReportsAmount++
                }
            } else if(
                positives > negatives
            ){
               
                diffs.forEach(d => {
                    if(d > 3 || d <= 0){
                        currentError += 1
                    }
                })

                if(currentError < 2){
                    safeReportsAmount++
                }
            }
            //if(negatives > 0 && poi)
            
        }
        
        
    }
}



result.forEach(arr => isSafe(arr))

console.log(safeReportsAmount);
