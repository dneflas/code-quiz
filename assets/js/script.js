// use set interval to start a countdown timer when start button is clicked.
// content of container is cleared and multiple choice questions appears
// ** if answered incorectly 10seconds is deducted,
// ** next questions appears
// game ends if time = 0 or questions are completed.
// End game function
// ** score is shown (time remaining is score)
// ** initials and score are saved to local storage
// ***optional - feature to clear out high score

var headerEl = document.querySelector("#header");
var mainEl = document.querySelector("#main");
var timerEl = document.createElement("div");
var titleEl = document.createElement("h1");
var answersEl = document.createElement("div");
var i = 0;
var timeLeft = 59;
var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        answer1: "strings",
        answer2: "booleans",
        answer3: "alerts",
        answer4: "numbers",
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with __________.",
        answer1: "quotes",
        answer2: "curly brackets",
        answer3: "parenthesis",
        answer4: "square brackets",
        correctAnswer: "parenthesis"
    },
    {
        question: "Arrays in Javascript can be used to store __________.",
        answer1: "numbers and strings",
        answer2: "other arrays",
        answer3: "booleans",
        answer4: "all of the above",
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within __________ when being assigned to variables.",
        answer1: "variables",
        answer2: "commas",
        answer3: "curly brackets",
        answer4: "quotes",
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "JavaScript",
        answer2: "terminal/bash",
        answer3: "for loops",
        answer4: "console.log",
        correctAnswer: "console.log"
    }
]

// function to bring to start of the game and start quiz
var startGame = function(){
    var scoreLinkEl = document.createElement("div");
    scoreLinkEl.textContent = "View high score";
    headerEl.appendChild(scoreLinkEl);
    timerEl.className = "#timer";
    timerEl.textContent = "Time Remaining: 60";
    headerEl.appendChild(timerEl);

    titleEl.textContent = "Coding Quiz Challenge";
    mainEl.appendChild(titleEl);

    var instructionsEl = document.createElement("p");
    instructionsEl.textContent = "Answer the following code-related questions within the time limit. Incorrect answers will penalize your score/time by ten seconds!";
    mainEl.appendChild(instructionsEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz!";
    startButtonEl.setAttribute("id","start-button");
    mainEl.appendChild(startButtonEl);

    document.querySelector("#start-button").addEventListener("click", function(){
        clearScreen(mainEl);
        countdown();
        quizLogic();
    });
};

// quiz logic funtion
var quizLogic = function(){
    if (timeLeft > 0 && i < quizQuestions.length){

        var questionEl = document.createElement("h2");
        questionEl.textContent = quizQuestions[i].question;
        var answerLi1 = document.createElement("button");
        answerLi1.textContent = quizQuestions[i].answer1;
        answerLi1.className = "answer-choice";
        var answerLi2 = document.createElement("button");
        answerLi2.textContent = quizQuestions[i].answer2;
        answerLi2.className = "answer-choice";
        var answerLi3 = document.createElement("button");
        answerLi3.textContent = quizQuestions[i].answer3;
        answerLi3.className = "answer-choice";
        var answerLi4 = document.createElement("button");
        answerLi4.textContent = quizQuestions[i].answer4;
        answerLi4.className = "answer-choice";


        answersEl.appendChild(answerLi1);
        answersEl.appendChild(answerLi2);
        answersEl.appendChild(answerLi3);
        answersEl.appendChild(answerLi4);
        mainEl.appendChild(questionEl);
        mainEl.appendChild(answersEl);
    }else {
        endGame();
    };
};

// click function of answer
answersEl.addEventListener("click", function(event){
    var targetEl = event.target;
    var questionsObj = quizQuestions[i]
    var correctAnswer = questionsObj.correctAnswer;

    clearScreen(answersEl);
    clearScreen(mainEl);
    
    if( targetEl.textContent !== correctAnswer){
        timeLeft = Math.max(0, timeLeft-10);
    };
    
    // if (targetEl.textContent === correctAnswer){
    //     // new element correct answer
    //     var correctAnswerEl = document.createElement("h3");
    //     // correctAnswerEl.textContent = "Correct!";
    //     // mainEl.appendChild(correctAnswerEl);
    // } else {
    //     // new element for incorrect answer
    //     var incorrectAnswerEl = document.createElement("h3")
    //     // incorrectAnswerEl.textContent ="Incorrect!";
    //     // mainEl.appendChild(incorrectAnswerEl);
        
    //     timeLeft = Math.max(0, timeLeft-10);
    // };   
    
    quizLogic(i++);
});

// end game function
var endGame = function(){
    //clear screen
    clearScreen(mainEl);
    // show score page
    titleEl.textContent = "All done!";
    mainEl.appendChild(titleEl);

    var score = Math.max(0, timeLeft)
    console.log(score);
    var scoreEl = document.createElement("div");
    scoreEl.textContent = "Your final score is " + score + ".";
    scoreEl.addClass = "score";
    mainEl.appendChild(scoreEl);
    //create element to save score and initials
    var saveScore = document.createElement("div");
    saveScore.innerHTML = "<label for='initials'>Enter initials: </label><input type='text' name='initials' id='initials' maxlength='3'/><button id='submit-button'>Submit</button>"
    mainEl.appendChild(saveScore);
    // pull high score from local storage
    // function to clear local storage
};


// high score function
var highScore = function (){
    // save score to local storage
    localStorage.setItem("initials", timeLeft);
    localStorage.setItem("score", timeLeft);
}
// var submitButton = document.querySelector("#submit-button");
// submitButton.addEventListener("click", highScore);


// timer function
var countdown = function(){
    var timeInterval = setInterval(function(){
        if (i === quizQuestions.length){
            clearInterval(timeInterval);
            timerEl.textContent = "Time Remaining: " + timeLeft;
        }
        if (timeLeft >= 0){
            timerEl.textContent = "Time Remaining: " + timeLeft;
            timeLeft--;
    
        } else {
            timerEl.textContent = "Time Remaining: 0";
            clearInterval(timeInterval);
            endGame();
        };
    }, 1000);
};

// function to clear screen
var clearScreen = function(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    };
};

// call start to game
startGame();
