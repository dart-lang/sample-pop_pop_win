// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.
library pop_pop_win.game_storage;

import 'dart:async';

import 'game.dart';
import 'platform_web.dart';

class GameStorage {
  static const _gameCountKey = 'gameCount';
  final StreamController _bestTimeUpdated = new StreamController();
  final Map<String, String> _cache = <String, String>{};

  int get gameCount => _getIntValue(_gameCountKey);

  Stream get bestTimeUpdated => _bestTimeUpdated.stream;

  void recordState(GameState state) {
    assert(state != null);
    _incrementIntValue(state.toString());
  }

  Future<bool> updateBestTime(Game game) async {
    assert(game != null);
    assert(game.state == GameState.won);

    var w = game.field.width;
    var h = game.field.height;
    var m = game.field.bombCount;
    var duration = game.duration.inMilliseconds;

    var key = _getKey(w, h, m);

    var currentScore = _getIntValue(key, null);
    if (currentScore == null || currentScore > duration) {
      _setIntValue(key, duration);
      _bestTimeUpdated.add(null);
      return true;
    } else {
      return false;
    }
  }

  int getBestTimeMilliseconds(int width, int height, int bombCount) {
    final key = _getKey(width, height, bombCount);
    return _getIntValue(key, null);
  }

  void reset() {
    _cache.clear();
    targetPlatform.clearValues();
  }

  int _getIntValue(String key, [int defaultValue = 0]) {
    assert(key != null);
    if (_cache.containsKey(key)) {
      return _parseValue(_cache[key], defaultValue);
    }

    var strValue = targetPlatform.getValue(key);
    _cache[key] = strValue;
    return _parseValue(strValue, defaultValue);
  }

  void _setIntValue(String key, int value) {
    assert(key != null);
    _cache.remove(key);
    var val = (value == null) ? null : value.toString();
    targetPlatform.setValue(key, val);
  }

  void _incrementIntValue(String key) {
    var val = _getIntValue(key);
    _setIntValue(key, val + 1);
  }

  static String _getKey(int w, int h, int m) => 'w$w-h$h-m$m';

  static int _parseValue(String value, int defaultValue) {
    if (value == null) {
      return defaultValue;
    } else {
      return int.parse(value);
    }
  }
}
