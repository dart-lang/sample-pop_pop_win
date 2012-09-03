class GameRoot extends GameManager {
  final Stage _stage;
  final CanvasElement _canvas;
  final GameElement _gameElement;
  final ClickManager _clickMan;
  final Element _leftCountDiv;
  final Element _gameStateDiv;
  final Element _clockDiv;
  final dartlib.AffineTransform _gameElementTx;

  bool _frameRequested = false;

  factory GameRoot(int width, int height, int mineCount,
      CanvasElement canvasElement, Element leftCountDiv,
      Element gameStateDiv, Element clockDiv, bool targetMode) {

    dartlib.requireArgumentNotNull(targetMode, 'targetMode');

    final rootElement = new GameElement(targetMode);
    final stage = new Stage(canvasElement, rootElement);
    final clickMan = new ClickManager(stage);

    return new GameRoot._internal(width, height, mineCount,
        canvasElement, stage, rootElement, clickMan,
        leftCountDiv, gameStateDiv, clockDiv);
  }

  GameRoot._internal(int width, int height, int mineCount,
      this._canvas, this._stage, GameElement gameElement, this._clickMan,
      this._leftCountDiv, this._gameStateDiv, this._clockDiv) :
        this._gameElement = gameElement,
        _gameElementTx = gameElement.addTransform(),
        super(width, height, mineCount) {
    _stage.invalidated.add(_stageInvalidated);
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

  dartlib.EventRoot get targetChanged =>
      _gameElement.targetChanged;

  void _requestFrame() {
    if(!_frameRequested) {
      _frameRequested = true;
      window.requestAnimationFrame(_onFrame);
    }
  }

  bool _onFrame(int time) {
    updateClock();
    _gameStateDiv.innerHTML = game.state.name;
    _leftCountDiv.innerHTML = game.minesLeft.toString();

    final xScale = _stage.size.width / _gameElement.width;
    final yScale = _stage.size.height / _gameElement.height;

    final theScale = math.min(xScale, yScale);

    final logish = math.log(theScale) / math.LN2;
    final exp = logish.floor().toInt();

    // really weird that pow to an int returns an int and not double :-/
    final prettyScale = math.pow(2.0, exp);

    //print("Fix scale at    $theScale");
    //print("Board scaled at $prettyScale");

    _gameElementTx.setToScale(prettyScale, prettyScale);

    final newDimensions = _gameElement.size * prettyScale;
    assert(newDimensions.fitsInside(_stage.size));

    final delta = new dartlib.Vector(_stage.size.width - newDimensions.width,
        _stage.size.height - newDimensions.height).scale(0.5);

    _gameElementTx.translate(delta.x, delta.y);

    _stage.draw();
    _frameRequested = false;
  }

  void updateClock() {
    if(game.duration == null) {
      _clockDiv.innerHTML = '';
    } else {
      _clockDiv.innerHTML = game.duration.inSeconds.toString();
    }

    super.updateClock();
  }

  void gameUpdated(args) {
    _requestFrame();
  }

  void _stageInvalidated(args) {
    _requestFrame();
  }
}
