class GameElement extends ElementParentImpl {
  static const _edgeOffset = 32;
  static const _backgroundSize = const Size(2048, 1536);
  static const _backgroundHoleSize = 16 * SquareElement._size + 2 * _edgeOffset;
  static const _boardOffset = const Vector(352, 96);
  static const _popExplodeAnimationOffset = const Vector(-88, -88);
  static const _popAnimationHitFrame = 12;

  static const _dartAnimationOffset =
      const Vector(-1065 + SquareElement._size ~/ 2,
          -815 + SquareElement._size ~/ 2);


  final TextureAnimationElement _popAnimationLayer, _dartAnimationLayer;
  final bool _targetMode;
  final EventHandle _targetChanged;

  GameBackgroundElement _background;

  AffineTransform _popLayerTx, _dartLayerTx;
  int _targetX, _targetY;
  double _scale;
  Vector _scaledBoardOffset;

  Game _game;
  Array2d<SquareElement> _elements;

  GameElement(this._targetMode) :
    _popAnimationLayer = new TextureAnimationElement(0, 0),
    _dartAnimationLayer = new TextureAnimationElement(0, 0),
    _targetChanged = new EventHandle(),
    super(100, 100) {
    _background = new GameBackgroundElement(this);
    _background.registerParent(this);

    _popAnimationLayer.registerParent(this);
    _popLayerTx = _popAnimationLayer.addTransform();

    _dartAnimationLayer.registerParent(this);
    _dartLayerTx = _dartAnimationLayer.addTransform();
  }

  Game get game => _game;

  void set game(Game value) {
    _game = value;
    if(value == null) {
      size = const Size(100, 100);
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

  EventRoot get targetChanged => _targetChanged;

  int get visualChildCount {
    var count = 3;
    if(_elements != null) {
      count +=_elements.length;
    }
    return count;
  }

  PElement getVisualChild(int index) {
    if(index == 0) {
      return _background;
    }
    index--;

    if(_elements != null) {
      if(index < _elements.length) {
        return _elements[index];
      }
      index -= _elements.length;
    }

    switch(index) {
      case 0:
        return _popAnimationLayer;
      case 1:
        return _dartAnimationLayer;
      default:
        throw 'oops';
    }
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    _updateElements();

    // draw children via super
    super.drawOverride(ctx);

    // draw target element
    _drawTarget(ctx);
 }

  void _drawTarget(CanvasRenderingContext2D ctx) {
    assert((_targetX == null) == (_targetY == null));
    if(_targetX != null) {
      final halfSize = SquareElement._size * 0.5;
      var targetLoc = new Vector(_targetX, _targetY);
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
      _elements = new Array2d<SquareElement>(
          _game.field.width, _game.field.height);

      final offset = _scaledBoardOffset + const Coordinate(_edgeOffset, _edgeOffset);

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
      _popLayerTx.setToTranslation(offset.x, offset.y);
      _dartLayerTx.setToTranslation(offset.x, offset.y);
    }
  }

  void _startPopAnimation(Coordinate start, [Iterable<Coordinate> reveals = null]) {
    if(reveals == null) {
      assert(game.state == GameState.lost);
      reveals = new NumberEnumerable.fromRange(0, game.field.length)
          .select((i) {
            final t = game.field.getCoordinate(i);
            final c = new Coordinate(t.Item1, t.Item2);
            return new Tuple(c, game.getSquareState(c.x, c.y));
          })
          .where((t2) => t2.Item2 == SquareState.mine)
          .select((t2) => t2.Item1)
          .toList();
    }

    for(final c in reveals) {
      final squareOffset = _popExplodeAnimationOffset +
          new Vector(SquareElement._size * c.x, SquareElement._size * c.y);

      var delay = _popAnimationHitFrame + ((c - start).length * 4).toInt();
      delay += rnd.nextInt(10);

      final ss = game.getSquareState(start.x, start.y);

      String texturePrefix;
      int frameCount;

      switch(ss) {
        case SquareState.revealed:
          texturePrefix = 'balloon_pop';
          frameCount = 29;
          break;
        case SquareState.mine:
          texturePrefix = 'balloon_explode';
          frameCount = 25;
          break;
        default:
          throw 'not supported';
      }

      final request = new TextAniRequest(texturePrefix, frameCount, squareOffset, delay);
      request.started.add((args) => _playPop());

      _popAnimationLayer.add(request);
    }
  }

  void _playPop() {
    var i = rnd.nextInt(8);
    playAudio('Pop$i');
  }

  void _startDartAnimation(Iterable<Coordinate> points) {
    for(final point in points) {
      final squareOffset = _dartAnimationOffset +
          new Vector(SquareElement._size * point.x, SquareElement._size * point.y);

      _dartAnimationLayer.add(new TextAniRequest('dart_fly_shadow', 56, squareOffset));
      _dartAnimationLayer.add(new TextAniRequest('dart_fly', 56, squareOffset));
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

    List<Coordinate> reveals = null;

    if(alt) {
      if(ss == SquareState.hidden || ss == SquareState.flagged) {
        _toggleFlag(x, y);
      } else if(ss == SquareState.revealed) {
        if(game.canReveal(x, y)) {
          // get adjacent ballons
          final adjHidden = $(game.field.getAdjacentIndices(x, y))
              .select((i) {
                final t = game.field.getCoordinate(i);
                return new Coordinate(t.Item1, t.Item2);
              })
              .where((t) => game.getSquareState(t.x, t.y) == SquareState.hidden)
              .toList();

          assert(adjHidden.length > 0);

          _startDartAnimation(adjHidden);
          reveals = game.reveal(x, y);
        }
      }
    } else {
      if(ss == SquareState.hidden) {
        _startDartAnimation([new Coordinate(x, y)]);
        reveals = game.reveal(x, y);
      }
    }

    if(reveals != null && reveals.length > 0) {
      assert(game.state != GameState.lost);
      if(!alt) {
        // if it was a normal click, the first item should be the clicked item
        var first = reveals[0];
        assert(first.x == x);
        assert(first.y == y);
      }
      _startPopAnimation(new Coordinate(x, y), reveals);
    } else if(game.state == GameState.lost) {
      _startPopAnimation(new Coordinate(x, y));
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

    size = new Size(sizeX, sizeY);

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
