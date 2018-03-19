function Question(q, a, c, id) {
    this.question = q;
    this.answers = a;
    this.correct = c;
    this.qid = id;

    this.display = function () {
        var questionDisplay = $("<div class=\"question\" id=\"" + this.qid + "\">");
        questionDisplay.append("<div class=\"q-header\">" + this.question + "</div>");
        var answersDisplay = questionDisplay.append("<div id=\"" + this.qid + "-answers\">" + "</div>");
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

var q1 = new Question("Answer is 1", ["1", "2", "3"], "1", "q1");
var q2 = new Question("Answer is 2", ["1", "2", "3"], "2", "q2");
var q3 = new Question("Answer is 3", ["1", "2", "3"], "3", "q3");
var questions = [q1, q2, q3];
var curr = 0;
var correct = 0;
var time = 5;
$("#time").html(time);
var countdown;

function start() {
    $("#questions").html(questions[curr].display());
    countdown = setTimeout(check, 5000);

}

function nextQuestion() {
    if (curr < questions.length - 1) {
        curr++;
        time = 5;
        $("#timer").html("Time Remaining: <span id=\"time\">" + time + "</span> Seconds");
        $("#questions").html(questions[curr].display());
        countdown = setTimeout(check, 5000);
    }
    else {
        $("main").html("<div>You got " + correct + " out of " + questions.length + " correct!");
    }
}

function check() {
    if (time !== 0) {
        if (questions[curr].correct === $(this).val()) {
            $("#questions").html("<div id=\"result\">You're Correct!</div>");
            correct++;
        }
        else {
            $("#questions").html("<div id=\"result\">You're Wrong! The Correct Answer is:</div>");
            $("#questions").append("<div>" + questions[curr].correct + "</div>");
        }
        clearTimeout(countdown);
    }
    else {
        $("#questions").html("<div id=\"result\">You're Wrong! The Correct Answer is:</div>");
        $("#questions").append("<div>" + questions[curr].correct + "</div>");
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

start();
$("body").on("click", ".answer", check);