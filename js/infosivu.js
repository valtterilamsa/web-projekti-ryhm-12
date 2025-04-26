const buttonContainer = document.getElementById('button-container');
const resetButton = document.createElement('button');
resetButton.textContent = 'Nollaa pisteet';
resetButton.classList.add('reset-button');
resetButton.onclick = () => {
    localStorage.removeItem('totalScore');
    updateTotalScore();
};
buttonContainer.appendChild(resetButton);

function updateTotalScore() {
    const totalScoreElement = document.getElementById('total-score');
    const savedScore = localStorage.getItem('totalScore');
    totalScoreElement.textContent = `${savedScore || 0}/25`;
}
