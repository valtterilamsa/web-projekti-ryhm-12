const animals = [
    { name: "leijona", image: "../kuvat/leijona.png", sound: "leijona" },
    { name: "kirahvi", image: "../kuvat/kirahvi.png", sound: "kirahvi" },
    { name: "sarvikuono", image: "../kuvat/sarvikuono.png", sound: "sarvikuono" },
    { name: "elefantti", image: "../kuvat/norsu.png", sound: "elefantti" },
    { name: "seepra", image: "../kuvat/seepra.png", sound: "seepra" },
    { name: "virtahepo", image: "../kuvat/virtahepo.png", sound: "virtahepo" },
];

let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;

const animalContainer = document.getElementById("animal-container");
const soundButtons = document.getElementById("sound-buttons");
const result = document.getElementById("result");
const correctDisplay = document.getElementById("correct");
const wrongDisplay = document.getElementById("wrong");

function showAnimal() {
    animalContainer.innerHTML = "";
    soundButtons.innerHTML = "";
    result.textContent = "";

    const animal = animals[currentIndex];

    const img = document.createElement("img");
    img.src = animal.image;
    img.alt = animal.name;
    img.style.width = "200px";
    img.style.margin = "20px";
    animalContainer.appendChild(img);

    animals.forEach(a => {
        const wrapper = document.createElement("div");
        wrapper.style.margin = "10px";

        const playBtn = document.createElement("button");
        playBtn.innerHTML = "🔊 " + a.name.charAt(0).toUpperCase() + a.name.slice(1);
        playBtn.onclick = () => document.getElementById(a.sound).play();

        const stopBtn = document.createElement("button");
        stopBtn.innerHTML = "⏸️ Lopeta";
        stopBtn.onclick = () => {
            const audio = document.getElementById(a.sound);
            audio.pause();
            audio.currentTime = 0;
        };

        const answerBtn = document.createElement("button");
        answerBtn.textContent = "Valitse";
        answerBtn.onclick = () => checkAnswer(a.name);

        wrapper.appendChild(playBtn);
        wrapper.appendChild(stopBtn);
        wrapper.appendChild(answerBtn);
        soundButtons.appendChild(wrapper);
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "⏭ Seuraava eläin";
    nextButton.onclick = () => goToNext();
    nextButton.style.marginTop = "20px";
    soundButtons.appendChild(nextButton);
}

function checkAnswer(selected) {
    const correct = animals[currentIndex].name;
    if (selected === correct) {
        correctCount++;
        result.textContent = "Oikein! 🎉";
    } else {
        wrongCount++;
        result.textContent = `Väärin 😢 Oikea vastaus oli: ${correct}`;
    }

    correctDisplay.textContent = correctCount;
    wrongDisplay.textContent = wrongCount;

    setTimeout(() => {
        currentIndex++;
        if (currentIndex < animals.length) {
            showAnimal();
        } else {
            showEndScreen();
        }
    }, 1500);
}

function goToNext() {
    currentIndex++;
    if (currentIndex < animals.length) {
        showAnimal();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    animalContainer.innerHTML = `
        <h2>Peli päättyi!</h2>
        <p>Oikeita vastauksia: ${correctCount}</p>
        <p>Vääriä vastauksia: ${wrongCount}</p>
        <p>Kiitos pelaamisesta! 🐾</p>
    `;

    soundButtons.innerHTML = "";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "🔄 Pelaa uudelleen";
    restartBtn.onclick = () => restartGame();
    restartBtn.style.marginTop = "20px";
    soundButtons.appendChild(restartBtn);
}

function restartGame() {
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    correctDisplay.textContent = "0";
    wrongDisplay.textContent = "0";
    showAnimal();
}

showAnimal();
