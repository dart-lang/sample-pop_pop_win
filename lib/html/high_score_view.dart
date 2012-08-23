class HighScoreView {
  final int _width, _height, _mineCount;
  final DivElement _div;
  final GameStorage _storage;

  HighScoreView(this._width, this._height, this._mineCount,
      this._div, this._storage) {
    assert(_div != null);
    assert(_storage != null);

    _storage.highScoreUpdated.add((args) => _update());

    _update();
  }

  void _update() {
    final milliseconds = _storage.getHighScore(_width, _height, _mineCount);
    if(milliseconds != null) {
      final duration = new Duration(seconds: milliseconds ~/ 1000);
      _div.innerHTML = duration.toString();
    } else {
      _div.innerHTML = '';
    }
  }
}
