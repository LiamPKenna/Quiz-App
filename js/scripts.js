var currentQuestion = 0;

const optionButton = function(option) {
  return `
  <button value="${option.number}" type="button" class="btn btn-info mb-3 fork"><p>${option.option}</p></button>
  `;
};

const answerBuilder = function(answer) {
  return `
  <h2>You should learn ${answer.answer}!</h2>
  <br><br>
  <h4>${answer.answerText}</h4>
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
  });
  $(".question").on("click", "#no", function(event) {
    $(".question").text('');
    $(".question").append(cardBuilder(questions[currentQuestion].answerNo));
  });
});
