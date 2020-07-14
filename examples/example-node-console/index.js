const generator = require('../../dist/generators/backtracking');
const renderer = require('../../dist/renderers/text');
const readline = require('readline');

const mazeBacktrackingGenerator =
  new generator.BacktrackingGenerator(21, 21);
const mazeTextRender =
  new renderer.TextRenderer(
      mazeBacktrackingGenerator, '###', '   ', ' * ', ' O ', ' X ', ' @ ',
  );

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(mazeTextRender.render());
rl.setPrompt('Input command (restart, up, down, left, right)> ');
rl.prompt();
rl.on('line', function(line) {
  if (line === 'close') {
    rl.close();
  } else {
    switch (line) {
      case 'restart':
        mazeBacktrackingGenerator.reInit(21, 21);
        break;
      case 'up':
        mazeBacktrackingGenerator.moveUp();
        break;
      case 'down':
        mazeBacktrackingGenerator.moveDown();
        break;
      case 'left':
        mazeBacktrackingGenerator.moveLeft();
        break;
      case 'right':
        mazeBacktrackingGenerator.moveRight();
        break;
    }
    console.log(mazeTextRender.render());
    if (mazeBacktrackingGenerator.isEndPoint(
        mazeBacktrackingGenerator.getCurrentPoint())) {
      console.log('You win!');
    }
  }
  rl.prompt();
}).on('close', function() {
  process.exit(0);
});
