function resetScores() {
    const games = ['peli1', 'peli2', 'peli3', 'peli4', 'peli5', 'peli6'];

    games.forEach(game => {
        localStorage.removeItem(game + '_score');
    });

    updateTotalScore();
}


function getTotalScore() {
    let totalScore = 0;
    const games = ['peli1', 'peli2', 'peli3', 'peli4', 'peli5', 'peli6'];

    games.forEach(game => {
        const score = parseInt(localStorage.getItem(game + '_score') || 0);
        totalScore += score;
    });

    return totalScore;
}

function updateTotalScore() {
    const totalScore = getTotalScore();
    document.getElementById('total-score').textContent = `${totalScore} / 50`;
}

function addResetButton() {
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Nollaa pisteet";
    resetBtn.style.marginTop = "20px";
    resetBtn.onclick = resetScores;
    document.getElementById('total-score-container').appendChild(resetBtn);
}


window.onload = () => {
    updateTotalScore();
    addResetButton();
};
