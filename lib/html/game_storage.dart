class GameStorage {
  static final _gameCountKey = 'gameCount';

  final Storage _storage;

  GameStorage() :
    _storage = window.localStorage {
  }

  int get gameCount => _getIntValue(_gameCountKey);

  void recordState(GameState state) {
    assert(state != null);
    _incrementIntValue(state.name);
  }

  bool updateHighScore(Game game) {
    assert(game != null);
    assert(game.state == GameState.won);

    final w = game.field.width;
    final h = game.field.height;
    final m = game.field.mineCount;
    final duration = game.duration.inMilliseconds;

    final key = "w$w-h$h-m$m";

    final currentScore = _getIntValue(key, null);
    if(currentScore == null || currentScore > duration) {
      _setIntValue(key, duration);
      return true;
    } else {
      return false;
    }
  }

  void reset() {
    _storage.clear();
  }

  String toString() => Maps.mapToString(_storage);

  int _getIntValue(String key, [int defaultValue = 0]) {
    assert(key != null);
    final strValue = _storage[key];
    if(strValue == null) {
      return defaultValue;
    } else {
      return math.parseInt(strValue);
    }
  }

  void _setIntValue(String key, int value) {
    assert(key != null);
    if(value == null) {
      _storage[key] = null;
    } else {
      _storage[key] = value.toString();
    }
  }

  void _incrementIntValue(String key) {
    final value = _getIntValue(key);
    _setIntValue(key, value + 1);
  }

}
