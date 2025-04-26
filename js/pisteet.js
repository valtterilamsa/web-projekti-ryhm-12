function getTotalScore() {
    let totalScore = 0;

    const games = ['peli1', 'peli2', 'peli3', 'peli4', 'peli5', 'peli6'];

    games.forEach(game => {
        const score = parseInt(localStorage.getItem(game + '_score') || 0);
        totalScore += score;
    });

    return totalScore;
}

document.getElementById('total-score').textContent = `${getTotalScore()} / 50`;
