
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
    },
    //
    // question3 = {
    //   question: 'Identify which of the following provided protection against attack from invaders for the Egyptians. ',
    //   answer: 'Deserts and cataracts',
    //   a: 'Fertile soil',
    //   b: 'Papyrus fields',
    //   c: 'Deserts and cataracts',
    //   d: 'Pyramids',
    // },
    //
    // question4 = {
    //   question: 'Ahkenaton and King Tut represent a line of rulers from the same family. This is called a ___.',
    //   answer: 'Dynasty',
    //   a: 'Temple',
    //   b: 'Pyramid',
    //   c: 'Social class',
    //   d: 'Dynasty',
    // },
    //
    // question5 = {
    //   question: 'The Nile River flows from ____ to ____.',
    //   answer: 'South to north',
    //   a: 'South to north',
    //   b: 'North to south',
    //   c: 'West to east',
    //   d: 'East to west',
    // },
    //
    // question6 = {
    //   question: 'The Egyptians willingly served their all-powerful pharaoh because ______.',
    //   answer: 'The pharaoh was a god on earth.',
    //   a: 'The pharaoh was a god on earth.',
    //   b: 'The pharaoh\'s wealth meant power.',
    //   c: 'They didn\'t like to follow the priests.',
    //   d: 'They could not elect a new pharaoh for another four years.',
    // },
    //
    // question7 = {
    //   question: 'The ancient Egyptian civilization was the first to have specialists in the field of ____.',
    //   answer: 'Mathematics',
    //   a: 'Mathematics',
    //   b: 'Irrigation',
    //   c: 'Astronomy',
    //   d: 'Medicine',
    // },
    //
    // question8 = {
    //   question: 'Isis ruled over the Underworld with her husband, _____.',
    //   answer: 'Osiris',
    //   a: 'Hapi',
    //   b: 'Osiris',
    //   c: 'Deumutef',
    //   d: 'Quebensenuf',
    // },
    //
    // question9 = {
    //   question: 'If you were a scribe in ancient Egypt, what type of writing would you use?',
    //   answer: 'Hieroglyphics',
    //   a: 'Arabic',
    //   b: 'Cuneiform',
    //   c: 'Nubian',
    //   d: 'Hieroglyphics',
    // },
    //
    // question10 = {
    //   question: 'Which type of reed plant would you use to make sandals, baskets, river rafts, and paper in ancient Egypt?',
    //   answer: 'Papyrus',
    //   a: 'Papyrus',
    //   b: 'Canary grass',
    //   c: 'Yarrow',
    //   d: 'Knotweed',
    // }
  ];


  var timeRemain = 30;
  var countdown;
  var questionIndex = 0;
  var questionObject;

  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;

/*-------------------------------------
| start the game
-------------------------------------*/

$('.timer, .trivia, .result').hide();

$('.start').on('click', function(){
  getQuestion();
  $('.landing').hide();
  $('.timer, .trivia').show();
});

/*-------------------------------------
| get a question
-------------------------------------*/

  function getQuestion(){
    if (questionIndex === trivia.length){
      showResult();
      return
    }
    else {
      $('.answer').hide();

      var question = trivia[questionIndex].question;
      questionObject = trivia[questionIndex];

      $('.question-result').html(question);

      var arr = Object.values(questionObject);
      for (var i=2; i<arr.length; i++){
        $('.choice').append('<h2>'+ arr[i] +'</h2>');
        console.log(arr[i]);
      }

      timeRemain = 30;
      $('.timer span').html(' '+ timeRemain +'s');
      timeRun();
    }
  }

/*-------------------------------------
| question is answered
-------------------------------------*/

  $(document).on('click','.choice h2', userChoose);
  function userChoose(){
    timeStop();

    var correctAnswer = questionObject.answer;
    var userAnswer = $(this).html();

    /* correct -------------------------------*/
    if (userAnswer === correctAnswer){
      $('.question-result').html('Correct');
      $('.choice h2').detach();
      correct++;

      questionIndex++;
      setTimeout(getQuestion,3000);
      return
    }

    /* incorrect -------------------------------*/
    else {
      $('.question-result').html('Nope!');
      incorrect++;
      showAnswer();
    }
  }

  function showAnswer(){
    var correctAnswer = questionObject.answer;
    $('.answer').html('<h2>The Correct Answer was: ' + correctAnswer + '!</h2>');

    $('.choice h2').detach();
    $('.answer').show();

    questionIndex++;
    setTimeout(getQuestion,3000);
  }

/*-------------------------------------
| timer
-------------------------------------*/

  function timeRun(){ countdown = setInterval(timer, 1000);}
  function timeStop(){ clearInterval(countdown);}

  function timer(){
    timeRemain--;
    $('.timer span').html(' '+ timeRemain +'s');

    /* unanswered -------------------------------*/
    if (timeRemain === 0){
      $('.question-result').html('Out of time');
      unanswered++;
      timeStop();
      showAnswer();
    }
  }

/*-------------------------------------
| result and restart
-------------------------------------*/

  function showResult(){
    $('.correct').html(correct);
    $('.incorrect').html(incorrect);
    $('.unanswered').html(unanswered);

    $('.trivia').hide();
    $('.result').show();
  }

  $('.restart').on('click', function(){
    questionIndex = 0;
    $('.result').hide();
    $('.trivia').show();
    getQuestion();
  });

});
