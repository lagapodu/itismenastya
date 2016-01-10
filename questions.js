(function() {
  var questions = [{
    question: "What is my fav food?",
    choices: ["Sushi", "Pelmeni", "Carrot", "Vodka with Kartoshka" ],
    correctAnswer: 0
  }, {
    question: "Who is my best friend?",
    choices: ["Itsmenastya", "Taxi drivers", "Yana", "Sylvester Stallone"],
    correctAnswer: 2
  }, {
    question: "What is my dream?",
    choices: ["getting married and have 4 kids", "Business woman", "Walking from Minsk to Cuba", "Being a hamburger designer" ],
    correctAnswer: 1
  }, {
    question: "What kind of guys i like?",
    choices: ["Guys with good popa", "Bus drivers", "Programmists", "Guys who like guys"],
    correctAnswer: 2
  }, {
    question: "What is my fantasy?",
    choices: ["making love with the guy i love", "threesome", "having sex outdoor in -69 degree", "i fucking want Yana" ],
    correctAnswer: 2

  }, {
    question: "Where is my hometown?",
    choices: ["Mozambique", "Neverland", "Podolsk", "I am fucking from where Yana is from" ],
    correctAnswer: 3

  }, {
    question: "I kissed a girl ...?",
    choices: ["and I liked it", " and I was drunk", "and I woke up", "and stuff happened" ],
    correctAnswer: 2

  }, {
    question: "I wish world could have",
    choices: ["more taxi drivers", "more peace", "more Yana", "more clubs which are +18" ],
    correctAnswer: 1

  }, {
    question: "Do you like me?",
    choices: ["yes", "fucking yes", "hell yea", "all above" ],
    correctAnswer: 3

  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('select something bitch!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Kartoshka ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right , Bitch!!!:D');
    return score;
  }
})();
