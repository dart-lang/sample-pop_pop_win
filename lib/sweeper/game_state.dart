class GameState {
  static final GameState reset = const GameState._internal("reset");
  static final GameState started = const GameState._internal("started");
  static final GameState won = const GameState._internal("won");
  static final GameState lost = const GameState._internal("lost");
  final String name;

  const GameState._internal(this.name);

  String toString() => 'GameState: $name';
}
