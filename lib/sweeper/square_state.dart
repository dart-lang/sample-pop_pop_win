class SquareState {
  static final SquareState hidden = const SquareState._internal("Hidden");
  static final SquareState revealed = const SquareState._internal("Revealed");
  static final SquareState flagged = const SquareState._internal("Flagged");
  final String name;

  const SquareState._internal(this.name);

  String toString() => 'SquareState: $name';
}
