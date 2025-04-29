const buttonContainer = document.getElementById('button-container');
const resetButton = document.createElement('button');
resetButton.textContent = 'Nollaa pisteet';
resetButton.classList.add('reset-button');
resetButton.onclick = () => {
    localStorage.removeItem('totalScores');
    updateTotalScore();
};
buttonContainer.appendChild(resetButton);



function updateTotalScore() {
    const totalScoreElement = document.getElementById('total-score');

    let previousScores = JSON.parse(localStorage.getItem('totalScores')) || [];

    if (previousScores.length === 0) {
        totalScoreElement.textContent = "0/25";
    } else {
        const totalScore = previousScores.reduce((sum, score) => sum + score, 0);

        totalScoreElement.textContent = `${totalScore}/${previousScores.length * 25}`;
    }
}

window.onload = function() {
    updateTotalScore();
}
