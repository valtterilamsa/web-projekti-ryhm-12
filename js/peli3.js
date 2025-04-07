const animals = ['kana', 'lehmä', 'possu', 'lammas'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeLeft = 20;

const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');
const startButton = document.getElementById('start'); 

restartButton.style.display = 'none';

function createCards() {
  const duplicated = [...animals, ...animals];
  cards = duplicated.sort(() => 0.5 - Math.random());

  gameBoard.innerHTML = '';

  cards.forEach((animal) => {
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

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.animal === card2.dataset.animal) {
    matchedPairs++;
    scoreDisplay.textContent = `Pisteet: ${matchedPairs}`;
    flippedCards = [];

    if (matchedPairs === animals.length) {
      endGame(true);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
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

function endGame(won) {
  clearInterval(timer);
  const message = won
    ? 'Onneksi olkoon! Kaikki parit löytyi!'
    : 'Aika loppui! Yritä uudestaan!';
  messageDisplay.textContent = message;

  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => card.removeEventListener('click', () => flipCard(card)));

  restartButton.style.display = 'inline-block';
}

function restartGame() {
  matchedPairs = 0;
  flippedCards = [];
  timeLeft = 20;
  timerDisplay.style.color = 'black';
  scoreDisplay.textContent = 'Pisteet: 0';
  messageDisplay.textContent = '';
  createCards();
  clearInterval(timer);

  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => card.classList.add('flipped'));

  setTimeout(() => {
    allCards.forEach(card => card.classList.remove('flipped'));
    startTimer();
  }, 2000);
}

startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  restartButton.style.display = 'inline-block'; 
  restartGame();
});

restartButton.addEventListener('click', restartGame);
