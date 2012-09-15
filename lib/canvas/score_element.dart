class ScoreElement extends PElement {
  static const _minesLeftStr = "MINES LEFT:";
  static const _valueOffset = 15;

  num _textSize;

  ScoreElement() : super(400, 96);

  void drawOverride(CanvasRenderingContext2D ctx) {
    final rowHeight = (0.5 * height);
    final fontHeight = (rowHeight * 0.7).toInt();
    ctx.font = '${fontHeight}px Slackey';

    final textSize = _getTextSize(ctx);

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, width, height);

    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.fillText('MINES LEFT:', textSize, 0.5 * rowHeight);
    ctx.textAlign = 'left';
    ctx.fillText('1223', textSize + _valueOffset, 0.5 * rowHeight);
    ctx.textAlign = 'right';
    ctx.fillText('TIME:', textSize, 1.5 * rowHeight);
    ctx.textAlign = 'left';
    ctx.fillText('12:12', textSize + _valueOffset, 1.5 * rowHeight);
  }

  num _getTextSize(CanvasRenderingContext2D ctx) {
    if(_textSize == null) {
      final mets = ctx.measureText(_minesLeftStr);
      _textSize = mets.width;
    }
    return _textSize;
  }
}
