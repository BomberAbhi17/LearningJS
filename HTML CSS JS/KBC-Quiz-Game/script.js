// imported state object from questions.js

// defining functions to add and get a object from local Storage
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

// On click of start Button first question is shown
function clickStart() {
  $(".firstPage").on("click", "button", function (event) {
    $(".firstPage").remove();
    $("#questionBox").removeClass("hidden");
    $("#score1").removeClass("hidden");
  });
}

var chosenAnswer = " "; // variable to store the chosen answer by user
// On click of any answer option , select that option and deselect any other options previously selected
function clickAnswer(chosenElement, state) {
  $("button").removeClass("selected");
  chosenAnswer = $(chosenElement).val();

  $(chosenElement).addClass("selected");
  // remove the hover class when any option is selected
  $("button").removeClass("hover");
  // show continue button when a answer option is selected
  $(".js-continue").removeClass("hidden");

  return state;
}
// on click of continue button if last question reached then redirect to endpage.html otherwise show next question
function clickContinue(state, chosenAnswer) {
  //if the chosen answer is correct, add 1 point to total score
  $("button").addClass("hover");
  $("button").removeClass("selected");
  if (chosenAnswer == state.questions[state.currentQuestion].correctAnswer) {
    state.userScore += 1;
  }
  // store user chosen answers in a array
  state.userAnswers.push(chosenAnswer);

  state.currentQuestion += 1;
  //hide continue button   again and  remove the question and answer
  $(".js-continue").addClass("hidden");

  if (state.currentQuestion >= 10) {
    // if 10th question reached
    localStorage.setObj("state", state);
    location.href = "endpage.html";
    return state;
  } else {
    //if quiz is not done insert next question and its answer options and update the question count

    $(".question").text(state.questions[state.currentQuestion].question);
    $(".button0").html(state.questions[state.currentQuestion].answers[0]);
    $(".button1").html(state.questions[state.currentQuestion].answers[1]);
    $(".button2").html(state.questions[state.currentQuestion].answers[2]);
    $(".button3").html(state.questions[state.currentQuestion].answers[3]);

    $(".count").text(
      "Question: " + (state.currentQuestion + 1) + "/" + state.questions.length
    );
  }
}
// on click of go home button , it redirects to the startPage
function Home() {
  location.href = "index.html";
}
// Executing the functionality of the program
clickStart();
$("#questionBox").on("click", "button", function (event) {
  clickAnswer($(this), state);
});

$(".js-continue").click(function (event) {
  clickContinue(state, chosenAnswer);
});
$(".try").click(function (event) {
  Home();
});
$(".Final-score").text(
  "Score: " + localStorage.getObj("state").userScore + "/10"
);
for (let i = 0; i < 10; i++) {
  $(`.q${i}ans${state.questions[i].correctAnswer}`).addClass("correct");

  if (
    localStorage.getObj("state").userAnswers[i] !=
    state.questions[i].correctAnswer
  ) {
    $(`.q${i}ans${localStorage.getObj("state").userAnswers[i]}`).addClass(
      "incorrect"
    );
  }
}
