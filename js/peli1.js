const questions =[
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        image: "../kuvat/karhu.jpg",
        answers: [
            { text: "Susi", correct: false},
            { text: "Hirvi", correct: false},
            { text: "Karhu", correct: true},
            { text: "Ahma", correct: false},
        ]
    },
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        image: "../kuvat/hirvi.jpg",
        answers: [
            { text: "Karhu", correct: false},
            { text: "Hirvi", correct: true},
            { text: "Supikoira", correct: false},
            { text: "Kettu", correct: false},
        ]
    },
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        image: "../kuvat/jänis.jpg",
        answers: [
            { text: "Peura", correct: false},
            { text: "Päästäinen", correct: false},
            { text: "Kettu", correct: false},
            { text: "Jänis", correct: true},
        ]
    },
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        image: "../kuvat/peura.jpg",
        answers: [
            { text: "Ahma", correct: false},
            { text: "Susi", correct: false},
            { text: "Peura", correct: true},
            { text: "Saukko", correct: false},
        ]
    },
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        image: "../kuvat/susi.jpg",
        answers: [
            { text: "Susi", correct: true},
            { text: "Pesukarhu", correct: false},
            { text: "Majava", correct: false},
            { text: "Orava", correct: false},
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Seuraava"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

const imageElement = document.getElementById("question-image");
imageElement.src = currentQuestion.image;
imageElement.style.display = "block";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }

    localStorage.setItem('totalScore', score);


    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

    nextButton.scrollIntoView({ behavior: "smooth", block: "center" });
    
    updateTotalScore();
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Sait ${score} pistettä ${questions.length}:stä!`;
    document.getElementById("question-image").style.display = "none";
    nextButton.innerHTML = "Pelaa uudelleen";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

// sources https://www.w3schools.com/ https://www.youtube.com/watch?v=Vp8x8-reqZA&t=167s //