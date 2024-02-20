const questions = [
    {
        question: "Linux is written in:",
        answers: [
            {text: ".NET", correct: false},
            {text: "C", correct: true},
            {text: "Java", correct: false},
            {text: "C++", correct: false},

        ]
    },
    {
        question: "The Linux platform that runs on mobile phones is called:",
        answers: [
            {text: "IOS", correct: false},
            {text: "MicroLinux", correct: false},
            {text: "LinuxMobile", correct: false},
            {text: "Android", correct: true},

        ]
    },
    {
        question: "What does a distribution provide to add and remove software from the system?",
        answers: [
            {text: "Bash", correct: false},
            {text: "Application Programming Interface (API)", correct: false},
            {text: "Package manager", correct: true},
            {text: "Compiler", correct: false},

        ]
    },
    {
        question: "To be able to output messages to the screen, use the _______ command:",
        answers: [
            {text: "display", correct: false},
            {text: "echo", correct: true},
            {text: "type", correct: false},
            {text: "print", correct: false},

        ]
    },
    {
        question: "The _______ command will print a list of the commands that you’ve previously executed.",
        answers: [
            {text: "eval", correct: false},
            {text: "list", correct: false},
            {text: "history", correct: true},
            {text: "exec", correct: false},

        ]
    },
    {
        question: "What is the standard option to provide a command line program to view its documentation?",
        answers: [
            {text: "-info", correct: false},
            {text: "-help", correct: true},
            {text: "-doc", correct: false},
            {text: "-h", correct: false},

        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

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
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();