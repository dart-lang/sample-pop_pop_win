class GameManager {
  final GameStorage _gameStorage;

  Game game;
  dartlib.GlobalId _updatedEventId;
  dartlib.GlobalId _gameStateChangedId;
  int _setIntervalId;

  GameManager() : _gameStorage = new GameStorage() {
    newGame();
  }

  void newGame() {
    if(_updatedEventId != null) {
      assert(game != null);
      assert(_gameStateChangedId != null);
      game.updated.remove(_updatedEventId);
      game.stateChanged.remove(_gameStateChangedId);
      _gameStateChanged(GameState.reset);
    }
    final f = new Field();
    game = new Game(f);
    _updatedEventId = game.updated.add(gameUpdated);
    _gameStateChangedId = game.stateChanged.add(_gameStateChanged);
  }

  abstract void gameUpdated(args);

  void resetScores() {
    _gameStorage.reset();
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

  void updateClock() {
    if(_setIntervalId == null && game.state == GameState.started) {
      _setIntervalId = window.setInterval(_doClock, 1000);
    } else if(_setIntervalId != null && game.state != GameState.started) {
      window.clearInterval(_setIntervalId);
      _setIntervalId = null;
    }
  }

  // work around for http://code.google.com/p/dart/issues/detail?id=3197
  void _doClock() {
    updateClock();
  }

  bool get _canClick() {
    return game.state == GameState.reset ||
        game.state == GameState.started;
  }

  void _gameStateChanged(GameState newState) {
    _gameStorage.recordState(newState);
    if(newState == GameState.won) {
      final newHighScore = _gameStorage.updateHighScore(game);
    }
    updateClock();
  }
}
