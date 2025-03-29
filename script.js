const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Jupiter" }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let userName = "";

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft === 0) endQuiz();
    }, 1000);
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) return endQuiz();
    const quiz = questions[currentQuestionIndex];
    document.querySelector(".question").innerText = quiz.question;
    document.querySelector(".options").innerHTML = quiz.options.map(option =>
        `<div class="option" onclick="selectAnswer('${option}')">${option}</div>`
    ).join("");
}

function selectAnswer(selected) {
    if (questions[currentQuestionIndex].answer === selected) score += 10;
    currentQuestionIndex++;
    loadQuestion();
}

function endQuiz() {
    clearInterval(timer);
    document.querySelector(".quiz-container .options").style.display = "none";
    document.querySelector(".quiz-container .result").style.display = "block";
    document.getElementById("score").innerText = score;
    document.getElementById("username").style.display = "block";
    document.querySelector(".restart-btn").style.display = "block";
}

function restartQuiz() {
    userName = document.getElementById("username").value.trim();
    if (!userName) {
        alert("Please enter your name to save your score!");
        return;
    }

    saveScore(userName, score);
    displayLeaderboard();

    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    document.getElementById("time").innerText = timeLeft;
    document.querySelector(".quiz-container .options").style.display = "block";
    document.querySelector(".quiz-container .result").style.display = "none";
    document.getElementById("username").style.display = "none";
    document.querySelector(".restart-btn").style.display = "none";

    startTimer();
    loadQuestion();
}

function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5); // Keep top 5 scores
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    const leaderboardContainer = document.querySelector(".leaderboard-container");
    const leaderboardList = document.getElementById("leaderboard");
    leaderboardContainer.style.display = "block";
    leaderboardList.innerHTML = "";

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.forEach(entry => {
        const li = document.createElement("li");
        li.innerText = `${entry.name} - ${entry.score} pts`;
        leaderboardList.appendChild(li);
    });
}

startTimer();
loadQuestion();