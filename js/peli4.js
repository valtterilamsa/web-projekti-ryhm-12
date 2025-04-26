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

const animalContainer = document.getElementById("animal-container");
const soundButtons = document.getElementById("sound-buttons");
const result = document.getElementById("result");

function showAnimal() {
    animalContainer.innerHTML = "";
    soundButtons.innerHTML = "";

    const scoreText = document.createElement("p");
    scoreText.textContent = `Pisteet: ${correctCount} / ${animals.length}`;
    scoreText.style.fontSize = "2em";
    scoreText.style.fontWeight = "bold";
    scoreText.style.marginBottom = "10px"; 
    animalContainer.appendChild(scoreText);

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

        const audio = document.getElementById(a.sound);

        const toggleSoundBtn = document.createElement("button");
        toggleSoundBtn.textContent = "🔊 " + a.name.charAt(0).toUpperCase() + a.name.slice(1);
        toggleSoundBtn.onclick = () => {
            if (audio.paused) {
                animals.forEach(other => {
                    const otherAudio = document.getElementById(other.sound);
                    if (otherAudio !== audio) {
                        otherAudio.pause();
                        otherAudio.currentTime = 0;
                    }
                });

                audio.play();
                toggleSoundBtn.textContent = "⏸️ " + a.name.charAt(0).toUpperCase() + a.name.slice(1);
            } else {
                audio.pause();
                audio.currentTime = 0;
                toggleSoundBtn.textContent = "🔊 " + a.name.charAt(0).toUpperCase() + a.name.slice(1);
            }
        };

        audio.onended = () => {
            toggleSoundBtn.textContent = "🔊 " + a.name.charAt(0).toUpperCase() + a.name.slice(1);
        };

        const answerBtn = document.createElement("button");
        answerBtn.textContent = "Valitse";
        answerBtn.onclick = () => checkAnswer(a.name);

        wrapper.appendChild(toggleSoundBtn);
        wrapper.appendChild(answerBtn);
        soundButtons.appendChild(wrapper);
    });
}

function checkAnswer(selected) {
    const correct = animals[currentIndex].name;
    if (selected === correct) {
        correctCount++;
    }

    setTimeout(() => {
        currentIndex++;
        if (currentIndex < animals.length) {
            showAnimal();
        } else {
            showEndScreen();
        }
    }, 1500);
}

function showEndScreen() {
    animalContainer.innerHTML = ""; 
    soundButtons.innerHTML = ""; 

    const scoreText = document.createElement("p");
    scoreText.textContent = `Sait ${correctCount} / ${animals.length} pistettä!`;
    scoreText.style.fontSize = "28px";
    scoreText.style.margin = "10px";

    const thankYouText = document.createElement("p");
    thankYouText.textContent = "Kiitos pelaamisesta!";
    thankYouText.style.fontSize = "24px";
    thankYouText.style.margin = "10px";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "🔄 Pelaa uudelleen";
    restartBtn.className = "restart-btn";
    restartBtn.onclick = () => restartGame();
    restartBtn.style.marginTop = "20px";

    animalContainer.appendChild(scoreText);
    animalContainer.appendChild(thankYouText);
    animalContainer.appendChild(restartBtn);

    saveScore(correctCount);
}

function saveScore(score) {
    localStorage.setItem('peli4_score', score);
}

function restartGame() {
    currentIndex = 0;
    correctCount = 0;
    animalContainer.innerHTML = "";
    soundButtons.innerHTML = "";
    showAnimal(); 
}

animalContainer.style.position = "relative";
animalContainer.style.marginTop = "-140px";

showAnimal();
