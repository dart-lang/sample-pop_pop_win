class ScoreElement extends PElement {
  static const _minesLeftStr = "MINES LEFT:";
  static const _valueOffset = 15;

  String _clockStr, _minesStr;
  num _textSize;

  ScoreElement() : super(400, 96);

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

    super.update();
  }


  void drawOverride(CanvasRenderingContext2D ctx) {
    final rowHeight = (0.5 * height);
    final fontHeight = (rowHeight * 0.7).toInt();
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
  }

  num _getTextSize(CanvasRenderingContext2D ctx) {
    if(_textSize == null) {
      final mets = ctx.measureText(_minesLeftStr);
      _textSize = mets.width;
    }
    return _textSize;
  }

  GameElement get _parent => parent.parent;

  Game get _game => _parent._game;
}
