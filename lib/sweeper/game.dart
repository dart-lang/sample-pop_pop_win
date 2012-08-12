class Game {
  final Field field;
  final List<SquareState> _states;

  GameState _gameState;
  int _minesLeft;
  int _revealsLeft;

  Game(this.field) :
    _gameState = GameState.notStarted,
    _states = new List<SquareState>() {
    assert(field != null);
    _minesLeft = field.mineCount;
    _revealsLeft = field.size - field.mineCount;
    _states.insertRange(0, field.size, SquareState.hidden);
  }

  int get minesLeft => _minesLeft;

  int get revealsLeft => _revealsLeft;

  GameState get state => _gameState;

  SquareState getSquareState(int x, int y) {
    final i = field._getIndex(x, y);
    return _states[i];
  }

  void setFlag(int x, int y, bool value) {
    _ensureStarted();
    assert(value != null);
    final i = field._getIndex(x, y);

    final currentSS = _states[i];
    if(value) {
      require(currentSS == SquareState.hidden);
      _states[i] = SquareState.flagged;
      _minesLeft--;
    } else {
      require(currentSS == SquareState.flagged);
      _states[i] = SquareState.hidden;
      _minesLeft++;
    }
  }

  void reveal(int x, int y) {
    _ensureStarted();
    final i = field._getIndex(x, y);
    final currentSS = _states[i];
    require(currentSS == SquareState.hidden, 'Square state is not hidden');
    _states[i] = SquareState.revealed;
    if(field.isMine(x, y)) {
      _gameState = GameState.lost;
    } else {
      _revealsLeft--;
      assert(_revealsLeft >= 0);
      if(_revealsLeft == 0) {
        _gameState = GameState.won;
      }
    }
  }

  void _ensureStarted() {
    if(state == GameState.notStarted) {
      _gameState = GameState.started;
    }
    assert(state == GameState.started);
  }
}
