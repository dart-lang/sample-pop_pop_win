class GameRoot extends GameManager {
  final Stage _stage;
  final CanvasElement _canvas;
  final GameElement _gameElement;
  final ClickManager _clickMan;
  final Element _leftCountDiv;
  final Element _gameStateDiv;
  final Element _clockDiv;

  bool _frameRequested = false;

  factory GameRoot(CanvasElement canvasElement,
      Element leftCountDiv, Element gameStateDiv, Element clockDiv) {

    final rootElement = new GameElement(540, 540);
    final stage = new Stage(canvasElement, rootElement);
    final clickMan = new ClickManager(stage);

    return new GameRoot._internal(canvasElement, stage, rootElement, clickMan,
        leftCountDiv, gameStateDiv, clockDiv);
  }

  GameRoot._internal(this._canvas, this._stage, this._gameElement, this._clickMan,
      this._leftCountDiv, this._gameStateDiv, this._clockDiv) : super() {
    _stage.invalidated.add(_stageInvalidated);
  }

  Game get game() => _gameElement.game;

  void set game(Game value) {
    _gameElement.game = value;
  }

  void newGame() {
    super.newGame();
    _requestFrame();
  }

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
