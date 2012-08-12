class Game {
  final Field field;

  GameState _gameState;
  int _minesLeft;

  Game(this.field) :
    _gameState = GameState.notStarted {
    assert(field != null);
    _minesLeft = field.mineCount;
  }

  int get minesLeft => _minesLeft;

  GameState get state => _gameState;

  void setFlag(int x, int y) {
  }

  void reveal(int x, int y) {
  }
}
