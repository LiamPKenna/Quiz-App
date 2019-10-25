const questions = [
  {
    number: 0,
    question: "Do you want to learn a language with more rules (to prevent errors) or more flexibility?",
    answerYes: 1,
    answerNo: 2
  },
  {
    number: 1,
    question: "Do you want to make smartphone apps?",
    answerYes: ,
    answerNo:
  },
  {
    number: 2,
    question: "What do you want to be able to do",
    answerFunction: function(number) {
      if (number === 1) {
        return 'php';
      } else if (number === 2) {
        return 'js';
      } else if (number === 3) {
        return 'python';
      } else {
        return 'ruby';
      }
    }
  },

]
