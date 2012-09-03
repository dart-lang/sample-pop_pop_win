class SquareState {
  static const SquareState hidden = const SquareState._internal("hidden");
  static const SquareState revealed = const SquareState._internal("revealed");
  static const SquareState flagged = const SquareState._internal("flagged");
  static const SquareState mine = const SquareState._internal("mine");
  static const SquareState safe = const SquareState._internal('safe');
  final String name;

  const SquareState._internal(this.name);

  String toString() => 'SquareState: $name';
}
