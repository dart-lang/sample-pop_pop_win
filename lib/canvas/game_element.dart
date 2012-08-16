class GameElement {
  static final String _xKey = 'x';
  static final String _yKey = 'y';

  final CanvasElement _canvas;
  final Element _leftCountDiv;
  final Element _gameStateDiv;
  final Element _clockDiv;

  Game game;
  dartlib.GlobalId _updatedEventId;

  GameElement(this._canvas, this._leftCountDiv, this._gameStateDiv, this._clockDiv) {
    newGame();
    _requestFrame();
  }

  void updateElement() {
    _updateClock();
    _gameStateDiv.innerHTML = game.state.name;
    _leftCountDiv.innerHTML = game.minesLeft.toString();


  }

  void newGame() {
    if(_updatedEventId != null) {
      assert(game != null);
      game.updated.remove(_updatedEventId);
    }
    final f = new Field();
    game = new Game(f);
    _updatedEventId = game.updated.add(_gameUpdated);
    _canvas.elements.clear();
    updateElement();
  }

  void _requestFrame() {
    window.requestAnimationFrame(_onFrame);
  }

  bool _onFrame(int time) {
    _updateClock();
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
}
