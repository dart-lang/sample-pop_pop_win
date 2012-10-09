#import('dart:html');

#import('package:sweeper.dart/sweeper.dart');
#import('package:sweeper.dart/html.dart');

main(){
  final int w = 16, h = 16, m = 40;

  final TableElement sweeperTable = query('#sweeperTable');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');
  final gameView = new GameView(w, h, m,
      sweeperTable, minesLeftDiv, gameStateDiv, clockDiv);

  final DivElement highScoreDiv = query('#highScore');
  final highScoreView = new HighScoreView(gameView, highScoreDiv);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameView.newGame());
}
