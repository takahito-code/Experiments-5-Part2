const defaultQuotes = [ "If you can dream it, you can do it.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Action is the key to all success.",
    "No challenge, no growth.",
    "Effort never betrays you."];

    let quotes = JSON.parse(localStorage.getItem("quotes")) || defaultQuotes;

    const quoteDisplay = document.getElementById("quoteDisplay");
    const nextQuoteButton = document.getElementById("nextQuote");
    const newQuoteInput = document.getElementById("newQuote");
    const addQuoteButton = document.getElementById("addQuote");

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = `"${quotes[randomIndex]}"`;
    }

    function addNewQuote() {
        const newQuote = newQuoteInput.value.trim();
        if(newQuote){
            quotes.push(newQuote);
            localStorage.setItem("quotes", JSON.stringify(quotes));
            newQuoteInput.value = "";
            alert("New quote added successfully!");
        } else {
            alert("Please enter a quote.");
        }
    }

    nextQuoteButton.addEventListener("click", displayRandomQuote);
    addQuoteButton.addEventListener("click", addNewQuote);

    displayRandomQuote();

    const images = ["images/pexels-burst-545026.jpg",
        "images/pexels-binyaminmellish-186077.jpg",
        "images/pexels-daniel-jurin-358265-1835718.jpg",
        "images/pexels-david-besh-884788.jpg"
    ];

    let currentIndex = 0;

    const slideshowImage = document.getElementById("slideshowImage");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    function updateImage() {
        slideshowImage.src = images[currentIndex];
    }

    prevButton.addEventListener("click", ()=> {
        currentIndex = (currentIndex === 0)? images.length - 1 : currentIndex -1 ;
        updateImage();
    });

    nextButton.addEventListener("click", ()=> {
        currentIndex = (currentIndex === images.length -1)? 0 : currentIndex +1 ;
        updateImage();
    });

    updateImage();


let timer;
const initialTime = 10;
let remainingTime = initialTime;

const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

function startCountdown(){
if(timer) clearInterval(timer);
timer = setInterval(()=>{
    remainingTime--;
    timerDisplay.textContent = remainingTime;
    if(remainingTime <= 0){
        clearInterval(timer);
        alert("Time's up!");
        remainingTime = initialTime;
        timerDisplay.textContent = remainingTime;
    } 
}, 1000);
}

function stopCountdown(){
    clearInterval(timer);
}

startButton.addEventListener("click", startCountdown);
stopButton.addEventListener("click", stopCountdown);

const quizData = [{ question: "What is 2 + 2?", choices: ["3", "4", "5"], correct: "4" },
{ question: "What is the capital of Japan?", choices: ["Seoul", "Tokyo", "Beijing"], correct: "Tokyo" },
{ question: "What is 3 * 3?", choices: ["6", "9", "12"], correct: "9" }];

let currentQuestionIndex = 0;
let score = 0;

const questionDisplay = document.getElementById("questionDisplay");
const choicesContainer = document.getElementById("choicesContainer");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionDisplay.textContent = currentQuestion.question;

    choicesContainer.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", ()=> checkAnswer(choice));
        choicesContainer.appendChild(button);
    });
}

function checkAnswer(selectedChoice){
    const currentQuestion = quizData[currentQuestionIndex];
    if(selectedChoice === currentQuestion.correct){
        score++;
        alert("Correct!");
    } else {
        alert(`Wrong! The correct answer was ${currentQuestion.correct}`);
    }

    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length){
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionDisplay.textContent = "Quiz Complete!";
    choicesContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

loadQuestion();


const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const stepInput = document.getElementById("step");
const generateButton = document.getElementById("generateButton");
const numberList = document.getElementById("numberList");
const description = document.getElementById("description");


function generateNumbers() {
    const start = parseInt(startInput.value, 10);
    const end = parseInt(endInput.value, 10);
    const step = parseInt(stepInput.value, 10);
    
    if(isNaN(start) || isNaN(end) ||isNaN(step) || step <= 0){
        alert("Please enter valid numbers (Step must be greater than 0).");
        return;
    }

    numberList.textContent = "";
    description.textContent = "";

    const numbers = [];
    for(let i = start ; i <= end ; i += step){
        numbers.push(i);
        const listItem = document.createElement("li");
        listItem.textContent = i;
        numberList.appendChild(listItem);
    }
    
description.textContent = `Numbers generated from ${start} to ${end} with a step of ${step}: ${numbers.join(", ")}`;
};

generateButton.addEventListener("click", generateNumbers);