var currentQuestion = 0;
var backgroundColorIndex = 0;
var name = "";
var done = false;

const backgroundIncrementer = function() {
  if (backgroundColorIndex === (backgroundColors.length - 1)) {
    backgroundColorIndex = 0;
  } else {
    backgroundColorIndex += 1;
  }
}

const backgroundColors = [
  "#6dbbe8",
  "#5cbd9e",
  "#5cbdb7",
  "#54aba0",
  "#54ab8f"
]

const optionButton = function(option) {
  return `
  <button value="${option.number}" type="button" class="btn btn-info mb-3 fork">${option.option}</button>
  `;
};

const getLogo = function(answer) {
  let choice = '';
  if (answer.answer === "C#") {
    choice = 'c-sharp';
  } else {
    choice = answer.answer.toLowerCase();
  }
  return `img/${choice}.png`
}

const answerBuilder = function(answer) {
  done = true;
  let logo = getLogo(answer);
  return `
  <h2>${name} should learn ${answer.answer}!</h2>
  <h4>${answer.answerText}</h4>
  <br>
  <button type="button" class="btn btn-info start"><h2>START OVER</h2></button>
  <br><br>
  <div class="logo-wrap">
    <img src="${logo}" alt="${answer.answer}" class="logo">
  </div>
  `;
}

const cardBuilder = function(questionIndex) {
  const thisQuestion = questions[questionIndex];
  if (thisQuestion.answer) {
    return answerBuilder(thisQuestion);
  } else if (thisQuestion.answerFunction){
    return `
    <h3>${thisQuestion.question}</h3>
    <br><br>
    ${thisQuestion.options.map(optionButton).join('')}
    `;
  } else {
    return `
    <h3>${thisQuestion.question}</h3>
    <br><br>
    <button id="yes" type="button" class="btn btn-info y-n"><h2>YES</h2></button>
    <button id="no" type="button" class="btn btn-info y-n"><h2>NO</h2></button>
    `;
  }
}

$(document).ready(function() {

  $(".question").on("click", "#yes", function(event) {
    $(".question").text('');
    $(".question").append(cardBuilder(questions[currentQuestion].answerYes));
    currentQuestion = questions[currentQuestion].answerYes;
  });

  $(".question").on("click", "#no", function(event) {
    $(".question").text('');
    $(".question").append(cardBuilder(questions[currentQuestion].answerNo));
    currentQuestion = questions[currentQuestion].answerNo;
  });

  $(".question").on("click", ".fork", function(event) {
    $(".question").text('');
    let forkNumber = parseInt($(event.target).val());
    $(".question").append(cardBuilder(questions[currentQuestion].answerFunction(forkNumber)));
    currentQuestion = questions[currentQuestion].answerNo;
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
      alert("Please enter your name to continue!");
    }
  });

  $(".question").on("click", ".btn", function() {
    backgroundIncrementer();
    $("body").css("background-color", backgroundColors[backgroundColorIndex]);
    if (done) {
      $(".logo").fadeIn(1000);
    }
  })

});
