class Game {
  final Field field;
  final List<SquareState> _states;

  GameState _gameState;
  int _minesLeft;

  Game(this.field) :
    _gameState = GameState.notStarted,
    _states = new List<SquareState>() {
    assert(field != null);
    _minesLeft = field.mineCount;
    _states.insertRange(0, field.size, SquareState.hidden);
  }

  int get minesLeft => _minesLeft;

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
      assert(currentSS == SquareState.hidden);
      _states[i] = SquareState.flagged;
      _minesLeft--;
    } else {
      assert(currentSS == SquareState.flagged);
      _states[i] = SquareState.hidden;
      _minesLeft++;
    }
  }

  void reveal(int x, int y) {
    _ensureStarted();
    final i = field._getIndex(x, y);
  }

  void _ensureStarted() {
    if(state == GameState.notStarted) {
      _gameState = GameState.started;
    }
    assert(state == GameState.started);
  }
}
