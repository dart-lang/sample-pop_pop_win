class GameRoot extends GameManager {
  final Stage _stage;
  final CanvasElement _canvas;
  final GameElement _gameElement;
  final ClickManager _clickMan;
  final Element _leftCountDiv;
  final Element _gameStateDiv;
  final Element _clockDiv;

  bool _frameRequested = false;

  factory GameRoot(int width, int height, int mineCount,
      CanvasElement canvasElement, Element leftCountDiv,
      Element gameStateDiv, Element clockDiv, bool targetMode) {

    dartlib.requireArgumentNotNull(targetMode, 'targetMode');

    final rootElement = new GameElement(540, 540, targetMode);
    final stage = new Stage(canvasElement, rootElement);
    final clickMan = new ClickManager(stage);

    return new GameRoot._internal(width, height, mineCount,
        canvasElement, stage, rootElement, clickMan,
        leftCountDiv, gameStateDiv, clockDiv);
  }

  GameRoot._internal(int width, int height, int mineCount,
      this._canvas, this._stage, this._gameElement, this._clickMan,
      this._leftCountDiv, this._gameStateDiv, this._clockDiv)
      : super(width, height, mineCount) {
    _stage.invalidated.add(_stageInvalidated);
  }

  void set game(Game value) {
    super.game = _gameElement.game = value;
  }

  void newGame() {
    super.newGame();
    _requestFrame();
  }

  void revealTarget() => _gameElement.revealTarget();

  void toggleTargetFlag() => _gameElement.toggleTargetFlag();

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
