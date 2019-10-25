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
        return 7;
      } else if (number === 2) {
        return 8;
      } else if (number === 3) {
        return 'python';
      } else {
        return 'ruby';
      }
    };
  },
  {
    number: 3,
    question: "Do you want to make smartphone apps?",
    answerYes: 5,
    answerNo: 4
  },
  {
    number: 4,
    question: "Can you sell your soul to Microsoft?",
    answerYes: 6,
    answerNo: 5
  },
  {
    number: 5,
    answer: "Java",
    answerText: "It's a language that can be run 'anywhere' and is the language of Android. (Swift could be a good choice as well)"
  },
  {
    number: 6,
    answer: "C#",
    answerText: "It's a language with many similarities to Java with even more features."
  },
  {
    number: 7,
    answer: "PHP",
    answerText: "It was all the rage in the 90's and still has many popular scripts."
  },
  {
    number: 8,
    answer: "JavaScript",
    answerText: "Is run all over the place and is the native language of the web. With the increasing popularity of Node.js, it is showing up in more and more places."
  },
  {
    number: 9,
    answer: "Python",
    answerText: "It's a popular app for big data and science with an emphasis on readability."
  },
  {
    number: 10,
    answer: "Ruby",
    answerText: "It is clean, readable and a powerful tool for building webpages and more."
  },
]
