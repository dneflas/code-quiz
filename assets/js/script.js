// use set interval to start a countdown timer when start button is clicked.
// content of container is cleared and multiple choice questions appears
// ** if answered incorectly 10seconds is deducted,
// ** next questions appears
// game ends if time = 0 or questions are completed.
// End game function
// ** score is shown (time remaining is score)
// ** initials and score are saved to local storage
// ***optional - feature to clear out high score

var mainEl = document.querySelector("#main");
var timerEl = document.querySelector("#timer");

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

    });
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
            clearInterval(setInterval);
        };
    }, 1000);
};

startGame();