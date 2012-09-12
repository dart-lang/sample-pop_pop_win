#import('dart:html');
#import('dart:json');
#import('dart:math');

#import('../../lib/sweeper.dart');
#import('../../lib/canvas.dart');

#import('package:dartlib/dartlib.dart');
#import('package:dartlib/retained.dart');

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

  drawTextureAt(__ctx, new Coordinate(100, 100), texture, __textureImg);

}
