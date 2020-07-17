const game = document.getElementById('game_maze');
const restart = game.querySelector('.restart');
const up = game.querySelector('.up');
const down = game.querySelector('.down');
const left = game.querySelector('.left');
const right = game.querySelector('.right');
const message = game.querySelector('.message');

const render = function() {
  window.mazeCanvasRender.render();
  if (window.mazeBacktrackingGenerator.isEndPoint(
      window.mazeBacktrackingGenerator.getCurrentPoint())) {
    message.innerHTML = 'You win!';
  } else {
    message.innerHTML = '';
  }
};

const callAction = function(action) {
  switch (action) {
    case 'up':
    case 'ArrowUp':
      window.mazeBacktrackingGenerator.moveUp();
      break;
    case 'down':
    case 'ArrowDown':
      window.mazeBacktrackingGenerator.moveDown();
      break;
    case 'left':
    case 'ArrowLeft':
      window.mazeBacktrackingGenerator.moveLeft();
      break;
    case 'right':
    case 'ArrowRight':
      window.mazeBacktrackingGenerator.moveRight();
      break;
    case 'restart':
    case 'Space':
      window.mazeBacktrackingGenerator.reInit(41, 41);
      break;
  }
  render();
};

const voiceControl = function() {
  const actions = ['restart', 'up', 'down', 'left', 'right'];
  const grammar = '#JSGF V1.0; grammar phrase; public <actions> = ' + actions +
    ';';
  window.SpeechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition;
  window.SpeechGrammarList = window.SpeechGrammarList ||
    window.webkitSpeechGrammarList;

  // eslint-disable-next-line no-undef
  const recognition = new SpeechRecognition();

  // eslint-disable-next-line no-undef
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener('end', () => {
    recognition.start();
  });

  recognition.addEventListener('result', (e) => {
    const action = Array.from(e.results).
        map((result) => result[0].transcript.toLowerCase())[0];
    if (actions.indexOf(action) !== -1) {
      callAction(action);
    } else {
      message.innerHTML = 'Say again!';
    }
  });

  recognition.start();
};

const init = function() {
  const isSupported = window.SpeechRecognition != null ||
    window.webkitSpeechRecognition != null;
  if (!isSupported) {
    message.innerHTML = 'SpeechRecognition API not supported';
  } else {
    voiceControl();
  }
  render();
};

init();

document.addEventListener('keydown', function(event) {
  callAction(event.code);
});
restart.addEventListener('click', function() {
  callAction('restart');
});
up.addEventListener('click', function() {
  callAction('up');
});
down.addEventListener('click', function() {
  callAction('down');
});
left.addEventListener('click', function() {
  callAction('left');
});
right.addEventListener('click', function() {
  callAction('right');
});
