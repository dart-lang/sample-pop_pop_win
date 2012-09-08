class TextAniElement extends PElement {
  final String _texturePrefix;
  final int _frameCount;

  int _frame = null;

  TextAniElement(num width, num height, this._texturePrefix, this._frameCount) :
    super(width, height);

  /*
   * int drawAnimation(CanvasRenderingContext2D ctx, String texturePrefix,
                  int frameCount, int frameNumber,
                  [dartlib.Coordinate location = const dartlib.Coordinate()]) {
  assert(frameCount >= 0);
  assert(frameNumber >= 0);
  frameNumber %= frameCount;
  assert(frameNumber >= 0 && frameNumber < frameCount);

}

   */
  void update() {
    if(_frame == null) {
      _frame = 0;
    } else if(_frame < (_frameCount - 1)){
      _frame++;
      assert(_frame < _frameCount);
      invalidateDraw();
    }
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    var frameString = _frame.toString();
    while(frameString.length < 4) {
      frameString = "0$frameString";
    }

    final frameName = "${_texturePrefix}_$frameString.png";
    drawTextureKeyAt(ctx, frameName);
  }
}
