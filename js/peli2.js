let selectedColor = '#FF0000';

const colorButtons = document.querySelectorAll('.color-button');
const colorables = document.querySelectorAll('.colorable');
const resetButton = document.getElementById('reset-button');

colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedColor = button.getAttribute('data-color');
    colorButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

colorables.forEach(elem => {
  elem.addEventListener('click', () => {
    elem.setAttribute('fill', selectedColor);
  });
});

resetButton.addEventListener('click', () => {
  colorables.forEach(elem => {
    elem.setAttribute('fill', '#ffffff');
  });
});

function saveScore(score) {
    localStorage.setItem('peli2_score', score);
}
const score = 10;
saveScore(score)
