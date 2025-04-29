const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const attemptsDisplay = document.getElementById('attempts');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');

const maze = [
  "WWWWWWWWWW",
  "W    W   W",
  "W WW W W W",
  "W W    W W",
  "W WWWWWW W",
  "W        W",
  "W WWWW WW ",
  "W W      W",
  "W   WWWW W",
  "WWWWWWWWWW",
];

let mousePosition = { x: 1, y: 1 };
let cheesePosition = { x: 8, y: 8 };
let score= 0;
let attempts = 2;

function saveScore(score) {
  localStorage.setItem('peli5_score', score);
}

function loadScore() {
  const savedScore = localStorage.getItem('peli5_score');
  return savedScore ? parseInt(savedScore) : 0;
}


function createBoard() {
  board.innerHTML = '';
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (maze[y][x] === 'W') {
        cell.classList.add('wall');
      }
      if (x === mousePosition.x && y === mousePosition.y) {
        cell.classList.add('mouse');
      }
      if (x === cheesePosition.x && y === cheesePosition.y) {
        cell.classList.add('cheese');
      }
      board.appendChild(cell);
    }
  }
}

function moveMouse(dx, dy) {
  const newX = mousePosition.x + dx;
  const newY = mousePosition.y + dy;
  if (maze[newY][newX] !== 'W') {
    mousePosition = { x: newX, y: newY };
    checkWin();
    createBoard();
  }
}

function checkWin() {
  if (mousePosition.x === cheesePosition.x && mousePosition.y === cheesePosition.y) {
    score++;
    saveScore(score); 
    resetPositions();
    updateScoreAndAttempts();
  }
}

function resetPositions() {
  mousePosition = { x: 1, y: 1 };
  cheesePosition = { x: 8, y: 8 };
}

function updateScoreAndAttempts() {
  scoreDisplay.textContent = `Pisteet: ${score}`;
  attemptsDisplay.textContent = `Yritykset jäljellä: ${attempts}`;
}

document.addEventListener('keydown', (e) => {
  if (attempts <= 0) {
    alert('Peli ohi! Ei yrityksiä jäljellä.');
    return;
  }

  switch (e.key) {
    case 'ArrowUp':
      moveMouse(0, -1);
      break;
    case 'ArrowDown':
      moveMouse(0, 1);
      break;
    case 'ArrowLeft':
      moveMouse(-1, 0);
      break;
    case 'ArrowRight':
      moveMouse(1, 0);
      break;
  }
});

startButton.addEventListener('click', () => {
  resetPositions();
  createBoard();
});

restartButton.addEventListener('click', () => {
  score = 0;
  attempts = 2;
  saveScore(score); 
  resetPositions();
  updateScoreAndAttempts();
  createBoard();
});

Startcame();
function saveScore(score) {
    localStorage.setItem('peli5_score', score);
}
const peli5_score = 10;
saveScore(score)