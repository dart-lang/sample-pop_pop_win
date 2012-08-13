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

  void reveal(int x, int y) {
    _ensureStarted();
    final i = field._getIndex(x, y);
    final currentSS = _states[i];
    require(currentSS == SquareState.hidden, 'Square state is not hidden');
    if(field.isMine(x, y)) {
      _states[i] = SquareState.mine;
      _setState(GameState.lost);
    } else {
      _states[i] = SquareState.revealed;
      _revealsLeft--;
      assert(_revealsLeft >= 0);
      if(_revealsLeft == 0) {
        _setState(GameState.won);
      }
    }
    _update();
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
