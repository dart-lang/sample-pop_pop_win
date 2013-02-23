part of ppw_html;

class GameStorage {
  static const _gameCountKey = 'gameCount';
  final EventHandle _bestTimeUpdated = new EventHandle();

  int get gameCount => _getIntValue(_gameCountKey);

  Stream get bestTimeUpdated => _bestTimeUpdated.stream;

  void recordState(GameState state) {
    assert(state != null);
    _incrementIntValue(state.name);
  }

  bool updateBestTime(Game game) {
    assert(game != null);
    assert(game.state == GameState.won);

    final w = game.field.width;
    final h = game.field.height;
    final m = game.field.bombCount;
    final duration = game.duration.inMilliseconds;

    final key = _getKey(w, h, m);

    final currentScore = _getIntValue(key, null);
    if(currentScore == null || currentScore > duration) {
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
    targetPlatform.storage.clear();
  }

  String toString() => Maps.mapToString(targetPlatform.storage);

  int _getIntValue(String key, [int defaultValue = 0]) {
    assert(key != null);
    final strValue = targetPlatform.storage[key];
    if(strValue == null) {
      return defaultValue;
    } else {
      return int.parse(strValue);
    }
  }

  void _setIntValue(String key, int value) {
    assert(key != null);
    if(value == null) {
      targetPlatform.storage[key] = null;
    } else {
      targetPlatform.storage[key] = value.toString();
    }
  }

  void _incrementIntValue(String key) {
    final value = _getIntValue(key);
    _setIntValue(key, value + 1);
  }

  static String _getKey(int w, int h, int m) => "w$w-h$h-m$m";

}
