class GameTitleElement extends PElement {

  GameTitleElement() : super(318, 96);

  void drawOverride(CanvasRenderingContext2D ctx) {
    _textureData.drawTextureKeyAt(ctx, 'logo_win.png');
  }

  GameElement get _parent => (parent as PCanvas).parent;

  TextureData get _textureData => _parent._textureData;

  Game get _game => _parent._game;

  void _mouseDirectlyOver(args) {
    invalidateDraw();
  }
}
