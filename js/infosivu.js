function addResetButton() {
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "🔄 Nollaa pisteet";
    resetBtn.className = "reset-btn";
    resetBtn.onclick = resetScores;
    document.getElementById('total-score-container').appendChild(resetBtn);
}
