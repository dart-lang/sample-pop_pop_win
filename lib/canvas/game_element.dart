class GameElement extends ElementParentImpl {
  Game _game;
  dartlib.Array2d<SquareElement> _elements;

  GameElement(int width, int height) : super(width, height);

  Game get game() {
    return _game;
  }

  void set game(Game value) {
    _game = value;
    invalidateDraw();
  }

  int get visualChildCount() {
    if(_elements == null) {
      return 0;
    } else {
      return _elements.length;
    }
  }

  PElement getVisualChild(int index) {
    return _elements[index];
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    _updateElements();
    super.drawOverride(ctx);
  }

  void _updateElements() {
    if(_game == null) {
      _elements = null;
    } else if(_elementsNeedUpdate) {
      _elements = new dartlib.Array2d<SquareElement>(
          _game.field.width, _game.field.height);

      for(int i=0;i<_elements.length;i++) {
        final se = new SquareElement(30, 30);
        se.registerParent(this);

        final x = i % _elements.width;
        final y = i ~/ _elements.width;
        final etx = se.addTransform();

        etx.setToTranslation(x * 30, y * 30);

        _elements[i] = se;
      }
    }
  }

  bool get _elementsNeedUpdate() {
    assert(_game != null);
    return _elements == null ||
        _elements.width != _game.field.width ||
        _elements.height != _game.field.height;
  }

}
