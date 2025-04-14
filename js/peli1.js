const questions =[
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        answers: [
            { text: "Susi", correct: false},
            { text: "Hirvi", correct: false},
            { text: "Karhu", correct: true},
            { text: "Ahma", correct: false},
        ]
    },
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        answers: [
            { text: "Karhu", correct: false},
            { text: "Hirvi", correct: true},
            { text: "Supikoira", correct: false},
            { text: "Kettu", correct: false},
        ]
    },
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        answers: [
            { text: "Peura", correct: false},
            { text: "Päästäinen", correct: false},
            { text: "Kettu", correct: false},
            { text: "Jänis", correct: true},
        ]
    },
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
        answers: [
            { text: "Ahma", correct: false},
            { text: "Susi", correct: false},
            { text: "Peura", correct: true},
            { text: "Saukko", correct: false},
        ]
    },
    {
        question: "Minkä eläimen jäljet ovat kuvassa?",
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

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
    })
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


startQuiz();