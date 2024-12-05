const fs = require('fs');
const path = require('path');

function parseTextFileToArray(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        const regex = /mul\((-?\d+),(-?\d+)\)/g;
  

        const matches = [];
        
        let match;
        
        while ((match = regex.exec(fileContent)) !== null) {
            matches.push({
            x: parseInt(match[1]),
            y: parseInt(match[2]),
            });
        }
        
        return matches;
    } catch (error) {
        console.error('Error reading the file:', error.message);
        return null;
    }
}

const inputFilePath = path.join(__dirname, 'input.txt');

const result = parseTextFileToArray(inputFilePath);

console.log(result.reduce((prev, cur) => prev += cur.x * cur.y, 0));
