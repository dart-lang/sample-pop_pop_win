class GameElement extends ElementParentImpl {
  static final int _squareSize = 33;

  Game _game;
  dartlib.Array2d<SquareElement> _elements;

  GameElement(int width, int height) : super(width, height);

  Game get game() => _game;

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
        final coords = _elements.getCoordinate(i);
        final se = new SquareElement(_squareSize, coords.Item1, coords.Item2);
        se.registerParent(this);

        ClickManager.addHandler(se, _squareClicked);

        // position the square
        final etx = se.addTransform();
        etx.setToTranslation(coords.Item1 * _squareSize, coords.Item2 * _squareSize);

        _elements[i] = se;
      }
    }
  }

  void _squareClicked(ElementMouseEventArgs args) {
    if(!_game.gameEnded) {
      final SquareElement se = args.element;
      _click(se.x, se.y, args.shiftKey);
    }
  }

  void _click(int x, int y, bool alt) {
    assert(!game.gameEnded);
    final ss = game.getSquareState(x, y);

    if(alt) {
      if(ss == SquareState.hidden) {
        game.setFlag(x, y, true);
      } else if(ss == SquareState.flagged) {
        game.setFlag(x, y, false);
      } else if(ss == SquareState.revealed) {
        game.reveal(x, y);
      }
    } else {
      if(ss == SquareState.hidden) {
        game.reveal(x, y);
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
