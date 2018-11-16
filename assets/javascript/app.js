// Array of arrays; each sub-array holds the question first, and the 4 multiple choice answers
var qAndA = [["question1", "answer1", "answer2", "answer3", "answer4"],
["question2", "answer1", "answer2", "answer3", "answer4"],
["question3", "answer1", "answer2", "answer3", "answer4"],
["question4", "answer1", "answer2", "answer3", "answer4"],
["question5", "answer1", "answer2", "answer3", "answer4"],
["question6", "answer1", "answer2", "answer3", "answer4"],
["question7", "answer1", "answer2", "answer3", "answer4"],
["question8", "answer1", "answer2", "answer3", "answer4"],
["question9", "answer1", "answer2", "answer3", "answer4"],
["question10", "answer1", "answer2", "answer3", "answer4"]];
// Global variables
var correct = 0;
var wrong = 0;
var count1 = 0;
var count2 = 0
var timeRemaining = 20;
var answered = [];

// Creates question and answer text, as well as resets timeRemaining variable
function createQAndA () {
    $('#question').html("<h3>" + qAndA[count1][0] + "</h3>");
    $('#1').text(qAndA[count1][1]);
    $('#2').text(qAndA[count1][2]);
    $('#3').text(qAndA[count1][3]);
    $('#4').text(qAndA[count1][4]);
    timeRemaining = 20;
    $('#timeCount').text(timeRemaining);
    count1++;
    console.log(count1);
};
createQAndA();

// Starts countDown function and runs it every second
var time = setInterval(countDown, 1000);

// Reduces timeRemaining variable by a second every time it is ran. If the timer hits 0 and all the questions are done, it sends the game to the final screen. If just the timer hits 0, sends game to the loading screen. Clears the timer if it has hit 0 (prevents negative number time).
function countDown() {
    timeRemaining--;
    $('#timeCount').text(timeRemaining);
    if (timeRemaining === 0) {
        clearInterval(time);
        loadingScreen();
    }
}

// Stops the timer if an answer is chosen. If answer is chosen and all the questions are done, it sends the game to the final screen. If just the answer is made, sends game to the loading screen. Clears the timer since user has answered (prevents negative number time).
$('.button').on("click", function() {
    clearInterval(time)
    if (count1 === 9) {
        finalScreen();
    }
    loadingScreen();
})

function loadingScreen () {
    $('.answers').empty();
    $('#question').html("<h3>" + "Correctly answered: " + correct + "</br>" + "Incorrectly answered: " + wrong + "</h3>");
    setTimeout(createQAndA, 3000);
    setTimeout(restartTime, 3000);
}
