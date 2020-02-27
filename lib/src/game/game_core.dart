// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:math';

import '../array_2d.dart';
import 'field.dart';

enum SquareState { hidden, revealed, flagged, bomb, safe }

enum GameState { reset, started, won, lost }

class Game {
  final Field field;
  final Array2d<SquareState> _states;
  final _updatedEvent = StreamController<void>();
  final _gameStateEvent = StreamController<GameState>();
  final _watch = Stopwatch();

  GameState _state;
  int _bombsLeft;
  int _revealsLeft;

  Game(this.field)
      : _state = GameState.reset,
        assert(field != null),
        _states = Array2d<SquareState>(
          field.width,
          field.height,
          (i) => SquareState.hidden,
        ),
        _bombsLeft = field.bombCount,
        _revealsLeft = field.length - field.bombCount;

  int get bombsLeft => _bombsLeft;

  int get revealsLeft => _revealsLeft;

  GameState get state => _state;

  Stream<void> get updated => _updatedEvent.stream;

  Stream<GameState> get stateChanged => _gameStateEvent.stream;

  SquareState getSquareState(int x, int y) => _states.get(x, y);

  bool get gameEnded => _state == GameState.won || _state == GameState.lost;

  Duration get duration =>
      (!_watch.isRunning && _watch.elapsedTicks == 0) ? null : _watch.elapsed;

  bool canToggleFlag(int x, int y) {
    final currentSS = _states.get(x, y);
    return currentSS == SquareState.hidden || currentSS == SquareState.flagged;
  }

  void setFlag(int x, int y, bool value) {
    _ensureStarted();
    assert(value != null);

    final currentSS = _states.get(x, y);
    if (value) {
      assert(currentSS == SquareState.hidden);
      _states.set(x, y, SquareState.flagged);
      _bombsLeft--;
    } else {
      assert(currentSS == SquareState.flagged);
      _states.set(x, y, SquareState.hidden);
      _bombsLeft++;
    }
    _update();
  }

  bool canReveal(int x, int y) {
    final currentSS = _states.get(x, y);
    if (currentSS == SquareState.hidden) {
      return true;
    } else if (_canChord(x, y)) {
      return true;
    }
    return false;
  }

  List<Point<int>> reveal(int x, int y) {
    _ensureStarted();
    assert(canReveal(x, y), 'Item cannot be revealed.');
    final currentSS = _states.get(x, y);

    List<Point<int>> reveals;

    // normal reveal
    if (currentSS == SquareState.hidden) {
      if (field.get(x, y)) {
        _setLost();
        reveals = <Point<int>>[];
      } else {
        reveals = _doReveal(x, y);
      }
    } else if (_canChord(x, y)) {
      reveals = _doChord(x, y);
    }
    _update();

    if (_state == GameState.lost) {
      return null;
    } else {
      return reveals;
    }
  }

  String toBoardString() {
    final buffer = StringBuffer();
    for (var y = -2; y < field.height; y++) {
      if (y > -2) {
        buffer.write('\n');
      }
      for (var x = -2; x < field.width; x++) {
        String char;
        if (y == -2) {
          if (x == -2) {
            char = ' ';
          } else if (x == -1) {
            char = '|';
          } else {
            char = (x % 10).toString();
          }
        } else if (y == -1) {
          if (x == -1) {
            char = '+';
          } else {
            char = '-';
          }
        } else {
          if (x == -2) {
            char = (y % 10).toString();
          } else if (x == -1) {
            char = '|';
          } else {
            switch (getSquareState(x, y)) {
              case SquareState.flagged:
                char = '\u2611';
                break;
              case SquareState.revealed:
                final count = field.getAdjacentCount(x, y);
                char = count.toString();
                break;
              case SquareState.hidden:
                char = '?';
                break;
              default:
              // noop;
            }
          }
        }
        assert(char != null);
        buffer.write(char);
      }
    }
    return buffer.toString();
  }

  bool _canChord(int x, int y) {
    final currentSS = _states.get(x, y);
    if (currentSS == SquareState.revealed) {
      // might be a 'chord' reveal
      final adjCount = field.getAdjacentCount(x, y);
      if (adjCount > 0) {
        final adjHidden = _getAdjacentCount(x, y, SquareState.hidden);
        if (adjHidden > 0) {
          final adjFlags = _getAdjacentCount(x, y, SquareState.flagged);
          if (adjFlags == adjCount) {
            return true;
          }
        }
      }
    }
    return false;
  }

  List<Point<int>> _doChord(int x, int y) {
    // this does not repeat a bunch of validations that have already happened
    // be careful
    final currentSS = _states.get(x, y);
    assert(currentSS == SquareState.revealed);

    final flagged = <int>[];
    final hidden = <int>[];
    final adjCount = field.getAdjacentCount(x, y);
    assert(adjCount > 0);

    var failed = false;

    for (final i in field.getAdjacentIndices(x, y)) {
      if (_states[i] == SquareState.hidden) {
        hidden.add(i);
        if (field[i]) {
          failed = true;
        }
      } else if (_states[i] == SquareState.flagged) {
        flagged.add(i);
      }
    }

    // for now we assume counts have been checked
    assert(flagged.length == adjCount);

    final reveals = <Point<int>>[];

    // if any of the hidden are bombs, we've failed
    if (failed) {
      _setLost();
    } else {
      for (final i in hidden) {
        final c = field.getCoordinate(i);
        if (canReveal(c.x, c.y)) {
          reveals.addAll(reveal(c.x, c.y));
        }
      }
    }

    return reveals;
  }

  List<Point<int>> _doReveal(int x, int y) {
    assert(_states.get(x, y) == SquareState.hidden);
    _states.set(x, y, SquareState.revealed);
    _revealsLeft--;
    assert(_revealsLeft >= 0);
    final reveals = [Point(x, y)];
    if (_revealsLeft == 0) {
      _setWon();
    } else if (field.getAdjacentCount(x, y) == 0) {
      for (final i in field.getAdjacentIndices(x, y)) {
        if (_states[i] == SquareState.hidden) {
          final c = field.getCoordinate(i);
          reveals.addAll(_doReveal(c.x, c.y));
          assert(state == GameState.started || state == GameState.won);
        }
      }
    }
    return reveals;
  }

  void _setWon() {
    assert(state == GameState.started);
    for (var i = 0; i < field.length; i++) {
      if (field[i]) {
        _states[i] = SquareState.safe;
      }
    }
    _setState(GameState.won);
  }

  void _setLost() {
    assert(state == GameState.started);
    for (var i = 0; i < field.length; i++) {
      if (field[i]) {
        _states[i] = SquareState.bomb;
      }
    }
    _setState(GameState.lost);
  }

  void _update() => _updatedEvent.add(null);

  void _setState(GameState value) {
    assert(value != null);
    assert(_state != null);
    assert((_state == GameState.reset) == (!_watch.isRunning));
    if (_state != value) {
      _state = value;
      if (_state == GameState.started) {
        assert(!_watch.isRunning);
        _watch
          ..reset()
          ..start();
      } else if (gameEnded) {
        assert(_watch.isRunning);
        _watch.stop();
      }
      _gameStateEvent.add(_state);
    }
  }

  void _ensureStarted() {
    if (state == GameState.reset) {
      assert(!_watch.isRunning);
      _setState(GameState.started);
    }
    assert(state == GameState.started);
    assert(_watch.isRunning);
  }

  int _getAdjacentCount(int x, int y, SquareState state) {
    var val = 0;
    for (final i in field.getAdjacentIndices(x, y)) {
      if (_states[i] == state) {
        val++;
      }
    }
    return val;
  }
}
