class SquareElement extends PElement {

  SquareElement(int width, int height) : super(width, height);

  void drawOverride(CanvasRenderingContext2D ctx) {
    ctx.font = '15px Helvetica';
    ctx.textAlign = 'center';
    ctx.fillText('SE', width / 2, 20, 30);

    ctx.strokeRect(0, 0, width, height, 1);
  }
}
