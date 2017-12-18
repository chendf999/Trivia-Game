
$(document).ready(function() {

  var trivia = [
    question1 = {
      question: 'Which of the following made up the largest group of the Egyptian social classes?',
      answer: 'Unskilled Workers',
      a: 'Unskilled Workers',
      b: 'Pharaoh',
      c: 'Priests and Nobles',
      d: 'Farmers',
    },

    question2 = {
      question: 'The Great Pyramid was built for which pharaoh?',
      answer: 'King Khufu',
      a: 'Ramses II',
      b: 'Narmer',
      c: 'Akhenaton',
      d: 'King Khufu',
    }
  ];


  var timeRemain = 30;
  var countdown;
  var questionIndex = 0;
  var questionObject;

/*-------------------------------------
| get a new question
-------------------------------------*/

  getQuestion();

  function getQuestion(){
    if (questionIndex === trivia.length){
      showResult();
      return
    }
    else {
      var question = trivia[questionIndex].question;
      questionObject = trivia[questionIndex];

      $('.question-result').html(question);

      var arr = Object.values(questionObject);
      for (var i=2; i<arr.length; i++){
        $('.choice').append('<h2>'+ arr[i] +'</h2>');
        console.log(arr[i]);
      }

      timeRemain = 30;
      timeRun();
    }
  }

/* if question is answered -------------------------------*/

  $('.choice h2').on('click', userChoose);
  function userChoose(){
    timeStop();

    var correctAnswer = questionObject.answer;
    var userAnswer = $(this).html();

    if (userAnswer === correctAnswer){
      $('.question-result').html('Correct');
      $('.choice').empty();
      questionIndex++;

      getQuestion();
      return
    }
    else {
      $('.question-result').html('Nope!');
      showAnswer();
    }
  }

  function showAnswer(){
    var correctAnswer = questionObject.answer;
    $('.answer').html('<h2>The Correct Answer was: ' + correctAnswer + ' !</h2>');

    $('.choice').empty();
    $('.answer').show();

    questionIndex++;
    getQuestion();
  }

/* timer -------------------------------*/

  function timeRun(){ countdown = setInterval(timer, 1000);}

  function timeStop(){ clearInterval(countdown);}

  function timer(){
    timeRemain--;
    $('.timer span').html(' '+ timeRemain +'s');

    if (timeRemain === 20){
      $('.question-result').html('Out of time');
      timeStop();
      showAnswer();
    }
  }

/* all questions answered show resulted -------------------------------*/

  function showResult(){
    $('.trivia').hide();
    $('.result').show();
    console.log('You have answered all questions.');
  }

});
