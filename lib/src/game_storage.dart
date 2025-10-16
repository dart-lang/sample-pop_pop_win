// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';

import 'game.dart';
import 'platform_web.dart';

class GameStorage {
  final _bestTimeUpdated = StreamController<void>();

  Stream<void> get bestTimeUpdated => _bestTimeUpdated.stream;

  void recordState(GameState state) {
    _incrementIntValue(state.toString());
  }

  bool updateBestTime(Game game) {
    assert(game.state == GameState.won);

    final w = game.width;
    final h = game.height;
    final m = game.bombCount;
    final duration = game.duration!.inMilliseconds;

    final key = _getKey(w, h, m);

    final currentScore = _getIntValue(key, null);
    if (currentScore == null || currentScore > duration) {
      _setIntValue(key, duration);
      _bestTimeUpdated.add(null);
      return true;
    } else {
      return false;
    }
  }

  int? getBestTimeMilliseconds(int width, int height, int bombCount) {
    final key = _getKey(width, height, bombCount);
    return _getIntValue(key, null);
  }

  void reset() {
    targetPlatform.clearValues();
  }

  int? _getIntValue(String key, [int? defaultValue = 0]) {
    final strValue = targetPlatform.getValue(key);
    return _parseValue(strValue, defaultValue);
  }

  void _setIntValue(String key, int value) {
    final val = value.toString();
    targetPlatform.setValue(key, val);
  }

  void _incrementIntValue(String key) {
    final val = _getIntValue(key)!;
    _setIntValue(key, val + 1);
  }

  static String _getKey(int w, int h, int m) => 'w$w-h$h-m$m';

  static int? _parseValue(String? value, int? defaultValue) {
    if (value == null) {
      return defaultValue;
    } else {
      return int.parse(value);
    }
  }
}
