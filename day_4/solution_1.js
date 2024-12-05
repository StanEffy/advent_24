const fs = require('fs');
const path = require('path');

function parseTextFileToArray(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
    
       return fileContent
    } catch (error) {
        console.error('Error reading the file:', error.message);
        return null;
    }
}

const inputFilePath = path.join(__dirname, 'input.txt');

function countXMAS(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    const target = "XMAS";
    const directions = [
        [0, 1],   // right
        [1, 0],   // down
        [1, 1],   // diagonal down-right
        [-1, 1],  // diagonal up-right
        [0, -1],  // left
        [-1, 0],  // up
        [-1, -1], // diagonal up-left
        [1, -1]   // diagonal down-left
    ];

    function checkDirection(row, col, dx, dy) {
        if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
        
        for (let i = 0; i < target.length; i++) {
            const newRow = row + (dx * i);
            const newCol = col + (dy * i);
            
            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
                return false;
            }
            
            if (grid[newRow][newCol] !== target[i]) {
                return false;
            }
        }
        return true;
    }

    // Check every position as a potential starting point
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Only check if current position is 'X'
            if (grid[row][col] === 'X') {
                // Check all directions
                for (const [dx, dy] of directions) {
                    if (checkDirection(row, col, dx, dy)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}

function parseInput(input) {
    return input.trim().split('\n').map(line => line.trim().split(''));
}
const result = parseInput(parseTextFileToArray(inputFilePath));

console.log(countXMAS(result));
