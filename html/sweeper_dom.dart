#import('dart:html');

#import('../lib/sweeper.dart');
#import('../lib/html.dart');

main(){
  final int w = 16, h = 16, m = 40;

  final TableElement sweeperTable = query('#sweeperTable');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');
  final gameView = new GameView(w, h, m,
      sweeperTable, minesLeftDiv, gameStateDiv, clockDiv);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameView.newGame());
}
