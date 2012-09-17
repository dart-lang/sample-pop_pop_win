class NewGameElement extends PElement {
  final EventHandle<EventArgs> _clickedEvent =
      new EventHandle<EventArgs>();

  NewGameElement() : super(294, 92) {
    ClickManager.setClickable(this, true);
    ClickManager.addHandler(this, (args) =>
        _clickedEvent.fireEvent(EventArgs.empty));
  }

  EventRoot<EventArgs> get clicked => _clickedEvent;

  void drawOverride(CanvasRenderingContext2D ctx) {
    // [68, button_new_game.png]
    // [69, button_new_game_clicked.png]
    drawTextureKeyAt(ctx, 'button_new_game.png');
  }

  GameElement get _parent => parent.parent;

  Game get _game => _parent._game;
}
