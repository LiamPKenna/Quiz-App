// GLOBAL VARIABLES
var currentQuestion = 0;
var backgroundColorIndex = 0;
var name = "";
var done = false;
var quizInfo = {};
var questionsAndAnswers = [];
var ready = false;


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
  return backgroundColors[backgroundColorIndex];
};


// TEMPLATING
const quizOptionButtonBuilder = function(quizOptions) {
  const quizOptionButton = function(quizOption) {
    return `
      <button class="path btn btn-danger" type="button" value="${quizOption.number}">${quizOption.buttonText}</button>
    `;
  };
  return quizOptions.map(quizOptionButton).join('<br>');
}

const headerBuilder = function(quizInfo) {
  return `
    <h1>${quizInfo.title}</h1>
    <h5>${quizInfo.subTitle}</h5>
  `
}

const answerBuilder = function(answer) {
  return `
    <h2 class="result">${name} should ${answer.answer}!</h2>
    <h4>${answer.answerText}</h4>
    <br>
    <div class="logo-wrap">
      <img src="${answer.imageSrc}" alt="${answer.answer}" class="logo">
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
const getCardIndex = function(yesOrNo, forkNumber) {
  done = false;
  if (yesOrNo === "yes") {
    return questionsAndAnswers[currentQuestion].answerYes;
  } else if (yesOrNo === "no") {
    return questionsAndAnswers[currentQuestion].answerNo;
  } else {
    return forkNumber;
  };
};

const cardBuilder = function(yesOrNo, forkNumber) {
  currentQuestion = getCardIndex(yesOrNo, forkNumber);
  const thisQuestion = questionsAndAnswers[currentQuestion];
  if (thisQuestion.answer) {
    done = true;
    return answerBuilder(thisQuestion);
  } else if (thisQuestion.options){
    return forkCardBuilder(thisQuestion);
  } else {
    return yesNoBuilder(thisQuestion);
  };
};

const setPath = function(path) {
  let quizName = quizOptions[path].name;
  quizInfo = eval(`${quizName}Info`);
  questionsAndAnswers = eval(`${quizName}QAndA`);
  ready = true;
  return null;
};


// USER INTERFACE
$(document).ready(function() {
  $(".quiz-options").append(quizOptionButtonBuilder(quizOptions));
  $(".choose-path-modal").modal("show");

  $(".path").click(function(event) {
    let path = parseInt($(event.target).val());
    setPath(path);
    $(".jumbotron").text('');
    $(".jumbotron").append(headerBuilder(quizInfo));
    $(".choose-path-modal").modal("hide");
  });

  $(".question").on("click", "#yes", function() {
    $(".question").text('');
    $(".question").append(cardBuilder("yes", null));
  });

  $(".question").on("click", "#no", function() {
    $(".question").text('');
    $(".question").append(cardBuilder("no", null));
  });

  $(".question").on("click", ".fork", function(event) {
    $(".question").text('');
    let forkNumber = parseInt($(event.target).val());
    $(".question").append(cardBuilder("fork", forkNumber));
  });

  $(".question").on("click", ".start", function() {
    $(".question").text('');
    $(".question").append(cardBuilder("restart", 0));
    $(".logo").hide();
  });

  $(".question").on("click", ".begin", function() {
    if (ready) {
      if ($("#name").val()) {
        name = $("#name").val();
        $(".question").text('');
        $(".question").append(cardBuilder("begin", 0));
      } else {
        $(".no-name-modal").modal("show");
      };
    } else {
      $(".choose-path-modal").modal("show");
    };
  });

  $(".question").on("click", ".btn", function() {
    let newBackground = backgroundIncrementer();
    $(".wrap").css("background-color", newBackground);
    $("body").css("background-color", newBackground);
    if (done) {
      $(".logo").fadeIn(1000);
    }
  })

});
