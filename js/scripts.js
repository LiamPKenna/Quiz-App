var currentQuestion = 0;

const optionButton = function(option) {
  return `
  <button value="${option.number}" type="button" class="btn btn-info mb-3 fork">${option.option}</button>
  `;
};

const answerBuilder = function(answer) {
  return `
  <h2>You should learn ${answer.answer}!</h2>
  <br><br>
  <h4>${answer.answerText}</h4>
  <br><br>
  <button type="button" class="btn btn-info start"><h2>START OVER</h2></button>
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
  });

});
