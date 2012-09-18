#library('sweeper-canvas');

#import('dart:html');
#import('dart:math');
#import('package:dartlib/dartlib.dart');
#import('package:dartlib/html.dart');
#import('package:dartlib/retained.dart');
#import('sweeper.dart');
#import('html.dart');

#source('canvas/game_root.dart');
#source('canvas/game_element.dart');
#source('canvas/board_element.dart');
#source('canvas/game_background_element.dart');
#source('canvas/square_element.dart');
#source('canvas/resource_loader.dart');
#source('canvas/image_loader.dart');
#source('canvas/audio_loader.dart');
#source('canvas/texture_animation_element.dart');
#source('canvas/score_element.dart');
#source('canvas/new_game_element.dart');

#source('texture/texture_input.dart');

Map<String, TextureInput> _textures;

Map<String, AudioBuffer> _buffers;
AudioContext _audioContext;

void populateAudio(AudioContext context, Map<String, AudioBuffer> buffers) {
  assert(context != null);
  assert(buffers != null);
  assert(_audioContext == null);

  _audioContext = context;
  _buffers = buffers;
}

void playAudio(String name) {
  if(_audioContext != null) {
    var source = _audioContext.createBufferSource();
    source.buffer = _buffers[name];
    source.connect(_audioContext.destination, 0);
    source.noteOn(0);
  }
}

void populateTextures(Map<String, TextureInput> textures) {
  assert(_textures == null);
  assert(textures != null);
  _textures = textures;
}

TextureInput getTexture(String key) {
  assert(_textures != null);
  return _textures[key];
}

void drawTextureKeyAt(CanvasRenderingContext2D ctx, String textureKey,
                   [Coordinate location = const Coordinate()]) {
  assert(textureKey != null);
  final texture = getTexture(textureKey);
  assert(texture != null);
  drawTextureAt(ctx, location, texture);
}

void drawTextureAt(CanvasRenderingContext2D ctx, Coordinate location,
                    TextureInput texture) {
  ctx.save();
  final tx = new AffineTransform();
  tx.translate(location.x, location.y);

  var theFrame = texture.frame;
  var source = texture.sourceColorRect.topLeft;
  tx.translate(source.x, source.y);

  if(texture.rotated) {
    tx.rotate(-0.5 * PI, 0.5 * theFrame.height, 0.5 * theFrame.height);
    theFrame = new Box(theFrame.left, theFrame.top,
        theFrame.height, theFrame.width);
  }

  CanvasUtil.transform(ctx, tx);

  CanvasUtil.drawImage(ctx, texture.image, theFrame);
  ctx.restore();
}
