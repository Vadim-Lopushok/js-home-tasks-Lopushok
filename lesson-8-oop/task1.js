(function () {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + ': ' + this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function (ans, _callFunc) {
    var cq;

    if (ans === this.correct) {
      console.log('Correct answer!');
      cq = _callFunc(true);
    } else {
      console.log('Wrong answer. Try again :)');
      cq = _callFunc(false);
    }

    this.showScore(cq);
  };

  Question.prototype.showScore = function (scoreFunc) {
    console.log('Curren score is: ' + scoreFunc);
  };

  var q1 = new Question(
    'Is JavaScript the coolest programming language in the world?',
    ['Yes', 'No'],
    0
  );

  var q2 = new Question(
    'What is the name of this courses teacher?',
    ['John', 'Micheal', 'Jonas'],
    2
  );

  var q3 = new Question(
    'What does best describe coding?',
    ['Boring', 'Hard', 'Fun', 'Tediuos'],
    2
  );

  var questions = [q1, q2, q3];

  function scoreFunc() {
    var cq = 0;
    return function (correct) {
      if (correct) {
        cq++;
      }
      return cq;
    };
  }

  var score = scoreFunc();

  function nextQuestion() {
    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = prompt('Please select the correct answer.');
    if (answer !== 'exit') {
      questions[n].checkAnswer(parseInt(answer), score);
      nextQuestion();
    }
  }
  nextQuestion();
})();