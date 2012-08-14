class Field {
  final int mineCount;
  final Array2d<bool> _squares;
  final Array2d<int> _adjacents;

  factory Field([mineCount = 40, cols = 16, rows = 16, int seed = null]) {
    final squares = new List<bool>();
    squares.insertRange(0, rows * cols, false);
    assert(mineCount < squares.length);
    assert(mineCount > 0);

    final rnd = new math.Random(seed);

    // This is the most simple code, but it'll get slow as
    // mineCount approaches the square count.
    // But more efficient if mineCount << square count
    // which is expected.
    for(int i = 0; i < mineCount; i++) {
      int index;
      do {
        index = rnd.nextInt(squares.length);
      } while(squares[index]);
      squares[index] = true;
    }

    return new Field._internal(mineCount, cols, squares);
  }

  factory Field.fromSquares(int cols, int rows, List<bool> squares) {
    assert(cols > 0);
    assert(rows > 0);
    assert(squares.length == cols * rows);

    int count = 0;
    for(final m in squares) {
      if(m) {
        count++;
      }
    }
    assert(count > 0);
    assert(count < squares.length);

    return new Field._internal(count, cols, squares);
  }

  Field._internal(this.mineCount, int cols, List<bool> source) :
    this._squares = new Array2d<bool>.readonlyFrom(cols, source),
    this._adjacents = new Array2d<int>(cols, source.length ~/ cols) {
    assert(cols > 0);
    assert(rows > 0);
    assert(_squares.length == cols * rows);
    assert(mineCount > 0);
    assert(mineCount < size);

    int count = 0;
    for(final m in _squares) {
      if(m) {
        count++;
      }
    }
    assert(count == mineCount);
  }

  int get cols() => _squares.width;
  int get rows() => _squares.height;

  int get size() => _squares.length;

  bool isMine(int x, int y) => _squares.get(x,y);

  int getAdjacentCount(int x, int y) {
    if(_squares.get(x,y)) {
      return null;
    }

    int val = _adjacents.get(x, y);

    if(val == null) {
      val = 0;
      for(final c in _getAdjacent(x,y)) {
        if(_squares.get(c.x, c.y)) {
          val++;
        }
      }
      _adjacents.set(x, y, val);
    }
    return val;
  }

  List<_Coord> _getAdjacent(int x, int y) {
    final List<_Coord> coords = new List<_Coord>();

    for(int j = math.max(0, x - 1); j < math.min(cols, (x + 2)); j++) {
      for(int k = math.max(0, y - 1); k < math.min(rows, (y + 2)); k++) {
        if(j != x || k != y) {
          coords.add(new _Coord(j, k));
        }
      }
    }
    return coords;
  }
}

class _Coord {
  final int x;
  final int y;
  const _Coord(this.x, this.y);
  String toString() => '[$x, $y]';
}
