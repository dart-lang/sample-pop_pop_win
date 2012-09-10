#import('dart:html');
#import('dart:json');

#import('../../lib/sweeper.dart');
#import('../../lib/canvas.dart');

#source('../canvas/texture_data.dart');

ImageLoader _imageLoader;

main() {
  _imageLoader = new ImageLoader(['art.png']);
  _imageLoader.finished.add((args) => _doLoad());
  _imageLoader.load();
}

_doLoad() {
  final textures = _getTexturesFromJson(_artFramesJson);

  final targetMode = false;
  final int w = 7, h = 7;
  final int m = (w * h * 0.15625).toInt();

  final CanvasElement sweeperTable = query('#sweeperCanvas');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');

  assert(_imageLoader != null);
  assert(_imageLoader.images.containsKey('art.png'));

  final textureImg = _imageLoader.images['art.png'];

  // populate globals
  populateTextures(textures);
  populateTextureImage(textureImg);

  final gameRoot = new GameRoot(w, h, m,
      sweeperTable, minesLeftDiv, gameStateDiv, clockDiv, targetMode);

  // disable touch events
  window.on.touchMove.add(_onTouchMove);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameRoot.newGame());

  /*

  final ButtonElement flagButton = query('#flag');
  flagButton.on.click.add((args) => gameRoot.toggleTargetFlag());

  final ButtonElement revealButton = query('#reveal');
  revealButton.on.click.add((args) => gameRoot.revealTarget());

  final updateButtons = (args) {
    revealButton.disabled = !gameRoot.canRevealTarget;
    flagButton.disabled = !gameRoot.canFlagTarget;
  };

  gameRoot.targetChanged.add(updateButtons);

  updateButtons(null);

  */
}

void _onTouchMove(TouchEvent args) {
  args.preventDefault();
}
