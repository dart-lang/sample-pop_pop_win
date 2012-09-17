class BoardElement extends ElementParentImpl {
  Array2d<SquareElement> _elements;

  BoardElement() : super(0, 0, true);

  int get visualChildCount {
    if(_elements == null) {
      return 0;
    } else {
      return _elements.length;
    }
  }

  PElement getVisualChild(int index) {
    return _elements[index];
  }

  void update() {
    if(_game == null) {
      _elements = null;
    } else if(_elementsNeedUpdate) {
      _elements = new Array2d<SquareElement>(
          _game.field.width, _game.field.height);

      for(int i=0;i<_elements.length;i++) {
        final coords = _elements.getCoordinate(i);
        final se = new SquareElement(coords.Item1, coords.Item2);
        se.registerParent(this);

        ClickManager.addHandler(se, _parent._squareClicked);

        // position the square
        final etx = se.addTransform();
        etx.setToTranslation(coords.Item1 * SquareElement._size,
            coords.Item2 * SquareElement._size);

        _elements[i] = se;
      }

      size = new Size(_game.field.width * SquareElement._size,
          _game.field.height * SquareElement._size);
    }
    super.update();
  }

  GameElement get _parent => (parent as PCanvas).parent;

  Game get _game => _parent._game;

  bool get _elementsNeedUpdate {
    assert(_game != null);
    return _elements == null ||
        _elements.width != _game.field.width ||
        _elements.height != _game.field.height;
  }

}
