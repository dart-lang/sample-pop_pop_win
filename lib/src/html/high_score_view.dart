class HighScoreView {
  final DivElement _div;
  final GameManager _manager;

  HighScoreView(this._manager, this._div) {
    assert(_div != null);
    assert(_manager != null);

    _manager.bestTimeUpdated.add((args) => _update());

    _update();
  }

  void _update() {
    final milliseconds = _manager.bestTimeMilliseconds;
    if(milliseconds != null) {
      final duration = new Duration(seconds: milliseconds ~/ 1000);
      _div.innerHTML = duration.toString();
    } else {
      _div.innerHTML = '';
    }
  }
}
