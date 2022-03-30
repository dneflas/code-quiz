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
var timerEl = document.querySelector("#timer");
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
        question: "String values must be enclosed withing __________ when being assigned to variables.",
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
    var titleEl = document.createElement("h1");
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
        mainEl.removeChild(titleEl);
        mainEl.removeChild(instructionsEl);
        mainEl.removeChild(startButtonEl);
        countdown();
        quizLogic();
        // end game function
    });
};

// quiz logic funtion
var quizLogic = function(){
    for (i = 0; i < quizQuestions.length; i++){
        var questionEl = document.createElement("h2");
        questionEl.textContent = quizQuestions[i].question;
        var answersEl = document.createElement("ol");
        var answerLi1 = document.createElement("li");
        answerLi1.textContent = quizQuestions[i].answer1;
        var answerLi2 = document.createElement("li");
        answerLi2.textContent = quizQuestions[i].answer2;
        var answerLi3 = document.createElement("li");
        answerLi3.textContent = quizQuestions[i].answer3;
        var answerLi4 = document.createElement("li");
        answerLi4.textContent = quizQuestions[i].answer4;

        answersEl.appendChild(answerLi1);
        answersEl.appendChild(answerLi2);
        answersEl.appendChild(answerLi3);
        answersEl.appendChild(answerLi4);
        mainEl.appendChild(questionEl);
        mainEl.appendChild(answersEl);

        // THIS DOESNT WORK
        answersEl.addEventListener("click", function(event){
            var targetEl = event.target;
            var questionsObj = quizQuestions[i]
            var correctAnswer = questionsObj.correctAnswer;
            console.log(targetEl.textContent);

            mainEl.removeChild(questionEl);
            mainEl.removeChild(answersEl);

            if (timeLeft > 0){
                if (targetEl.textContent === correctAnswer){
                    // new element correct answer
                    var correctAnswerEl = document.createElement("h3");
                    correctAnswerEl.textContent = "Correct!";
                    mainEl.appendChild(correctAnswerEl);
                } else {
                    // new element for incorrect answer
                    var incorrectAnswerEl = document.createElement("h3")
                    incorrectAnswerEl.textContent ="Incorrect!";
                    mainEl.appendChild(incorrectAnswerEl);
                    
                    timeLeft = Math.max(0, timeLeft-10);
                };    
            } else {
                // end game function
            }
        });
    };
};

// timer function
var countdown = function(){
    var timeLeft = 60;
    var timeInterval = setInterval(function(){
        if (timeLeft >= 0){
            timerEl.textContent = "Time Remaining: " + timeLeft;
            timerEl.addClass = "";
            timeLeft--;
    
        } else {
            timerEl.textContent = "Time Remaing: 0";
            timerEl.addClass = "";
            clearInterval(timeInterval);
        };
    }, 1000);
};

startGame();
