// NOTE: setGameManager must be called immediately after construction

class ScoreElement extends PElement {
  static const _minesLeftStr = "MINES LEFT:";
  static const _valueOffset = 15;

  GameManager _gameManager;

  String _clockStr, _minesStr, _highScoreStr;
  num _textSize;

  ScoreElement() : super(400, 96);

  void setGameManager(GameManager manager) {
    assert(_gameManager == null);
    assert(manager != null);
    _gameManager = manager;
    invalidateDraw();
  }

  void update() {
    final newMineStr = _game.minesLeft.toString();
    if(newMineStr != _minesStr) {
      _minesStr = newMineStr;
      invalidateDraw();
    }

    var newClockStr = '';
    if(_game.duration != null) {
      newClockStr = _game.duration.inSeconds.toString();
    }
    if(newClockStr != _clockStr) {
      _clockStr = newClockStr;
      invalidateDraw();
    }

    var highScoreStr = null;
    if(_gameManager.highScore != null) {
      final ms = _gameManager.highScore;
      final s = ms * 0.001;
      final oneDigit = (s * 10).toInt() * 0.1;
      highScoreStr = oneDigit.toString();
    }
    if(_highScoreStr != highScoreStr) {
      _highScoreStr = highScoreStr;
      invalidateDraw();
    }

    super.update();
  }


  void drawOverride(CanvasRenderingContext2D ctx) {
    final rowHeight = (0.33 * height);
    final fontHeight = (rowHeight * 0.9).toInt();
    ctx.font = '${fontHeight}px Slackey';
    ctx.textBaseline = 'middle';

    final textSize = _getTextSize(ctx);

    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.fillText('MINES LEFT:', textSize, 0.5 * rowHeight);
    ctx.textAlign = 'left';
    ctx.fillText(_minesStr, textSize + _valueOffset, 0.5 * rowHeight);
    ctx.textAlign = 'right';
    ctx.fillText('TIME:', textSize, 1.5 * rowHeight);
    ctx.textAlign = 'left';
    ctx.fillText(_clockStr, textSize + _valueOffset, 1.5 * rowHeight);

    if(_highScoreStr != null) {
      ctx.textAlign = 'right';
      ctx.fillText('RECORD:', textSize, 2.5 * rowHeight);
      ctx.textAlign = 'left';
      ctx.fillText(_highScoreStr, textSize + _valueOffset, 2.5 * rowHeight);
    }
  }

  num _getTextSize(CanvasRenderingContext2D ctx) {
    if(_textSize == null) {
      final mets = ctx.measureText(_minesLeftStr);
      _textSize = mets.width;
    }
    return _textSize;
  }

  Game get _game => _gameManager.game;
}
