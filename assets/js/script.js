var headerEl = document.querySelector("#header");
var mainEl = document.querySelector("div");
var timerEl = document.createElement("div");
var topEl = document.createElement("h1");
var answersEl = document.createElement("div");
    answersEl.className = "answers-area";
var footerEl = document.querySelector("#footer");
var i = 0;
var timeLeft = 59;
var highScoresArr =[];
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

// function to clear screen
var clearScreen = function(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    };
};

// function to reset time and questions
var reset = function(){
    i = 0;
    timeLeft = 59;
};

// timer function
var countdown = function(){
    var timeInterval = setInterval(function(){
        if (i === quizQuestions.length){
            clearInterval(timeInterval);
            timerEl.textContent = "Time Remaining: " + timeLeft;
        }
        if (timeLeft > 0){
            timerEl.textContent = "Time Remaining: " + timeLeft;
            timeLeft--;
    
        } else {
            timerEl.textContent = "Time Remaining: 0";
            clearInterval(timeInterval);
            endGame();
        };
    }, 1000);
};

// function to bring to start of the game and start quiz
var startGame = function(){
    // clear old elements from screen and reset time and array
    clearScreen(topEl);
    clearScreen(mainEl);
    clearScreen(answersEl);
    clearScreen(footerEl);
    reset();

    // retrieve highscore for local storage
    var currentHighScore = JSON.parse(localStorage.getItem("high score"))
    if (!currentHighScore){
        highScoresArr = [];
    } else {
        highScoresArr = currentHighScore;
    };

    // append elements to the page
    var scoreLinkEl = document.createElement("div");
    scoreLinkEl.textContent = "View high score";
    scoreLinkEl.setAttribute("id", "high-score-button");
    headerEl.appendChild(scoreLinkEl);
    timerEl.className = "#timer";
    timerEl.textContent = "Time Remaining: 60";
    headerEl.appendChild(timerEl);

    topEl.textContent = "Coding Quiz Challenge";
    topEl.setAttribute("id", "main-title");
    mainEl.appendChild(topEl);

    var instructionsEl = document.createElement("p");
    instructionsEl.textContent = "Answer the following code-related questions within the time limit. Incorrect answers will penalize your score/time by ten seconds!";
    mainEl.appendChild(instructionsEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz!";
    startButtonEl.setAttribute("id","start-button");
    mainEl.appendChild(startButtonEl);

    // event listener to start timer and quiz questions
    document.querySelector("#start-button").addEventListener("click", function(){
        clearScreen(mainEl);
        countdown();
        quizLogic();
    });

    // event listener for view high score button
    document.querySelector("#high-score-button").addEventListener("click", function(){
        clearScreen(headerEl);
        clearScreen(mainEl);
        highScore();
    })
};

// quiz logic funtion
var quizLogic = function(){
    if (timeLeft > 0 && i < quizQuestions.length){
        // append elements to page
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
    // clear old elements from the screen
    clearScreen(answersEl);
    clearScreen(mainEl);
    clearScreen(footerEl);
    
    var targetEl = event.target;
    var questionsObj = quizQuestions[i]
    var correctAnswer = questionsObj.correctAnswer;

    if (targetEl.textContent === correctAnswer){
        // new element correct answer
        var correctAnswerEl = document.createElement("h3");
        correctAnswerEl.textContent = "Correct!";
        correctAnswerEl.className = "question-response";
        footerEl.appendChild(correctAnswerEl);
        } else {
        // new element for incorrect answer
        var incorrectAnswerEl = document.createElement("h3")
        incorrectAnswerEl.textContent ="Incorrect!";
        incorrectAnswerEl.className = "question-response";
        footerEl.appendChild(incorrectAnswerEl);
        // remove 10 seconds from timer
        timeLeft = Math.max(0, timeLeft-10);
    };  
    
    // time out function for answer response
    setTimeout(function(){
        clearScreen(footerEl);
    }, 1500);

    // return to quiz logic
    quizLogic(i++);
});

// end game function
var endGame = function(){
    //clear screen
    clearScreen(mainEl);
    // show score page
    topEl.removeAttribute("id");
    topEl.textContent = "All done!";
    mainEl.appendChild(topEl);

    var score = Math.max(0, timeLeft)
    console.log(score);
    var scoreEl = document.createElement("div");
    scoreEl.textContent = "Your final score is " + score + ".";
    scoreEl.addClass = "score";
    mainEl.appendChild(scoreEl);
    //create element to save score and initials
    var saveScore = document.createElement("form");
    saveScore.innerHTML = "<label for='initials'>Enter initials: </label><input type='text' name='initials' id='initials' maxlength='3'/><button type='submit' id='submit-button'>Submit</button>"
    mainEl.appendChild(saveScore);

    // event listener to push high score to arr save to local storage
    document.querySelector("#submit-button").addEventListener("click", function(event){
        event.preventDefault();
        
        var userInitials = document.querySelector("#initials").value;
        var userScore = {};
        userScore.initials = userInitials;
        userScore.score = score;
        highScoresArr.push(userScore);
        localStorage.setItem("high score", JSON.stringify(highScoresArr));

        // call highscore function
        highScore();
    });
};

// high score function
var highScore = function (){
    //clear old elements from screen
    topEl.removeAttribute("id");
    clearScreen(headerEl);
    clearScreen(mainEl);

    // sort array items by highest score to lowest
    highScoresArr.sort((a,b) => {
        return b.score - a.score;
    });

    // create element to hold high score and pull high scores from array
    var highScoreList = document.createElement("ul");
    highScoreList.className = "score-list";
    
    for (var i = 0; i < highScoresArr.length; i++){
        var scoreItem = document.createElement("li");
        scoreItem.textContent = (i+1) +". " + highScoresArr[i].initials + " - " + highScoresArr[i].score;

        highScoreList.appendChild(scoreItem);
    };

    // display high score
    topEl.textContent = "High Scores";
    mainEl.appendChild(topEl);
    mainEl.appendChild(highScoreList);
    
    // back button takes you back to start game function
    var backButtonEl = document.createElement("button");
    backButtonEl.textContent = "Go back";
    backButtonEl.className = "score-buttons";
    backButtonEl.setAttribute("id", "back-button");
    mainEl.appendChild(backButtonEl);

    // clear button clears local storage
    var clearHighScoreButtonEl = document.createElement("button");
    clearHighScoreButtonEl.textContent = "Clear high scores";
    clearHighScoreButtonEl.className = "score-buttons";
    clearHighScoreButtonEl.setAttribute("id", "clear-score-button");
    mainEl.appendChild(clearHighScoreButtonEl);

    // event listener for back button
    backButtonEl.addEventListener("click",startGame);

    // event listener for clear button
    clearHighScoreButtonEl.addEventListener("click", function(){
        localStorage.clear();
        clearScreen(highScoreList);
    });
};

// call start to game
startGame();
