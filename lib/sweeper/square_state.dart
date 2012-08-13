class SquareState {
  static final SquareState hidden = const SquareState._internal("hidden");
  static final SquareState revealed = const SquareState._internal("revealed");
  static final SquareState flagged = const SquareState._internal("flagged");
  static final SquareState mine = const SquareState._internal("mine");
  final String name;

  const SquareState._internal(this.name);

  String toString() => 'SquareState: $name';
}
