#import('dart:html');

#import('../lib/sweeper.dart');
#import('../lib/html.dart');

main(){
  final TableElement sweeperTable = query('#sweeperTable');
  final DivElement minesLeftDiv = query('#minesLeft');
  final DivElement gameStateDiv = query('#gameState');
  final DivElement clockDiv = query('#clock');
  final gameView = new GameView(sweeperTable, minesLeftDiv,
      gameStateDiv, clockDiv);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameView.newGame());
}
