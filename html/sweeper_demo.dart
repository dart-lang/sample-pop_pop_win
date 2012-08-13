#import('dart:html');

#import('../lib/sweeper.dart');
#import('../lib/html.dart');

main(){
  final field = new Field();
  final game = new Game(field);

  final DivElement sweeperDiv = query('#sweeper');
  final gameView = new GameView(game, sweeperDiv);
  gameView.draw();
}
