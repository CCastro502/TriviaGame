function assignValues() {
    $("#1").attr("value", 1);
    $("#2").attr("value", 2);
    $("#3").attr("value", 3);
    $("#4").attr("value", 4);
}

assignValues();

// Array of arrays; each sub-array holds the question first, and the 4 multiple choice answers
var qAndA = [
["What color is the sky?", "Purple", "Blue", "Colors are not real", "Red"],
["What sound does a goat make?", "What is sound?", "Hiss", "Baaaa", "Goat"],
["Who finished breakfast first?", "Rikki-Tikki-Tavi", "Peanut Butter and Jelly", "Bob Ross", "Charlie Murphy"],
["Which direction is east?", "That way", "This way", "Upside-Down", "Did you say w-east?"],
["What time is it?", "3:16", "Question is not specific enough", "Time is a human construct", "Time to get a watch!"],
["Where did my pocket go?", "You never lost it", "It's on your pants", "Trick question", "Definitely not a trick question"],
["What country is Asia located in?", "China", "India", "Mongolia", "Continent"],
["Mentally exhausted yet? What is 16 multiplied by 9", "154", "12 squared", "125", "212"],
["What is 13 squared?", "16 multiplied by 9", "243 - 74", "1 + 6 + 9", "A big number"],
["Quick! 1573 + 695", "2438", "2192", "2268", "12"]
];
// Global variables
var correct = 0;
var wrong = 0;
var count1 = 0;
var count2 = 0
var timeRemaining = 20;
var answers = ["3", "1", "4", "4", "4", "1", "4", "2", "2", "3"];
var answered = [];

// Creates question and answer text, as well as resets timeRemaining variable
function createQAndA() {
    $('#question').html("<h3>" + qAndA[count1][0] + "</h3>");
    $('#1').html("<p>" + qAndA[count1][1] + "</p>");
    $('#2').html("<p>" + qAndA[count1][2] + "</p>");
    $('#3').html("<p>" + qAndA[count1][3] + "</p>");
    $('#4').html("<p>" + qAndA[count1][4] + "</p>");
    timeRemaining = 20;
    $('#timeCount').text(timeRemaining);
    count1++;
};
createQAndA();

// Starts countDown function and runs it every second
var time = setInterval(countDown, 1000);

// Reduces timeRemaining variable by a second every time it is ran. If the timer hits 0 and all the questions are done, it sends the game to the final screen. If just the timer hits 0, sends game to the loading screen. Clears the timer if it has hit 0 (prevents negative number time).
function countDown() {
    timeRemaining--;
    $('#timeCount').text(timeRemaining);
    if (timeRemaining <= 0 && count1 === 10) {
        clearInterval(time);
        answered.push("0")
        finalScreen();
    } else if (timeRemaining <= 0) {
        clearInterval(time);
        answered.push("0");
        loadingScreen();
    }
}

// Stops the timer if an answer is chosen. If answer is chosen and all the questions are done, it sends the game to the final screen. If just the answer is made, sends game to the loading screen. Clears the timer since user has answered (prevents negative number time).
$('.button').on("click", function(event) {
    console.log(event.currentTarget.id);
    answered.push(event.currentTarget.id);
    console.log(answered);
    clearInterval(time);
    if (count1 === 10) {
        finalScreen();
    } else {
        loadingScreen();
    }
})
// Screen loaded when user has answered a question or run out of time - only if not all questions have been answered
function loadingScreen() {
    $('.answers > div').html("");
    if (answered[count1 - 1] == answers[count1 - 1]) {
        $('#question').html("<h3>You answered correctly!!!</h3>");
        correct++;
    } else {
        $('#question').html("<h3>You answered incorrectly</h3>");
        wrong++;
    }
    setTimeout(createQAndA, 3000);
    setTimeout(restartTime, 3000);
}

// Restarts time once loading screen is done.
function restartTime() {
    time = setInterval(countDown, 1000);
}

function finalScreen() {
    $('.answers > div').html("");
    if (answered[count1 - 1] === answers[count1 - 1]) {
        correct++;
    } else {
        wrong++;
    }
    $('#question').html("<h3>" + "Correctly answered: " + correct + "</br>" + "Incorrectly answered: " + wrong + "</br>" + "Game will restart in ten seconds" + "</h3>");
    setTimeout(restartGame, 9000);
    setTimeout(createQAndA, 10000);
    setTimeout(restartTime, 10000);
}

function restartGame() {
    count1 = 0;
    correct = 0;
    wrong = 0;
    answered.length = 0;
}