// GLOBAL VARIABLES
var currentQuestion = 0;
var backgroundColorIndex = 0;
var name = "";
var done = false;

// FOR BACKGROUND COLOR CHANGES
const backgroundColors = [
  "#6dbbe8",
  "#5cbd9e",
  "#5cbdb7",
  "#54aba0",
  "#54ab8f",
  "#695cbd",
  "#8d5cbd",
  "#bd5c8d",
  "#bd5c6b"
];

const backgroundIncrementer = function() {
  if (backgroundColorIndex === (backgroundColors.length - 1)) {
    backgroundColorIndex = 0;
  } else {
    backgroundColorIndex += 1;
  }
};


// TEMPLATING
const answerBuilder = function(answer) {

  const getLogo = function(thisAnswer) {
    if (thisAnswer.answer === "C#") {
      return 'img/c-sharp.png';
    } else {
      return `img/${thisAnswer.answer.toLowerCase()}.png`;
    }
  };

  let logo = getLogo(answer);

  return `
  <h2 class="result">${name} should learn ${answer.answer}!</h2>
  <h4>${answer.answerText}</h4>
  <br>
  <div class="logo-wrap">
    <img src="${logo}" alt="${answer.answer}" class="logo">
  </div>
  <br><br>
  <button type="button" class="btn btn-info start"><h2>START OVER</h2></button>
  `;
};

const forkCardBuilder = function(thisQuestion) {

  const optionButton = function(option) {
    return `
    <button value="${option.number}" type="button" class="btn btn-info mb-3 fork">${option.option}</button>
    `;
  };

  return `
  <h3>${thisQuestion.question}</h3>
  <br><br>
  ${thisQuestion.options.map(optionButton).join('')}
  `;
};

const yesNoBuilder = function(thisQuestion) {
  return `
  <h3>${thisQuestion.question}</h3>
  <br><br>
  <div class="y-n-wrap">
  <button id="yes" type="button" class="btn btn-info y-n"><h2>YES</h2></button>
  <button id="no" type="button" class="btn btn-info y-n"><h2>NO</h2></button>
  </div>
  `;
};


// MAIN LOGIC
const cardBuilder = function(questionIndex) {
  const thisQuestion = questionsAndAnswers[questionIndex];
  if (thisQuestion.answer) {
    done = true;
    return answerBuilder(thisQuestion);
  } else if (thisQuestion.options){
    return forkCardBuilder(thisQuestion);
  } else {
    return yesNoBuilder(thisQuestion);
  };
};


// USER INTERFACE
$(document).ready(function() {

  $(".question").on("click", "#yes", function() {
    $(".question").text('');
    $(".question").append(cardBuilder(questionsAndAnswers[currentQuestion].answerYes));
    currentQuestion = questionsAndAnswers[currentQuestion].answerYes;
  });

  $(".question").on("click", "#no", function() {
    $(".question").text('');
    $(".question").append(cardBuilder(questionsAndAnswers[currentQuestion].answerNo));
    currentQuestion = questionsAndAnswers[currentQuestion].answerNo;
  });

  $(".question").on("click", ".fork", function(event) {
    $(".question").text('');
    let forkNumber = parseInt($(event.target).val());
    $(".question").append(cardBuilder(forkNumber));
    currentQuestion = questionsAndAnswers[currentQuestion].answerNo;
  });

  $(".question").on("click", ".start", function() {
    currentQuestion = 0;
    $(".question").text('');
    $(".question").append(cardBuilder(currentQuestion));
    done = false;
    $(".logo").hide();
  });

  $(".question").on("click", ".begin", function() {
    currentQuestion = 0;
    if ($("#name").val()) {
      name = $("#name").val();
      $(".question").text('');
      $(".question").append(cardBuilder(currentQuestion));
    } else {
      $(".no-name-modal").modal("show");
    }
  });

  $(".question").on("click", ".btn", function() {
    backgroundIncrementer();
    $(".wrap").css("background-color", backgroundColors[backgroundColorIndex]);
    $("body").css("background-color", backgroundColors[backgroundColorIndex]);
    if (done) {
      $(".logo").fadeIn(1000);
    }
  })

});
