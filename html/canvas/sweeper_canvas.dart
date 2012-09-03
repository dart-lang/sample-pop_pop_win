#import('dart:html');

#import('../../lib/sweeper.dart');
#import('../../lib/canvas.dart');

main(){
  final targetMode = false;
  final int w = 8, h = 8;
  final int m = (w * h * 0.15625).toInt();

  final CanvasElement sweeperTable = query('#sweeperCanvas');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');
  final gameRoot = new GameRoot(w, h, m,
      sweeperTable, minesLeftDiv, gameStateDiv, clockDiv, targetMode);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameRoot.newGame());

  final ButtonElement flagButton = query('#flag');
  flagButton.on.click.add((args) => gameRoot.toggleTargetFlag());

  final ButtonElement revealButton = query('#reveal');
  revealButton.on.click.add((args) => gameRoot.revealTarget());

  // disable touch events
  window.on.touchMove.add(_onTouchMove);

  final updateButtons = (args) {
    revealButton.disabled = !gameRoot.canRevealTarget;
    flagButton.disabled = !gameRoot.canFlagTarget;
  };

  gameRoot.targetChanged.add(updateButtons);

  updateButtons(null);
}

void _onTouchMove(TouchEvent args) {
  args.preventDefault();
}
