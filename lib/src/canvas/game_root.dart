class GameRoot extends GameManager {
  final Stage _stage;
  final CanvasElement _canvas;
  final GameElement _gameElement;
  final ClickManager _clickMan;
  final AffineTransform _gameElementTx;

  bool _frameRequested = false;

  factory GameRoot(int width, int height, int mineCount,
      CanvasElement canvasElement, TextureData textureData) {

    final rootElement = new GameElement(textureData);
    final stage = new Stage(canvasElement, rootElement);
    final clickMan = new ClickManager(stage);

    return new GameRoot._internal(width, height, mineCount,
        canvasElement, stage, rootElement, clickMan);
  }

  GameRoot._internal(int width, int height, int mineCount,
      this._canvas, this._stage, GameElement gameElement, this._clickMan) :
      this._gameElement = gameElement,
      _gameElementTx = gameElement.addTransform(),
      super(width, height, mineCount) {

    _gameElement.setGameManager(this);
    _stage.invalidated.add(_stageInvalidated);

    _gameElement.newGameClick.add((args) => newGame());

    ClickManager.addMouseMoveHandler(_gameElement, _mouseMoveHandler);
    ClickManager.addMouseOutHandler(_stage, _mouseOutHandler);

    window.on.resize.add((args) => _updateCanvasSize());
    _updateCanvasSize();
  }

  void newGame() {
    super.newGame();
    _gameElement.game = super.game;
    _requestFrame();
  }

  bool get canRevealTarget => _gameElement.canRevealTarget;

  bool get canFlagTarget => _gameElement.canFlagTarget;

  void revealTarget() => _gameElement.revealTarget();

  void toggleTargetFlag() => _gameElement.toggleTargetFlag();

  EventRoot get targetChanged =>
      _gameElement.targetChanged;

  void onGameStateChanged(GameState newState) {
    switch(newState) {
      case GameState.won:
        playAudio('ppw_win');
        break;
    }
    trackAnalyticsEvent('game', newState.name, game.field.toString());
  }

  void onNewHighScore(int value) {
    trackAnalyticsEvent('game', 'record', game.field.toString(), value);
  }

  void _updateCanvasSize() {
    _updateCanvasSizeCore(new Size(window.innerWidth, window.innerHeight));
  }

  void _updateCanvasSizeCore(Size windowSize) {
    _canvas.attributes['width'] = windowSize.width;
    _canvas.attributes['height'] = windowSize.height;
    _requestFrame();
  }

  void _requestFrame() {
    if(!_frameRequested) {
      _frameRequested = true;
      window.requestAnimationFrame(_onFrame);
    }
  }

  void _onFrame(int time) {
    final boardInnerBox = _gameElement._scaledInnerBox;
    final xScale = _stage.size.width / boardInnerBox.width;
    final yScale = _stage.size.height / boardInnerBox.height;

    final prettyScale = min(1, min(xScale, yScale));

    //final logish = log(theScale) / LN2;
    //final exp = logish.floor().toInt();

    // DARTBUG: really weird that pow to an int returns an int and not double :-/
    //final prettyScale = pow(2.0, exp);


    final newDimensions = _gameElement.size * prettyScale;
    //assert(newDimensions.fitsInside(_stage.size));

    final delta = new Vector(_stage.size.width - newDimensions.width,
        _stage.size.height - newDimensions.height).scale(0.5).scale(1/prettyScale);

    _gameElementTx.setToScale(prettyScale, prettyScale);
    _gameElementTx.translate(delta.x, delta.y);

    var updated = _stage.draw();
    _frameRequested = false;
    if(updated) {
      _requestFrame();
    }
  }

  void updateClock() {
    _requestFrame();
    super.updateClock();
  }

  void gameUpdated(args) {
    _requestFrame();
  }

  void _stageInvalidated(args) {
    _requestFrame();
  }

  void _mouseMoveHandler(ElementMouseEventArgs args) {
    bool showPointer = false;
    if(!game.gameEnded && args.element is SquareElement) {
      final SquareElement se = args.element;
      showPointer = game.canReveal(se.x, se.y);
    } else if(args.element is NewGameElement) {
      showPointer = true;
    } else if(args.element is GameTitleElement) {
      showPointer = true;
    }
    _updateCursor(showPointer);
  }

  void _mouseOutHandler(args) {
    _updateCursor(false);
  }

  void _updateCursor(bool showFinger) {
    _canvas.style.cursor = showFinger ? 'pointer' : 'inherit';
  }
}
