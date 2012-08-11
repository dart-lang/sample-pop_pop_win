class Field {
  final int mineCount;
  final int cols;
  final int rows;
  final List<bool> _squares;

  int _toFindCount;

  factory Field([mineCount = 40, cols = 16, rows = 16]) {
    final squares = new List<bool>();
    squares.insertRange(0, rows * cols, false);
    assert(mineCount < squares.length);
    assert(mineCount > 0);

    final rnd = new math.Random();

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

  Field._internal(this.mineCount, this.cols, this.rows, this._squares) {
    assert(cols > 0);
    assert(rows > 0);
    assert(_squares.length == cols * rows);
    assert(mineCount > 0);
    assert(mineCount < _squares.length);

    int count = 0;
    for(final m in _squares) {
      if(m) {
        count++;
      }
    }
    assert(count == mineCount);
  }

  bool isMine(int x, int y) {
    final i = _getIndex(x,y);
    return _squares[i];
  }

  int _getIndex(int x, int y) {
    assert(x >= 0 && x < cols);
    assert(y >= 0 && y < cols);
    return x + y * cols;
  }

}
