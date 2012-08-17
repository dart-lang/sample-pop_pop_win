class GameRoot {
  static final String _xKey = 'x';
  static final String _yKey = 'y';

  final Stage _stage;
  final CanvasElement _canvas;
  final GameElement _gameElement;
  final Element _leftCountDiv;
  final Element _gameStateDiv;
  final Element _clockDiv;

  dartlib.GlobalId _updatedEventId;
  dartlib.Coordinate _mouseLocation;

  factory GameRoot(CanvasElement canvasElement,
      Element leftCountDiv, Element gameStateDiv, Element clockDiv) {

    final rootElement = new GameElement(540, 540);
    final stage = new Stage(canvasElement, rootElement);

    return new GameRoot._internal(canvasElement, stage, rootElement, leftCountDiv, gameStateDiv, clockDiv);
  }

  GameRoot._internal(this._canvas, this._stage, this._gameElement,
      this._leftCountDiv, this._gameStateDiv, this._clockDiv) {
    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);
    newGame();
    _requestFrame();
  }

  Game get game() => _gameElement.game;

  void set game(Game value) {
    _gameElement.game = value;
  }

  void updateElement() {
    _updateClock();
    _gameStateDiv.innerHTML = game.state.name;
    _leftCountDiv.innerHTML = game.minesLeft.toString();

    _stage.draw();
  }

  void newGame() {
    if(_updatedEventId != null) {
      assert(game != null);
      game.updated.remove(_updatedEventId);
    }
    final f = new Field();
    game = new Game(f);
    _updatedEventId = game.updated.add(_gameUpdated);
    updateElement();
  }

  void _requestFrame() {
    window.requestAnimationFrame(_onFrame);
  }

  bool _onFrame(int time) {
    _updateClock();
    _stage.draw();
    if(_mouseLocation != null){
      RetainedDebug.borderHitTest(_stage, _mouseLocation);
    }
    _requestFrame();
  }

  void _updateClock() {
    if(game.duration == null) {
      _clockDiv.innerHTML = '';
    } else {
      _clockDiv.innerHTML = game.duration.inSeconds.toString();
    }
  }

  bool get _canClick() {
    return game.state == GameState.notStarted ||
        game.state == GameState.started;
  }

  void _click(int x, int y, bool alt) {
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

  void _gameUpdated(args) {
    updateElement();
  }

  void requestFrame(){
    window.webkitRequestAnimationFrame(_onFrame);
  }

  void _canvas_mouseMove(MouseEvent e){
    _mouseLocation = new dartlib.Coordinate(e.offsetX, e.offsetY);
  }

  void _canvas_mouseOut(MouseEvent e){
    _mouseLocation = null;
  }
}
