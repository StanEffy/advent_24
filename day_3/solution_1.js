const fs = require('fs');
const path = require('path');

function parseTextFileToArray(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        let mulEnabled = true;
  const results = [];

  const regex = /mul\((-?\d+),(-?\d+)\)|do\(\)|don't\(\)/g;
  
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    if (match[0] === 'do()') {
      mulEnabled = true;
    } else if (match[0] === 'don\'t()') {
      mulEnabled = false;
    } else if (mulEnabled) {
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      results.push(x * y);
    }
  }

  return results.reduce((sum, val) => sum + val, 0);
    } catch (error) {
        console.error('Error reading the file:', error.message);
        return null;
    }
}

const inputFilePath = path.join(__dirname, 'input.txt');

const result = parseTextFileToArray(inputFilePath);

console.log(result);
