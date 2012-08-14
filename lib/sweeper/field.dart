class Field {
  final int mineCount;
  final int cols;
  final int rows;
  final List<bool> _squares;
  final List<int> _adjacents;

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

    return new Field._internal(mineCount, cols, rows, squares);
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

    return new Field._internal(count, cols, rows, squares);
  }

  Field._internal(this.mineCount, this.cols, this.rows, this._squares) :
    this._adjacents = new List<int>() {
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

    _adjacents.insertRange(0, size);
  }

  int get size() => cols * rows;

  bool isMine(int x, int y) {
    final i = _getIndex(x,y);
    return _squares[i];
  }

  int getAdjacentCount(int x, int y) {
    final i = _getIndex(x, y);
    if(_squares[i]) {
      return null;
    }

    int val = _adjacents[i];

    if(val == null) {
      val = 0;
      for(final c in _getAdjacent(x,y)) {
        final ia = _getIndex(c.x, c.y);
        if(_squares[ia]) {
          val++;
        }
      }
      _adjacents[i] = val;
    }
    return val;
  }

  int _getIndex(int x, int y) {
    assert(x >= 0 && x < cols);
    assert(y >= 0 && y < cols);
    return x + y * cols;
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
