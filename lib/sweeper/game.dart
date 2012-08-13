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
    require(currentSS != SquareState.flagged, 'Cannot reveal a flagged square');

    int reveals = 0;

    // normal reveal
    if(currentSS == SquareState.hidden) {
      if(field.isMine(x, y)) {
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
    final i = field._getIndex(x, y);
    final currentSS = _states[i];
    assert(currentSS == SquareState.revealed);

    final flagged = new List<_Coord>();
    final hidden = new List<_Coord>();
    final adjCount = field.getAdjacentCount(x, y);

    bool failed = false;

    for(final c in field._getAdjacent(x, y)) {
      final ia = field._getIndex(c.x, c.y);
      if(_states[ia] == SquareState.hidden) {
        hidden.add(c);
        if(field.isMine(c.x, c.y)) {
          failed = true;
        }
      } else if(_states[ia] == SquareState.flagged) {
        flagged.add(c);
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
      for(final c in hidden) {
        reveals += reveal(c.x, c.y);
      }
    }

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

  int _getAdjacentFlagCount(int x, int y) {
    final i = field._getIndex(x, y);
    assert(_states[i] == SquareState.revealed);

    int val = 0;
    for(final c in field._getAdjacent(x, y)) {
      final ia = field._getIndex(c.x, c.y);
      if(_states[ia] == SquareState.flagged) {
        val++;
      }
    }
    return val;
  }
}
