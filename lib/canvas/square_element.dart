class SquareElement extends PElement {

  SquareElement(int width, int height) : super(width, height) {
    Mouse.isMouseDirectlyOverProperty.addHandler(this, _mouseOver);
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    if(_isMouseOver) {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(0, 0, width, height);
      ctx.font = 'bold 15px Helvetica';
    } else {
      ctx.font = '15px Helvetica';
    }
    ctx.strokeRect(0, 0, width, height, 1);

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('SE', width / 2, 20, 30);
  }

  bool get _isMouseOver() => Mouse.isMouseDirectlyOverProperty.get(this);

  void _mouseOver(dartlib.Property<bool> property) {
    invalidateDraw();
  }
}
