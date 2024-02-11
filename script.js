const maze = [
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
    ['*', ' ', '*', ' ', '*', ' ', '*', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', '*', ' ', ' ', ' ', '*', ' ', '*', '*', '*', ' ', '*'],
    ['*', ' ', ' ', 'S', '*', '*', '*', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', '*', ' ', ' ', ' ', ' ', ' ', '*', '*', '*', ' ', '*'],
    ['*', ' ', '*', ' ', '*', '*', '*', ' ', '*', ' ', ' ', ' ', '*'],
    ['*', ' ', '*', ' ', '*', ' ', ' ', ' ', '*', '*', '*', ' ', '*'],
    ['*', ' ', '*', ' ', '*', '*', '*', ' ', '*', ' ', '*', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', 'G', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
];

function pathFinder(maze) {
    const start = findStart(maze);
    const goal = findGoal(maze);
    const visited = new Set();

    function dfs(row, col, path) {
        if (row < 0 ||
            row >= maze.length ||
            col < 0 ||
            col >= maze[0].length || //outofbound check
            maze[row][col] === '*' || // mur check
            visited.has(`${row},${col}`)
        ) {
            return false;
        }

        path.push([row, col]);
        visited.add(`${row},${col}`);

        if (row === goal[0] && col === goal[1]) {
            return true;
        }

        if (dfs(row - 1, col, path) || //op
            dfs(row + 1, col, path) || //ned
            dfs(row, col + 1, path) || //højre
            dfs(row, col - 1, path) //venstre
        ) {
            return true;
        }

        path.pop();
        return false;
    }

    const path = [];
    dfs(start[0], start[1], path);

    return path;
}

function findStart(maze) {
    for (let i = 0; i < maze.length; i++) {
        for (let ii = 0; ii < maze[i].length; ii++) {
            if (maze[i][ii] === 'S') {
                return [i, ii];
            }
        }
    }
    return null;
}

function findGoal(maze) {
    for (let i = 0; i < maze.length; i++) {
        for (let ii = 0; ii < maze[i].length; ii++) {
            if (maze[i][ii] === 'G') {
                return [i, ii];
            }
        }
    }
    return null;
}

function printMazeWithSolution(maze, path) {
    const mazeContainer = document.getElementById('mazeContainer');
    const mazeHTML = maze.map((row, rowIndex) => {
        const rowHTML = row.map((cell, colIndex) => {
            const coordinates = `(${rowIndex},${colIndex})`;
            if (path.some(coords => coords[0] === rowIndex && coords[1] === colIndex)) {
                return `<span class="cell path">${coordinates}</span>`;
            } else if (cell === '*') {
                return `<span class="cell wall">${coordinates}</span>`;
            } else {
                return `<span class="cell">${coordinates}</span>`;
            }
        }).join('');
        return rowHTML;
    }).join('<br>');
    mazeContainer.innerHTML = `<div class="maze">${mazeHTML}</div>`;
}

const solutionPath = pathFinder(maze);
printMazeWithSolution(maze, solutionPath);