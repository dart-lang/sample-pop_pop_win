class ScoreElement extends PElement {

  ScoreElement() : super(200, 50);

  void drawOverride(CanvasRenderingContext2D ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, width, height);

    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.font = '20px Slackey';
    ctx.textAlign = 'right';
    ctx.fillText('MINES LEFT:', 145, 0);
    ctx.textAlign = 'left';
    ctx.fillText('1223', 150, 0);
    ctx.textAlign = 'right';
    ctx.fillText('TIME:', 145, 25);
    ctx.textAlign = 'left';
    ctx.fillText('12:12', 150, 25);

  }
}
