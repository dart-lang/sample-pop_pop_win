class GameElement extends ElementParentImpl {
  static const _edgeOffset = 32;
  static const _backgroundSize = const dartlib.Size(2048, 1536);
  static const _backgroundHoleSize = 16 * SquareElement._size + 2 * _edgeOffset;
  static const _boardOffset = const dartlib.Vector(352, 96);

  final TextAniElement _animationLayer;
  final bool _targetMode;
  final dartlib.EventHandle _targetChanged;

  dartlib.AffineTransform _animationLayerTx;
  int _targetX, _targetY;
  double _scale;
  dartlib.Vector _scaledBoardOffset;

  Game _game;
  dartlib.Array2d<SquareElement> _elements;

  GameElement(this._targetMode) :
    _animationLayer = new TextAniElement(0, 0),
    _targetChanged = new dartlib.EventHandle(),
    super(100, 100) {
    _animationLayer.registerParent(this);
    _animationLayerTx = _animationLayer.addTransform();
  }

  Game get game => _game;

  void set game(Game value) {
    _game = value;
    if(value == null) {
      size = const dartlib.Size(100, 100);
    } else {
      _updateSize(value.field.width, value.field.height);
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
    var count = 1;
    if(_elements != null) {
      count +=_elements.length;
    }
    return count;
  }

  PElement getVisualChild(int index) {
    if(_elements != null) {
      if(index < _elements.length) {
        return _elements[index];
      }
      index -= _elements.length;
    }

    assert(index == 0);
    return _animationLayer;
  }

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

    ctx.save();
    ctx.translate(_scaledBoardOffset.x, _scaledBoardOffset.y);

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

    ctx.restore();

    //
    // start drawing corners
    //

    ctx.save();
    // top left
    ctx.transform(_scale, 0, 0, _scale, 0, 0);
    _drawCorner(ctx);

    // right flip
    ctx.save();
    ctx.transform(-1 , 0, 0, 1, _backgroundSize.width, 0);
    _drawCorner(ctx);

    // nested bottom, right flip
    ctx.transform(1 , 0, 0, -1, 0, _backgroundSize.height);
    _drawCorner(ctx);

    ctx.restore();

    // bottom left
    ctx.transform(1 , 0, 0, -1, 0, _backgroundSize.height);
    _drawCorner(ctx);

    ctx.restore();

    //
    // end drawing corners
    //
  }

  void _drawCorner(CanvasRenderingContext2D ctx) {
    drawTextureKeyAt(ctx, 'background_top_left.png');
    drawTextureKeyAt(ctx, 'background_side_left.png',
        new dartlib.Coordinate(0, _boardOffset.y));
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

      final offset = _scaledBoardOffset + const dartlib.Coordinate(_edgeOffset, _edgeOffset);

      for(int i=0;i<_elements.length;i++) {
        final coords = _elements.getCoordinate(i);
        final se = new SquareElement(coords.Item1, coords.Item2);
        se.registerParent(this);

        ClickManager.addHandler(se, _squareClicked);

        // position the square
        final etx = se.addTransform();
        etx.setToTranslation(
            offset.x + coords.Item1 * SquareElement._size,
            offset.y + coords.Item2 * SquareElement._size);

        _elements[i] = se;
      }

      // update the animation layer
      _animationLayerTx.setToTranslation(offset.x, offset.y);
    }
  }

  void _drawPop(int x, int y) {
    const animationOffset = const dartlib.Vector(-88, -88);
    final squareOffset = animationOffset +
        new dartlib.Vector(SquareElement._size * x, SquareElement._size * y);

    // start a fake animation
    _animationLayer.add(new TextAniRequest('balloon_pop', 29, squareOffset));
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
        _drawPop(x, y);
      }
    }
  }

  bool get _elementsNeedUpdate {
    assert(_game != null);
    return _elements == null ||
        _elements.width != _game.field.width ||
        _elements.height != _game.field.height;
  }

  void _updateSize(int w, int h) {
    final sizeX = _getScale(w, _backgroundSize.width, _backgroundHoleSize);
    final sizeY = _getScale(h, _backgroundSize.height, _backgroundHoleSize);

    size = new dartlib.Size(sizeX, sizeY);

    // NOTE: width wins here. Need to do work to make left and right sides
    //       scale nicely when not a square
    _scale = sizeX / _backgroundSize.width;
    _scaledBoardOffset = _boardOffset.scale(_scale);
  }

  static num _getScale(int count, num fullSize, num holeSize) {
    final k = count * SquareElement._size + 2 * _edgeOffset;

    return k * fullSize / holeSize;
  }
}
