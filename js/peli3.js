const animals = ['kana', 'lehmä', 'possu', 'lammas'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeLeft = 20;
let attemptsLeft;  

const gameBoard       = document.getElementById('game-board');
const timerDisplay    = document.getElementById('timer');
const scoreDisplay    = document.getElementById('score');
const attemptsDisplay = document.getElementById('attempts');
const messageDisplay  = document.getElementById('message');
const restartButton   = document.getElementById('restart');
const startButton     = document.getElementById('start');

restartButton.style.display = 'none';

function createCards() {
  const duplicated = [...animals, ...animals].sort(() => 0.5 - Math.random());
  cards = duplicated;
  gameBoard.innerHTML = '';
  cards.forEach(animal => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.animal = animal;
    card.innerHTML = `<img src="../kuvat/${animal}.png" alt="${animal}" />`;
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) checkMatch();
  }
}

function checkMatch() {
  const [c1, c2] = flippedCards;
  if (c1.dataset.animal === c2.dataset.animal) {
    matchedPairs++;
    scoreDisplay.textContent = `Pisteet: ${matchedPairs}`;
    flippedCards = [];
    if (matchedPairs === animals.length) endGame(true);
  } else {
    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      flippedCards = [];
    }, 800);
  }
}

function startTimer() {
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
      updateTimerDisplay();
      clearInterval(timer);
      endGame(false);
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `Aika: ${timeLeft}`;
  timerDisplay.style.color = timeLeft === 0 ? 'red' : 'black';
}

function updateAttemptsDisplay() {
  attemptsDisplay.textContent = `Yrityksiä jäljellä: ${attemptsLeft}`;
}

function endGame(won) {
  clearInterval(timer);

  const pisteviesti = ` Pisteet: ${matchedPairs}`;
  const baseMsg = won
    ? 'Onneksi olkoon! Kaikki parit löytyi!'
    : 'Aika loppui!';
  messageDisplay.textContent = baseMsg + pisteviesti;

  saveScore(matchedPairs);

  document.querySelectorAll('.card')
    .forEach(card => card.replaceWith(card.cloneNode(true)));

  if (!won) {
    attemptsLeft--;
  }

  if (won && attemptsLeft === 2) {
  
    restartButton.textContent = 'Aloita alusta';
  } else if (!won && attemptsLeft > 0) {
    restartButton.textContent = 'Yritä uudelleen';
    messageDisplay.textContent += ` Sinulla on vielä ${attemptsLeft} yritys jäljellä.`;
  } else {
    restartButton.textContent = 'Aloita alusta';
    if (!won) messageDisplay.textContent += ' Yritykset loppuivat.';
  }

  restartButton.style.display = 'inline-block';
  updateAttemptsDisplay();
}

function restartGame() {

  matchedPairs = 0;
  flippedCards  = [];
  timeLeft      = 20;
  timerDisplay.style.color = 'black';
  scoreDisplay.textContent = 'Pisteet: 0';
  messageDisplay.textContent = '';
  createCards();
  clearInterval(timer);
  updateAttemptsDisplay();

 
  document.querySelectorAll('.card').forEach(c => c.classList.add('flipped'));
  setTimeout(() => {
    document.querySelectorAll('.card').forEach(c => c.classList.remove('flipped'));
    startTimer();
  }, 2000);
}


startButton.addEventListener('click', () => {
  attemptsLeft = 2;                        
  updateAttemptsDisplay();
  startButton.style.display   = 'none';
  restartButton.style.display = 'inline-block';
  restartButton.textContent   = 'Yritä uudelleen';
  restartGame();
});

restartButton.addEventListener('click', () => {
  if (attemptsLeft > 0) {
    restartGame();   
  } else {
    
    matchedPairs = 0;
    timeLeft      = 20;
    scoreDisplay.textContent   = 'Pisteet: 0';
    timerDisplay.textContent   = `Aika: ${timeLeft}`;
    messageDisplay.textContent = '';
    attemptsLeft = 2;
    updateAttemptsDisplay();
    startButton.style.display   = 'inline-block';
    restartButton.style.display = 'none';
  }
});

function saveScore(score) {
  localStorage.setItem('peli3_score', score);
}
