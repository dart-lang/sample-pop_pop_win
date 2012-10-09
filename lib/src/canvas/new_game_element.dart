class NewGameElement extends PElement {
  final EventHandle<EventArgs> _clickedEvent =
      new EventHandle<EventArgs>();

  NewGameElement() : super(294, 92) {
    ClickManager.setClickable(this, true);
    ClickManager.addHandler(this, (args) =>
        _clickedEvent.fireEvent(EventArgs.empty));
    Mouse.isMouseDirectlyOverProperty.addHandler(this, _mouseDirectlyOver);
  }

  EventRoot<EventArgs> get clicked => _clickedEvent;

  void drawOverride(CanvasRenderingContext2D ctx) {
    final texture = Mouse.isMouseDirectlyOver(this) ?
        'button_new_game_clicked.png' : 'button_new_game.png';
    _textureData.drawTextureKeyAt(ctx, texture);
  }

  GameElement get _parent => (parent as PCanvas).parent;

  TextureData get _textureData => _parent._textureData;

  Game get _game => _parent._game;

  void _mouseDirectlyOver(args) {
    invalidateDraw();
  }
}
