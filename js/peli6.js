const questions = [
    { question: 'Apinat osaavat nauraa aivan kuten ihmiset.', answer: true },
    { question: 'Tiikeri osaa vaihtaa väriä naamioituakseen viidakossa.', answer: false },
    { question: 'Laiskiaiset liikkuvat niin hitaasti, että sammal voi kasvaa niiden selkään.', answer: true },
    { question: 'Papukaijat voivat oppia puhumaan ihmisten sanoja.', answer: true },
    { question: 'Leijonat elävät viidakossa.', answer: false },
    { question: 'Käärmeet voivat sulkea silmänsä nukkuessaan.', answer: false },
    { question: 'Joillakin sammakoilla on niin kirkkaat värit, että ne varoittavat olevansa myrkyllisiä.', answer: true },
    { question: 'Viidakon elefantti voi hypätä ilmaan, jos se säikähtää.', answer: false },
    { question: 'Jaguarit osaavat uida ja ne tykkäävät vedestä.', answer: true },
    { question: 'Muurahaiset viidakossa voivat rakentaa siltoja omilla kehoillaan.', answer: true }
];

let remaining = [...questions];
let count = 0;
let points = 0;
let currentQuestion = null;

function nextQuestion() {
    document.getElementById('start').style.display = "none";
    document.getElementById('questions').style.display = "block";
    document.getElementById('answerT').style.display = "inline-block";
    document.getElementById('answerF').style.display = "inline-block";
    document.getElementById('reset').style.display = "none";

    if (count >= 10 || remaining.length === 0) {
        endGame();
        return;
    }

    const index = Math.floor(Math.random() * remaining.length);
    currentQuestion = remaining.splice(index, 1)[0];

    document.getElementById('quest').innerText = currentQuestion.question;
    document.getElementById('points').innerText = `Pisteet: ${points}`;
    document.getElementById('count').innerText = `Kysymys ${count + 1} / 10`;

    count++;
}

function answer(userAnswer) {
    if (currentQuestion && userAnswer === currentQuestion.answer) {
        points++;
    }

    if (count >= 10) {
        endGame();
    } else {
        nextQuestion();
    }
}

function endGame() {
    document.getElementById('questions').style.display = "none";
    document.getElementById('answerT').style.display = "none";
    document.getElementById('answerF').style.display = "none";

    document.getElementById('points').innerText = `Peli päättyi! Sait ${points} / 10 pistettä.`;
    document.getElementById('count').style.display = "none";

    saveScore(points);

    document.getElementById('reset').style.display = "block";
}

function saveScore(score) {
    localStorage.setItem('peli6_score', score);
}
const score = 10;
saveScore(score)

function restart() {
    points = 0;
    count = 0;
    remaining = [...questions];
    currentQuestion = null;

    document.getElementById('reset').style.display = "none";
    document.getElementById('points').innerText = `Pisteet: ${points}`;
    document.getElementById('count').innerText = ``;
    document.getElementById('winner').style.display = "none";
    document.getElementById('looser').style.display = "none";
    document.getElementById('start').style.display = "inline-block";
}