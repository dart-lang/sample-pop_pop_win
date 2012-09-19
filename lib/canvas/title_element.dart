class GameTitleElement extends PElement {

  GameTitleElement() : super(318, 96);

  void drawOverride(CanvasRenderingContext2D ctx) {
    drawTextureKeyAt(ctx, 'logo_win.png');
  }

  GameElement get _parent => (parent as PCanvas).parent;

  Game get _game => _parent._game;

  void _mouseDirectlyOver(args) {
    invalidateDraw();
  }
}
