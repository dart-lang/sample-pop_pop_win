// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';

import 'game.dart';
import 'game_storage.dart';

abstract class GameManager {
  final int _width, _height, _bombCount;
  final GameStorage _gameStorage = GameStorage();

  Game _game;
  StreamSubscription<void> _gameStateChangedSub;
  Timer _clockTimer;

  GameManager(this._width, this._height, this._bombCount) {
    _newGame();
  }

  Game get game => _game;

  Stream<void> get bestTimeUpdated => _gameStorage.bestTimeUpdated;

  int get bestTimeMilliseconds =>
      _gameStorage.getBestTimeMilliseconds(_width, _height, _bombCount);

  void newGame() {
    _cleanup();
    _newGame();
  }

  void _cleanup() {
    _gameStateChangedSub.cancel();
    _gameStateChanged(GameState.reset);
  }

  void _newGame() {
    final f = Field(_bombCount, _width, _height);
    _game = Game(f);
    _gameStateChangedSub = _game.stateChanged.listen(_gameStateChanged);
  }

  void resetScores() {
    _gameStorage.reset();
  }

  void updateClock() {
    if (_clockTimer == null && _game.state == GameState.started) {
      _clockTimer = Timer(const Duration(seconds: 1), updateClock);
    } else if (_clockTimer != null && _game.state != GameState.started) {
      _clockTimer.cancel();
      _clockTimer = null;
    }
  }

  void onGameStateChanged(GameState value);

  void _gameStateChanged(GameState newState) {
    _gameStorage.recordState(newState);
    if (newState == GameState.won) {
      _gameStorage.updateBestTime(_game);
    }
    updateClock();
    onGameStateChanged(newState);
  }
}
