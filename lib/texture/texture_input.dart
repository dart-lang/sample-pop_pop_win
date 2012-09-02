class TextureInput {
  static const _pairExp = const RegExp(@"{([^,{]+),([^}]+)}");

  final String name;
  final Rect frame;
  final Vector offset;
  final bool rotated;
  final Rect sourceColorRect;
  final Size sourceSize;

  TextureInput(this.name, this.frame, this.offset, this.rotated,
      this.sourceColorRect, this.sourceSize);

  factory TextureInput.fromHash(String keyName, Map<String, Dynamic> map) {
    final frame = _parseRect(map['frame']);
    final offset = _parseCoordinate(map['offset']).toVector();
    final sourceColorRect = _parseRect(map['sourceColorRect']);
    final sourceSize = _parseCoordinate(map['sourceSize']).toSize();

    return new TextureInput(keyName, frame, offset, map['rotated'],
        sourceColorRect, sourceSize);
  }

  String toString() => this.name;

  static Rect _parseRect(String input) {
    final matches = $(_pairExp.allMatches(input)).toList();
    assert(matches.length == 2);

    var coord = _parseCoordinate(matches[0][0]);
    var size = _parseCoordinate(matches[1][0]).toSize();

    return new Rect.fromCoordSize(coord, size);
  }

  static Coordinate _parseCoordinate(String input) {
    final match = $(_pairExp.allMatches(input)).single();
    assert(match.groupCount() == 2);

    final x = parseDouble(match[1]);
    final y = parseDouble(match[2]);

    return new Coordinate(x, y);
  }
}
