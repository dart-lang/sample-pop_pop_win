#import('dart:html');

#import('package:poppopwin/poppopwin.dart');
#import('package:poppopwin/html.dart');

main(){
  final int w = 16, h = 16, m = 40;

  final TableElement poppopwinTable = query('#gameTable');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');
  final gameView = new GameView(w, h, m,
      poppopwinTable, minesLeftDiv, gameStateDiv, clockDiv);

  final DivElement highScoreDiv = query('#highScore');
  final highScoreView = new HighScoreView(gameView, highScoreDiv);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameView.newGame());
}