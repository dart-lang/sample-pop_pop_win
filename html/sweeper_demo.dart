#import('dart:html');

#import('../lib/sweeper.dart');
#import('../lib/html.dart');

main(){
  final field = new Field();
  final game = new Game(field);

  final TableElement sweeperTable = query('#sweeperTable');
  final gameView = new GameView(game, sweeperTable);
}
