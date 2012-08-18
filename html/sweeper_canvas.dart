#import('dart:html');

#import('../lib/sweeper.dart');
#import('../lib/canvas.dart');

main(){
  final CanvasElement sweeperTable = query('#sweeperCanvas');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');
  final gameRoot = new GameRoot(sweeperTable, minesLeftDiv,
      gameStateDiv, clockDiv);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameRoot.newGame());
}
