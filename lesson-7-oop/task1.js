'use strict'

(function() {
  function Question(question, answer, correctAnswer) {
    this.question = question;
    this.answer = answer;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.showQuestion = function() {
    console.log(this.question);

    for (var i = 0; i < this.answer.length; i++) {
      console.log(i + ': ' + this.answer[i]);
    }
  }

  Question.prototype.checkAnswer = function(answrs) {
    if (answrs == this.correctAnswer) {
      alert('This is correct answer');
    } else {
      alert('This is wrong answer');
    }
  }

  var firstQuestion = new Question('In what year were the first mentions of polymorphism ?',['1983', '1967', '2000'], 1);

  var secondQuestion = new Question('In what year did Javascript appear ?',['1966', '1991', '1996'], 2);

  var thirdQuestion = new Question('In what year did Typescript appear ?', ['2012', '2013', '2014'], 0);

  var listQuestions = [firstQuestion, secondQuestion, thirdQuestion];

  var cq = Math.floor(Math.random() * listQuestions.length); // cq - check question ( to num )

  listQuestions[cq].showQuestion();

  var answers = parseInt(prompt('See in console and type correct number of answer'));

  listQuestions[cq].checkAnswer(answers);
  
})();