function Question(q, a, c, id) {
    this.question = q;
    this.answers = a;
    this.correct = c;
    this.qid = id;

    this.display = function () {
        var questionDisplay = $("<div class='question' id='" + this.qid + "'>");
        questionDisplay.append("<div class='q-header'>" + this.question + "</div>");
        var answersDisplay = questionDisplay.append("<div id='" + this.qid + "-answers'>" + "</div>");
        for (var i = 0; i < this.answers.length; i++) {
            var answer = this.answers[i];
            var ans = $("<div>" + answer + "</div>");
            ans.val(answer);
            ans.attr("class", "answer");
            answersDisplay.append(ans);
        }
        return questionDisplay;
    };
}

var q1 = new Question("Which hobbit found the ring and defeated Gollum in a riddle game?", ["Frodo Baggins", "Bilbo Baggins", "Samwise Gamgee", "Meriadoc Brandybuck"], "Bilbo Baggins", "q1");
var q2 = new Question("In what age does the bulk of the action in The Lord of the Rings occur?", ["First Age", "Second Age", "Third Age", "Fourth Age"], "Third Age", "q2");
var q3 = new Question("How many hobbits were part of the Fellowship of the Ring?", ["One", "Two", "Three", "Four"], "Four", "q3");
var q4 = new Question("Which of the following is not a dwarf in Thorin Oakenshield's company?", ["Balin","Dwalin","Gimli","Gloin"], "Gimli", "q4");
var questions = [q1, q2, q3, q4];
var curr;
var correct;
var time;
$("#time").html(time);
var countdown;

function start() {
    correct = 0;
    curr = 0;
    time = 10;
    $("#start").empty();
    $("#timer").html("Time Remaining: <span id='time'>" + time + "</span> Seconds");
    $("#questions").html(questions[curr].display());
    $("#results").empty();
    countdown = setTimeout(check, 10000);

}

function image(string) {
    img = $("<img>");
    img.attr("src",string);
    return img;
}

function nextQuestion() {
    $("#image").empty();
    if (curr < questions.length - 1) {
        curr++;
        time = 10;
        $("#timer").html("Time Remaining: <span id='time'>" + time + "</span> Seconds");
        $("#questions").html(questions[curr].display());
        countdown = setTimeout(check, 10000);
    }
    else {
        $("#timer").empty();
        $("#questions").empty();
        $("#results").html("<div>You got " + correct + " out of " + questions.length + " correct!</div> <div id='restart'>Click this message to start again</div>");
    }
}

function check() {
    if (time !== 0) {
        if (questions[curr].correct === $(this).val()) {
            $("#questions").html("<div id='result'>You're Correct!</div>");
            $("#image").append(image("assets/images/yes.gif"));
            correct++;
        }
        else {
            $("#questions").html("<div id='result'>You're Wrong! The Correct Answer is:</div>");
            $("#questions").append("<div>" + questions[curr].correct + "</div>");
            $("#image").append(image("assets/images/no.gif"));
        }
        clearTimeout(countdown);
    }
    else {
        $("#questions").html("<div id='result'>Time's up! The Correct Answer is:</div>");
        $("#questions").append("<div>" + questions[curr].correct + "</div>");
        $("#image").append(image("assets/images/no.gif"));
    }
    time = 5;
    $("#timer").html("Time until next question: <span id=\"time\">" + time + "</span> Seconds");
    countdown = setTimeout(nextQuestion, 5000);
}

setInterval(function () {
    if (time > 0) {
        time--;
        $("#time").html(time);
    }
}, 1000);

$("body").on("click", ".answer", check);
$("body").on("click", "#start", start);
$("body").on("click", "#restart", start);