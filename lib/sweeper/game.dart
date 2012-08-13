class Game {
  final Field field;
  final List<SquareState> _states;
  final EventHandle<EventArgs> _updatedEvent;

  GameState _state;
  int _minesLeft;
  int _revealsLeft;

  Game(this.field) :
    _state = GameState.notStarted,
    _states = new List<SquareState>(),
    _updatedEvent = new EventHandle<EventArgs>() {
    assert(field != null);
    _minesLeft = field.mineCount;
    _revealsLeft = field.size - field.mineCount;
    _states.insertRange(0, field.size, SquareState.hidden);
  }

  int get minesLeft => _minesLeft;

  int get revealsLeft => _revealsLeft;

  GameState get state => _state;

  EventRoot get updated => _updatedEvent;

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
    _update();
  }

  int reveal(int x, int y) {
    _ensureStarted();
    final i = field._getIndex(x, y);
    final currentSS = _states[i];
    require(currentSS == SquareState.hidden, 'Square state is not hidden');
    int reveals = 0;
    if(field.isMine(x, y)) {
      _setLost();
    } else {
      reveals = _doReveal(x, y);
    }
    _update();
    return reveals;
  }

  int _doReveal(int x, int y) {
    final i = field._getIndex(x, y);
    assert(_states[i] == SquareState.hidden);
    _states[i] = SquareState.revealed;
    _revealsLeft--;
    assert(_revealsLeft >= 0);
    int revealCount = 1;
    if(_revealsLeft == 0) {
      _setState(GameState.won);
    } else if (field.getAdjacentCount(x, y) == 0) {
      for(final c in field._getAdjacent(x, y)) {
        final ia = field._getIndex(c.x, c.y);
        if(_states[ia] == SquareState.hidden) {
          revealCount += _doReveal(c.x, c.y);
          assert(_state == GameState.started || _state == GameState.won);
        }
      }
    }
    return revealCount;
  }

  void _setLost() {
    assert(_state == GameState.started);
    for(int x = 0; x < field.cols; x++) {
      for(int y = 0; y < field.rows; y++) {
        if(field.isMine(x, y)) {
          final i = field._getIndex(x, y);
          _states[i] = SquareState.mine;
        }
      }
    }
    _setState(GameState.lost);
  }

  void _update() => _updatedEvent.fireEvent(EventArgs.empty);

  void _setState(GameState value) {
    if(_state != value) {
      _state = value;
    }
  }

  void _ensureStarted() {
    if(state == GameState.notStarted) {
      _setState(GameState.started);
    }
    assert(state == GameState.started);
  }
}
