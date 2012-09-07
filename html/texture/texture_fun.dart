#import('dart:html');
#import('dart:json');
#import('dart:math');

#import('../../lib/sweeper.dart');
#import('../../lib/canvas.dart');

#import('package:dartlib/lib/dartlib.dart', prefix:'dartlib');
#import('package:dartlib/lib/retained.dart');

#source('../canvas/texture_data.dart');

const String _fileName = '../canvas/art.png';

ImageLoader _imageLoader;
List<String> _keys;
int _currentIndex = 0;
CanvasRenderingContext2D __ctx;
Map<String, TextureInput> _textures;
ImageElement __textureImg;

main() {
  _imageLoader = new ImageLoader([_fileName]);
  _imageLoader.finished.add((args) => _doLoad());
  _imageLoader.load();
}

_doLoad() {
  _textures = _getTexturesFromJson(_artFramesJson);

  CanvasElement canvasElement = query('#sweeperCanvas');
  canvasElement.on.click.add((args) => _next());
  __ctx = canvasElement.context2d;

  assert(_imageLoader != null);
  assert(_imageLoader.images.containsKey(_fileName));
  __textureImg = _imageLoader.images[_fileName];

  _keys = new List<String>.from(_textures.getKeys());

  _next();

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
  _currentIndex %= _keys.length;
  _drawTexture(_currentIndex);
}

void _previous() {
  _currentIndex--;
  _currentIndex %= _keys.length;
  _drawTexture(_currentIndex);
}

void _drawTexture(int index) {
  __ctx.clearRect(0, 0, 700, 700);

  assert(_keys != null);
  assert(index >= 0 && index < _keys.length);

  final key = _keys[_currentIndex];
  print(key);

  final texture = _textures[key];

  drawTextureAt(__ctx, new dartlib.Coordinate(350, 350), texture, __textureImg);

}
