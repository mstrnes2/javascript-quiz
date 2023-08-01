var startButton = document.getElementById("start-button");
var homePage = document.getElementById("start");
var quizQuestions = document.getElementById("questions");
var quizEl = document.getElementById("quiz-questions");
var answerEl = document.getElementById("choice");
var timeEl = document.getElementById("time");
var highScoreEl = document.getElementById("high-score");
var timerEl = document.getElementById("timer");
var saveScores = document.getElementById("save");
var theQuiz = document.getElementById("quiz-box");
var savedHighScores = document.getElementById("saved-high-scores");
var timerInterval;


var questions = [
    {
        question : "In which HTML element, we put the JavaScript code?", 
        choices : ["<javascript>...</javascript>", "<js>...</js>", "<script>...</script>", "<css>...</css>",],
        correct : "<script>...</script>",
    },
    {
        question : "Which JavaScript method is used to access an HTML element by id?", 
        choices : ["getElementById()", "getElement(id)", "getElementById(id)","elementById(id)",],
        correct : "getElementById()",
    },
    {
        question : " Which JavaScript method is used to write on browser's console?", 
        choices : ["console.log()","console.write()","console.output()","console.writeHTML()"],
        correct : "console.log()",
    },
    {
        question : "Which is the correct JavaScript statement to display 'Hello World!' into an alert box?", 
        choices : ["alert(){'Hello World'}","alert(console.log('Hello World!'));","alert(Text:'Hello World!');","alert('Hello World!');"],
        correct : "alert('Hello World!');",
    },
    {
        question : "In JavaScript, single line comment begins with ___.", 
        choices : ["#","//","$","/*"],
        correct : "//",
    }
];

var finalQuestion = questions.length;
var currentQuestion = 0;
var time = 60;



function getQuizQuestions(){
    if(currentQuestion === finalQuestion){
        return finalScore();
    }


    var questionType = questions[currentQuestion];
    quizQuestions.textContent = questionType.question;
    answerEl.innerHTML = "";

    questionType.choices.forEach(function(choice){
        var btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = correctAnswer;
        answerEl.append(btn);
    })
   
};

function correctAnswer(event){
    if(event.target.textContent !== questions[currentQuestion].correct){
        time = time - 15;
        timeEl.textContent = time;
        if(time <= 0){
            time = 0;
            timeEl.textContent = 0;
            finalScore();
        }
    }
    currentQuestion++;
    if(currentQuestion === finalQuestion){
        finalScore();
    }else{
        getQuizQuestions();
    }
    
};


function startQuiz(){
    homePage.classList.add("hide");
    timerEl.classList.remove("hide");
    savedHighScores.classList.add("hide");
    time = 60;
    currentQuestion = 0;
    timeEl.textContent = time;
    timerInterval = setInterval(countdown, 1000);
    quizEl.classList.remove("hide");
    getQuizQuestions();
};

function countdown(){
    time--;
    timeEl.textContent = time;
    if(time <= 0){
        timeEl.textContent = 0;
        finalScore();
    }
};

function finalScore(){
    clearInterval(timerInterval);
    quizEl.classList.add("hide");
    highScoreEl.classList.remove("hide");
    document.getElementById("save").onclick = saveScore;
    document.getElementById("final-score").textContent = time;
};

function saveScore(){
    var name = document.getElementById('name').value.trim();
    var highScoresArray = JSON.parse(localStorage.getItem("high-scores")) || [];
    var newScore = {score:time, name:name}
    highScoresArray.push(newScore);
    localStorage.setItem("high-scores", JSON.stringify(highScoresArray));
    savedHighScores.classList.remove("hide");
    highScoreEl.classList.add("hide");
    showScores();
};

startButton.addEventListener("click",startQuiz);

function showScores(){
    document.querySelector("ol").innerHTML = "";
    const highScoresArray = JSON.parse(localStorage.getItem("high-scores")) || [];
    console.log(highScoresArray);
    for (let index = 0; index < highScoresArray.length; index++) {
        const highScoreEl = document.createElement("li");
        highScoreEl.textContent = highScoresArray[index].name + " " + highScoresArray[index].score;
        document.getElementById("high-score-list").append(highScoreEl);
    }
}


function clearScores(){
    window.localStorage.clear();
    document.querySelector("ol").innerHTML = "";
}

 document.getElementById("clear-scores").addEventListener("click", clearScores);


document.getElementById("try-again").addEventListener("click", startQuiz);