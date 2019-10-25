const optionButton = function(option) {
  return `
  <button value="${option.number}" type="button" class="btn btn-info mb-3 fork"><p>${option.option}</p></button>
  `;
};

const cardBuilder = function(questionIndex) {
  const thisQuestion = questions[questionIndex];
  if (thisQuestion.answer) {
    return answerBuilder(thisQuestion);
  } else if (thisQuestion.answerFunction){
    return `
    <h3>${thisQuestion.question}</h3>
    <br><br>
    ${thisQuestion.options.map(optionButton(option)).join('')}
    `;
  } else {
    return `
    <h3>${thisQuestion.question}</h3>
    <br><br>
    <button id="yes" type="button" class="btn btn-info"><h2>YES</h2></button>
    <button id="no" type="button" class="btn btn-info"><h2>NO</h2></button>
    `;
  }
}




// $(document).ready(function() {
//   $("question").
// });
