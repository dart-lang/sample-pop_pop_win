class GameState {
  static final GameState notStarted = const GameState._internal("Not Started");
  static final GameState started = const GameState._internal("Started");
  static final GameState won = const GameState._internal("Won");
  static final GameState lost = const GameState._internal("Lost");
  final String name;

  const GameState._internal(this.name);

  String toString() => 'GameState: $name';
}
