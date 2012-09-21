#import('dart:html');

#import('package:dartlib/dartlib.dart');
#import('package:sweeper.dart/sweeper.dart');
#import('package:sweeper.dart/canvas.dart');

#source('texture_data.dart');

const String _transparentTextureName = 'dart_transparent_01.png';
const String _opaqueTextureName = 'dart_opaque_01.jpg';

const List<String> _audioNames =
  const ['Pop0', 'Pop1', 'Pop2', 'Pop3', 'Pop4', 'Pop5', 'Pop6', 'Pop7', 'Pop8',
         'Bomb1', 'Bomb2', 'Bomb3', 'Bomb4', 'Bomb5'];

ImageLoader _imageLoader;
AudioLoader _audioLoader;

main() {
  _imageLoader = new ImageLoader([_transparentTextureName, _opaqueTextureName]);
  _imageLoader.loaded.add(_onLoaded);
  _imageLoader.progress.add(_onLoaded);
  _imageLoader.load();


  //
  // This code might fail wonderfully on systems that don't support
  // AudioContext
  //
  final audioContext = new AudioContext();
  _audioLoader = new AudioLoader(audioContext, _getAudioPaths(_audioNames));
  _audioLoader.loaded.add(_onLoaded);
  _audioLoader.progress.add(_onLoaded);
  _audioLoader.load();
}

void _onLoaded(args) {
  if(_imageLoader.state == ResourceLoader.StateLoaded &&
      (_audioLoader == null || _audioLoader.state == ResourceLoader.StateLoaded)) {

    //
    // load textures
    //
    final opaqueImage = _imageLoader.getResource(_opaqueTextureName);
    final transparentImage = _imageLoader.getResource(_transparentTextureName);

    final textures = _getTextures(transparentImage, opaqueImage);

    populateTextures(textures);

    //
    // load audio -- if we have a context
    //
    if(_audioLoader != null) {
      var map = new Map<String, AudioBuffer>();
      for(final name in _audioNames) {
        final path = _getAudioPath(name);
        map[name] = _audioLoader.getResource(path);
      }

      populateAudio(_audioLoader.context, map);
    }

    // run the app
    _runSweeper();
  }
}

void _runSweeper() {
  final targetMode = false;
  final int w = 7, h = 7;
  final int m = (w * h * 0.15625).toInt();

  final CanvasElement sweeperTable = query('#sweeperCanvas');
  final Element gameStateDiv = query('#gameState');


  final gameRoot = new GameRoot(w, h, m, sweeperTable, targetMode);

  // disable touch events
  window.on.touchMove.add(_onTouchMove);

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

String _getAudioPath(String name) => 'audio/$name.webm';

Iterable<String> _getAudioPaths(Iterable<String> names) {
  return $(names).map(_getAudioPath);
}
