class GameRoot {
  static final String _xKey = 'x';
  static final String _yKey = 'y';

  final Stage _stage;
  final CanvasElement _canvas;
  final GameElement _gameElement;
  final Element _leftCountDiv;
  final Element _gameStateDiv;
  final Element _clockDiv;

  bool _frameRequested = false;
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

    _stage.invalidated.add(_stageInvalidated);

    _canvas.on.mouseMove.add(_canvas_mouseMove);
    _canvas.on.mouseOut.add(_canvas_mouseOut);

    newGame();
    _requestFrame();
  }

  Game get game() => _gameElement.game;

  void set game(Game value) {
    _gameElement.game = value;
  }

  void newGame() {
    if(_updatedEventId != null) {
      assert(game != null);
      game.updated.remove(_updatedEventId);
    }
    final f = new Field();
    game = new Game(f);
    _updatedEventId = game.updated.add(_gameUpdated);
    _requestFrame();
  }

  void _requestFrame() {
    if(!_frameRequested) {
      _frameRequested = true;
      window.requestAnimationFrame(_onFrame);
    }
  }

  bool _onFrame(int time) {
    _updateClock();
    _gameStateDiv.innerHTML = game.state.name;
    _leftCountDiv.innerHTML = game.minesLeft.toString();
    _stage.draw();
    _frameRequested = false;
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
    _requestFrame();
  }

  void requestFrame(){
    window.webkitRequestAnimationFrame(_onFrame);
  }

  void _canvas_mouseMove(MouseEvent e){
    _updateMouse(new dartlib.Coordinate(e.offsetX, e.offsetY));
  }

  void _canvas_mouseOut(MouseEvent e){
    _updateMouse(null);
  }

  void _updateMouse(dartlib.Coordinate value) {
    _mouseLocation = value;
    final hits = Mouse.markMouseOver(_stage, value);
  }

  void _stageInvalidated(args) {
    _requestFrame();
  }
}
