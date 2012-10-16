#import('dart:html');

#import('package:bot/bot.dart');
#import('package:bot/html.dart');
#import('package:bot/texture.dart');
#import('package:poppopwin/poppopwin.dart');
#import('package:poppopwin/canvas.dart');

#source('texture_data.dart');

const String _transparentTextureName = 'images/transparent_animated.png';
const String _opaqueTextureName = 'images/dart_opaque_01.jpg';
const String _transparentStaticTexture = 'images/transparent_static.png';

const List<String> _audioNames =
  const ['Pop0', 'Pop1', 'Pop2', 'Pop3', 'Pop4', 'Pop5', 'Pop6', 'Pop7', 'Pop8',
         'Bomb1', 'Bomb2', 'Bomb3', 'Bomb4', 'Bomb5',
         'throw', 'flag', 'unflag', 'click', 'win'];

const int _loadingBarPxWidth = 398;

DivElement _loadingBar;
ImageLoader _imageLoader;
AudioLoader _audioLoader;

main() {
  _loadingBar = query('.sprite.loading_bar');
  _loadingBar.style.display = 'block';
  _loadingBar.style.width = '0';

  _imageLoader = new ImageLoader([_transparentTextureName,
                                  _opaqueTextureName]);
  _imageLoader.loaded.add(_onLoaded);
  _imageLoader.progress.add(_onProgress);
  _imageLoader.load();

  //
  // This code might fail wonderfully on systems that don't support
  // AudioContext
  //
  if(supportsAudio) {
    final audioContext = new AudioContext();
    _audioLoader = new AudioLoader(audioContext, _getAudioPaths(_audioNames));
    _audioLoader.loaded.add(_onLoaded);
    _audioLoader.progress.add(_onProgress);
    _audioLoader.load();
  }
}

bool get supportsAudio {
  final isChrome = window.clientInformation.userAgent.contains("Chrome");
  return isChrome;
}

void _onProgress(args) {
  int completedBytes = _imageLoader.completedBytes;
  int totalBytes = _imageLoader.totalBytes;

  if(_audioLoader != null) {
    completedBytes += _audioLoader.completedBytes;
    totalBytes += _audioLoader.totalBytes;
  }

  final percent = completedBytes / totalBytes;
  final percentClean = (percent * 1000).floor() / 10;

  final barWidth = percent * _loadingBarPxWidth;
  _loadingBar.style.width = '${barWidth.toInt()}px';
}

void _onLoaded(args) {
  if(_imageLoader.state == ResourceLoader.StateLoaded &&
      (_audioLoader == null || _audioLoader.state == ResourceLoader.StateLoaded)) {

    //
    // load textures
    //
    final opaqueImage = _imageLoader.getResource(_opaqueTextureName);
    final transparentImage = _imageLoader.getResource(_transparentTextureName);

    // already loaded. Used in CSS.
    final staticTransparentImage = new ImageElement(_transparentStaticTexture);

    final textures = _getTextures(transparentImage, opaqueImage, staticTransparentImage);

    final textureData = new TextureData(textures);

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
    query('#loading').style.display = 'none';
    _runppw(textureData);
  }
}

void _runppw(TextureData textureData) {
  final size = _processUrlHash() ? 16 : 7;
  final int m = (size * size * 0.15625).toInt();

  final CanvasElement poppopwinTable = query('#gameCanvas');
  final gameRoot = new GameRoot(size, size, m, poppopwinTable, textureData);

  // disable touch events
  window.on.touchMove.add((args) => args.preventDefault());
  window.on.popState.add((args) => _processUrlHash());

  window.on.keyDown.add(_onKeyDown);

  query('#popup').on.click.add(_onPopupClick);

  titleClickedEvent.add((args) => _toggleAbout(true));
}

void _onPopupClick(MouseEvent args) {
  if(!(args.toElement is AnchorElement)) {
    _toggleAbout(false);
  }
}

void _onKeyDown(KeyboardEvent args) {
  switch(args.keyCode) {
    case 27: // esc
      _toggleAbout(false);
      break;
    case 72: // h
      _toggleAbout();
      break;
  }
}

void _toggleAbout([bool value = null]) {
  final LocalLocation loc = window.location;
  // ensure we treat empty hash like '#', which makes comparison easy later
  final hash = loc.hash.length == 0 ? '#' : loc.hash;

  final isOpen = hash == '#about';
  if(value == null) {
    // then toggle the current value
    value = !isOpen;
  }

  var targetHash = value ? '#about' : '#';
  if(targetHash != hash) {
    loc.assign(targetHash);
  }
}

String _getAudioPath(String name) => 'audio/$name.webm';

Iterable<String> _getAudioPaths(Iterable<String> names) {
  return $(names).map(_getAudioPath);
}

bool _processUrlHash() {
  final LocalLocation loc = window.location;
  final hash = loc.hash;
  final href = loc.href;

  final LocalHistory history = window.history;
  bool showAbout = false;
  switch(hash) {
    case "#reset":
      assert(href.endsWith(hash));
      var newLoc = href.substring(0, href.length - hash.length);

      window.localStorage.clear();

      loc.replace(newLoc);
      break;
    case '#big':
      return true;
    case '#about':
      showAbout = true;
      break;
  }

  query('#popup').style.display = showAbout ? 'inline-block' : 'none';

  return false;
}
