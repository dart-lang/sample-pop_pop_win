class SquareElement extends PElement {
  bool _revealed = false;

  SquareElement(int width, int height) : super(width, height) {
    Mouse.isMouseDirectlyOverProperty.addHandler(this, _mouseOver);
    ClickManager.setClickable(this, true);
    ClickManager.addHandler(this, _onClick);
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    if(_isMouseOver) {
      ctx.fillStyle = 'yellow';
      ctx.font = 'bold 15px Helvetica';
    } else if(_revealed) {
      ctx.fillStyle = 'orange';
      ctx.font = 'italic 15px Helvetica';
    } else {
      ctx.fillStyle = 'white';
      ctx.font = '15px Helvetica';
    }

    ctx.fillRect(0, 0, width, height);
    ctx.strokeRect(0, 0, width, height, 1);

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    final String txt = _revealed ? 'RE' : 'SE';

    ctx.fillText(txt, width / 2, 20, 30);
  }

  bool get _isMouseOver() => Mouse.isMouseDirectlyOverProperty.get(this);

  void _mouseOver(dartlib.Property<bool> property) {
    invalidateDraw();
  }

  void _onClick(args) {
    _revealed = !_revealed;
    invalidateDraw();
  }
}
