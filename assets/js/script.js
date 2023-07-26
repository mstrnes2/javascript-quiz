var startButton = document.getElementById("start-button");
var homePage = document.getElementById("start");
var quizQuestions = document.getElementById("questions");
var quizEl = document.getElementById("quiz-questions");
var pickA = document.getElementById("A");
var pickB = document.getElementById("B");
var pickC = document.getElementById("C");
var pickD = document.getElementById("D");
var answerEl = document.getElementById("choice");
var timeEl = document.getElementById("time");
var highScoreEl = document.getElementById("high-score");
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
        correct : "getElementById(id)",
    },
    // {
    //     question : " Which JavaScript method is used to write on browser's console?", 
    //     choiceA : "console.log()", 
    //     choiceB : "console.write()",
    //     choiceC : "console.output()",
    //     choiceD : "console.writeHTML()",
    //     correct : "A",
    // },
    // {
    //     question : "Which is the correct JavaScript statement to display 'Hello World!' into an alert box?", 
    //     choiceA : "alert(){'Hello World'}",
    //     choiceB : "alert(console.log('Hello World!'));",
    //     choiceC : "alert(Text:'Hello World!');",
    //     choiceD : "alert('Hello World!');",
    //     correct : "D",
    // },
    // {
    //     question : "In JavaScript, single line comment begins with ___.", 
    //     choiceA : "#", 
    //     choiceB : "//",
    //     choiceC : "$",
    //     choiceD : "/*",
    //     correct : "B",
    // }
];

var finalQuestion = questions.length;
var currentQuestion = 0;
var time = 60;
var score = 0;

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
    startButton.style.display = "none";
    homePage.style.display = "none";
    timeEl.textContent = time;
    timerInterval = setInterval(countdown, 1000);
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
    quizEl.style.display = "none";
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
};

startButton.addEventListener("click",startQuiz);