class Game {
  final Field field;
  final Array2d<SquareState> _states;
  final EventHandle<EventArgs> _updatedEvent;

  GameState _state;
  int _minesLeft;
  int _revealsLeft;

  Game(Field field) :
    this.field = field,
    _state = GameState.notStarted,
    _states = new Array2d<SquareState>(field.width, field.height, SquareState.hidden),
    _updatedEvent = new EventHandle<EventArgs>() {
    assert(field != null);
    _minesLeft = field.mineCount;
    _revealsLeft = field.length - field.mineCount;
  }

  int get minesLeft() => _minesLeft;

  int get revealsLeft() => _revealsLeft;

  GameState get state() => _state;

  EventRoot get updated() => _updatedEvent;

  SquareState getSquareState(int x, int y) => _states.get(x,y);

  void setFlag(int x, int y, bool value) {
    _ensureStarted();
    assert(value != null);

    final currentSS = _states.get(x,y);
    if(value) {
      require(currentSS == SquareState.hidden);
      _states.set(x,y,SquareState.flagged);
      _minesLeft--;
    } else {
      require(currentSS == SquareState.flagged);
      _states.set(x,y,SquareState.hidden);
      _minesLeft++;
    }
    _update();
  }

  int reveal(int x, int y) {
    _ensureStarted();
    final currentSS = _states.get(x,y);
    require(currentSS != SquareState.flagged, 'Cannot reveal a flagged square');

    int reveals = 0;

    // normal reveal
    if(currentSS == SquareState.hidden) {
      if(field.get(x, y)) {
        _setLost();
      } else {
        reveals = _doReveal(x, y);
      }
    } else if(currentSS == SquareState.revealed) {
      // might be a 'chord' reveal
      final adjFlags = _getAdjacentFlagCount(x, y);
      final adjCount = field.getAdjacentCount(x, y);
      if(adjFlags == adjCount) {
        reveals = _doChord(x, y);
      }
    }
    _update();
    return reveals;
  }

  int _doChord(int x, int y) {
    // this does not repeat a bunch of validations that have already happened
    // be careful
    final currentSS = _states.get(x,y);
    assert(currentSS == SquareState.revealed);

    final flagged = new List<int>();
    final hidden = new List<int>();
    final adjCount = field.getAdjacentCount(x, y);

    bool failed = false;

    for(final i in field.getAdjacentIndices(x, y)) {
      if(_states[i] == SquareState.hidden) {
        hidden.add(i);
        if(field[i]) {
          failed = true;
        }
      } else if(_states[i] == SquareState.flagged) {
        flagged.add(i);
      }
    }

    // for now we assume counts have been checked
    assert(flagged.length == adjCount);

    int reveals = 0;

    // if any of the hidden are mines, we've failed
    if(failed) {
      // TODO: assert one of the flags must be wrong, right?
      _setLost();
    } else {
      for(final i in hidden) {
        final c = _getCoordFromIndex(i);
        reveals += reveal(c[0], c[1]);
      }
    }

    return reveals;
  }

  int _doReveal(int x, int y) {
    assert(_states.get(x,y) == SquareState.hidden);
    _states.set(x,y,SquareState.revealed);
    _revealsLeft--;
    assert(_revealsLeft >= 0);
    int revealCount = 1;
    if(_revealsLeft == 0) {
      _setWon();
    } else if (field.getAdjacentCount(x, y) == 0) {
      for(final i in field.getAdjacentIndices(x, y)) {
        if(_states[i] == SquareState.hidden) {
          final c = _getCoordFromIndex(i);
          revealCount += _doReveal(c[0], c[1]);
          assert(_state == GameState.started || _state == GameState.won);
        }
      }
    }
    return revealCount;
  }

  void _setWon() {
    assert(_state == GameState.started);
    for(int x = 0; x < field.width; x++) {
      for(int y = 0; y < field.height; y++) {
        if(field.get(x, y)) {
          _states.set(x,y,SquareState.safe);
        }
      }
    }
    _state = GameState.won;
  }

  void _setLost() {
    assert(_state == GameState.started);
    for(int x = 0; x < field.width; x++) {
      for(int y = 0; y < field.height; y++) {
        if(field.get(x, y)) {
          _states.set(x,y,SquareState.mine);
        }
      }
    }
    _state = GameState.lost;
  }

  void _update() => _updatedEvent.fireEvent(EventArgs.empty);

  void _ensureStarted() {
    if(state == GameState.notStarted) {
      _state = GameState.started;
    }
    assert(state == GameState.started);
  }

  int _getAdjacentFlagCount(int x, int y) {
    assert(_states.get(x,y) == SquareState.revealed);

    int val = 0;
    for(final i in field.getAdjacentIndices(x, y)) {
      if(_states[i] == SquareState.flagged) {
        val++;
      }
    }
    return val;
  }

  List<int> _getCoordFromIndex(int i) {
    return [i % field.width, i ~/ field.width];
  }
}
