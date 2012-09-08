class GameElement extends ElementParentImpl {
  static const _edgeOffset = 32;

  final bool _targetMode;
  final dartlib.EventHandle _targetChanged;

  int _targetX, _targetY;

  Game _game;
  dartlib.Array2d<SquareElement> _elements;

  GameElement(this._targetMode) :
    _targetChanged = new dartlib.EventHandle(),
    super(100, 100);

  Game get game => _game;

  void set game(Game value) {
    _game = value;
    if(value == null) {
      size = const dartlib.Size(100, 100);
    } else {
      size = new dartlib.Size(
          SquareElement._size * value.field.width + _edgeOffset * 2,
          SquareElement._size * value.field.height + _edgeOffset * 2);
    }
  }

  bool get canRevealTarget =>
      _targetX != null && _game.canReveal(_targetX, _targetY);

  bool get canFlagTarget =>
      _targetX != null && _game.canToggleFlag(_targetX, _targetY);

  void revealTarget() {
    if(_targetX != null) {
      game.reveal(_targetX, _targetY);
      _target(null, null);
    }
  }

  void toggleTargetFlag() {
    if(_targetX != null) {
      final success = _toggleFlag(_targetX, _targetY);
      if(success) {
        _target(null, null);
      }
    }
  }

  dartlib.EventRoot get targetChanged => _targetChanged;

  int get visualChildCount {
    if(_elements == null) {
      return 0;
    } else {
      return _elements.length;
    }
  }

  PElement getVisualChild(int index) => _elements[index];

  void drawOverride(CanvasRenderingContext2D ctx) {
    _updateElements();

    _drawBackground(ctx);

    // draw children via super
    super.drawOverride(ctx);

    // draw target element
    _drawTarget(ctx);
  }

  // TODO: draw this on another layer? Cache?
  void _drawBackground(CanvasRenderingContext2D ctx) {
    final rightBgLoc = SquareElement._size * (_game.field.width -1) + _edgeOffset;
    final bottomBgLoc = SquareElement._size * (_game.field.height -1) + _edgeOffset;

    drawTextureKeyAt(ctx, 'game_board_corner_top_left.png');

    drawTextureKeyAt(ctx, 'game_board_corner_top_right.png',
        new dartlib.Coordinate(rightBgLoc, 0));

    drawTextureKeyAt(ctx, 'game_board_corner_bottom_left.png',
                     new dartlib.Coordinate(0, bottomBgLoc));
    drawTextureKeyAt(ctx, 'game_board_corner_bottom_right.png',
        new dartlib.Coordinate(rightBgLoc, bottomBgLoc));

    for(var i = 1; i < _game.field.width - 1; i++) {
      final xLoc = SquareElement._size * i + _edgeOffset;
      drawTextureKeyAt(ctx, 'game_board_side_top.png',
          new dartlib.Coordinate(xLoc, 0));
      drawTextureKeyAt(ctx, 'game_board_side_bottom.png',
          new dartlib.Coordinate(xLoc, bottomBgLoc));
    }

    for(var i = 1; i < _game.field.height - 1; i++) {
      final yLoc = SquareElement._size * i + _edgeOffset;
      drawTextureKeyAt(ctx, 'game_board_side_left.png',
          new dartlib.Coordinate(0, yLoc));
      drawTextureKeyAt(ctx, 'game_board_side_right.png',
          new dartlib.Coordinate(rightBgLoc, yLoc));
    }
  }

  void _drawTarget(CanvasRenderingContext2D ctx) {
    assert((_targetX == null) == (_targetY == null));
    if(_targetX != null) {
      final halfSize = SquareElement._size * 0.5;
      var targetLoc = new dartlib.Vector(_targetX, _targetY);
      targetLoc = targetLoc.scale(SquareElement._size);

      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      CanvasUtil.centeredCircle(ctx,
          targetLoc.x + halfSize, targetLoc.y + halfSize, halfSize);
      ctx.fill();
    }
  }

  void _updateElements() {
    if(_game == null) {
      _elements = null;
    } else if(_elementsNeedUpdate) {
      _elements = new dartlib.Array2d<SquareElement>(
          _game.field.width, _game.field.height);

      for(int i=0;i<_elements.length;i++) {
        final coords = _elements.getCoordinate(i);
        final se = new SquareElement(coords.Item1, coords.Item2);
        se.registerParent(this);

        ClickManager.addHandler(se, _squareClicked);

        // position the square
        final etx = se.addTransform();
        etx.setToTranslation(
            _edgeOffset + coords.Item1 * SquareElement._size,
            _edgeOffset + coords.Item2 * SquareElement._size);

        _elements[i] = se;
      }
    }
  }

  void _squareClicked(ElementMouseEventArgs args) {
    if(!_game.gameEnded) {
      final SquareElement se = args.element;
      if(_targetMode) {
        _target(se.x, se.y);
      } else {
        _click(se.x, se.y, args.shiftKey);
      }
    }
  }

  void _target(int x, int y) {
    _targetX = x;
    _targetY = y;
    _targetChanged.fireEvent(null);
    invalidateDraw();
  }

  bool _toggleFlag(int x, int y) {
    assert(!game.gameEnded);
    final ss = game.getSquareState(x, y);
    if(ss == SquareState.hidden) {
      game.setFlag(x, y, true);
      return true;
    } else if(ss == SquareState.flagged) {
      game.setFlag(x, y, false);
      return true;
    }
    return false;
  }

  void _click(int x, int y, bool alt) {
    assert(!game.gameEnded);
    final ss = game.getSquareState(x, y);

    if(alt) {
      if(ss == SquareState.hidden || ss == SquareState.flagged) {
        _toggleFlag(x, y);
      } else if(ss == SquareState.revealed) {
        if(game.canReveal(x, y)) {
          game.reveal(x, y);
        }
      }
    } else {
      if(ss == SquareState.hidden) {
        game.reveal(x, y);
      }
    }
  }

  bool get _elementsNeedUpdate {
    assert(_game != null);
    return _elements == null ||
        _elements.width != _game.field.width ||
        _elements.height != _game.field.height;
  }

}
