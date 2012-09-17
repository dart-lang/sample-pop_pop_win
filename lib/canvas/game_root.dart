class GameRoot extends GameManager {
  final Stage _stage;
  final CanvasElement _canvas;
  final GameElement _gameElement;
  final ClickManager _clickMan;
  final AffineTransform _gameElementTx;

  bool _frameRequested = false;

  factory GameRoot(int width, int height, int mineCount,
      CanvasElement canvasElement, bool targetMode) {

    requireArgumentNotNull(targetMode, 'targetMode');

    final rootElement = new GameElement(targetMode);
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
    _stage.invalidated.add(_stageInvalidated);

    _gameElement.newGameClick.add((args) => newGame());

    //_canvas.on.mouseMove.add(_canvas_mouseMove);
    //_canvas.on.mouseOut.add(_canvas_mouseOut);
  }

  void set game(Game value) {
    super.game = _gameElement.game = value;
  }

  void newGame() {
    super.newGame();
    _requestFrame();
  }

  bool get canRevealTarget => _gameElement.canRevealTarget;

  bool get canFlagTarget => _gameElement.canFlagTarget;

  void revealTarget() => _gameElement.revealTarget();

  void toggleTargetFlag() => _gameElement.toggleTargetFlag();

  EventRoot get targetChanged =>
      _gameElement.targetChanged;

  void _requestFrame() {
    if(!_frameRequested) {
      _frameRequested = true;
      window.requestAnimationFrame(_onFrame);
    }
  }

  bool _onFrame(int time) {
    final xScale = _stage.size.width / _gameElement.width;
    final yScale = _stage.size.height / _gameElement.height;

    final theScale = min(xScale, yScale);

    final logish = log(theScale) / LN2;
    final exp = logish.floor().toInt();

    // BUGBUG: really weird that pow to an int returns an int and not double :-/
    final prettyScale = pow(2.0, exp);

    _gameElementTx.setToScale(prettyScale, prettyScale);

    final newDimensions = _gameElement.size * prettyScale;
    assert(newDimensions.fitsInside(_stage.size));

    final delta = new Vector(_stage.size.width - newDimensions.width,
        _stage.size.height - newDimensions.height).scale(0.5);

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

  void _canvas_mouseMove(MouseEvent e){
    _setMouse(getMouseEventCoordinate(e));
  }

  void _canvas_mouseOut(MouseEvent e){
    _setMouse(null);
  }

  void _setMouse(Coordinate value) {
    final hits = Mouse.markMouseOver(_stage, value);
    print(hits);
  }
}
