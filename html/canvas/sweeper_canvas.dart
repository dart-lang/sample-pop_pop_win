#import('dart:html');
#import('dart:json');

#import('../../lib/sweeper.dart');
#import('../../lib/canvas.dart');

#source('../canvas/texture_data.dart');

const String _sampleAudio = '../audio/Pop01.webm';

ImageLoader _imageLoader;
AudioLoader _audioLoader;

main() {
  _imageLoader = new ImageLoader(['art.png']);
  _imageLoader.loaded.add(_onLoaded);
  _imageLoader.progress.add(_onLoaded);
  _imageLoader.load();

  final audioContext = new AudioContext();

  _audioLoader = new AudioLoader(audioContext, [_sampleAudio]);
  _audioLoader.loaded.add(_onLoaded);
  _audioLoader.progress.add(_onLoaded);
  _audioLoader.load();
}

void _onLoaded(args) {
  print(_imageLoader.completedCount + _audioLoader.completedCount);
  if(_imageLoader.state == ResourceLoader.StateLoaded &&
      _audioLoader.state == ResourceLoader.StateLoaded) {
    _runSweeper();
  }
}

void _runSweeper() {
  _playSampleAudio();
  final textures = _getTexturesFromJson(_artFramesJson);

  final targetMode = false;
  final int w = 7, h = 7;
  final int m = (w * h * 0.15625).toInt();

  final CanvasElement sweeperTable = query('#sweeperCanvas');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');

  assert(_imageLoader != null);

  final textureImg = _imageLoader.getResource('art.png');
  assert(textureImg != null);

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


void _playSampleAudio() {
  final context = _audioLoader.context;
  // Create two sources and play them both together.
  var source = context.createBufferSource();

  source.buffer = _audioLoader.getResource(_sampleAudio);
  source.connect(context.destination, 0);
  source.noteOn(0);
}
