#import('dart:html');
#import('dart:math');

#import('../../lib/sweeper.dart');
#import('../../lib/canvas.dart');

#import('package:dartlib/dartlib.dart');
#import('package:dartlib/retained.dart');

#source('../texture_data.dart');

const String _transparentTextureName = '../dart_transparent_01.png';
const String _opaqueTextureName = '../dart_opaque_01.jpg';

ImageLoader _imageLoader;
List<String> _keys;
int _currentIndex = 0;
CanvasRenderingContext2D __ctx;
Map<String, TextureInput> _textures;

main() {
  _imageLoader = new ImageLoader([_transparentTextureName, _opaqueTextureName]);
  _imageLoader.loaded.add((args) => _doLoad());
  _imageLoader.load();
}

_doLoad() {
  final opaqueImage = _imageLoader.getResource(_opaqueTextureName);
  final transparentImage = _imageLoader.getResource(_transparentTextureName);

  _textures = _getTextures(transparentImage, opaqueImage);

  CanvasElement canvasElement = query('#sweeperCanvas');
  canvasElement.on.click.add((args) => _next());
  __ctx = canvasElement.context2d;

  _keys = new List<String>.from(_textures.getKeys());

  _drawTexture();

  window.on.keyDown.add((KeyboardEvent args) {
    switch(args.keyIdentifier) {
      case "Right":
        _next();
        break;
      case "Left":
        _previous();
        break;
    }
  });
}

void _next() {
  _currentIndex++;
  _drawTexture();
}

void _previous() {
  _currentIndex--;
  _drawTexture();
}

void _drawTexture() {
  _currentIndex %= _keys.length;

  __ctx.clearRect(0, 0, 700, 700);

  assert(_keys != null);

  final key = _keys[_currentIndex];

  final texture = _textures[key];

  print([_currentIndex, key]);

  drawTextureAt(__ctx, new Coordinate(100, 100), texture);

}
