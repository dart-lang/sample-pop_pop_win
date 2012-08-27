#import('dart:html');

#import('../../lib/sweeper.dart');
#import('../../lib/canvas.dart');

main(){
  final targetMode = true;
  final int w = 16, h = 16, m = 40;

  final CanvasElement sweeperTable = query('#sweeperCanvas');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');
  final gameRoot = new GameRoot(w, h, m,
      sweeperTable, minesLeftDiv, gameStateDiv, clockDiv, targetMode);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameRoot.newGame());

  // disable touch events
  window.on.touchMove.add(_onTouchMove);
}

void _onTouchMove(TouchEvent args) {
  args.preventDefault();
}
