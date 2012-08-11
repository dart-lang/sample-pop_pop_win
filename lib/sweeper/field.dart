class Field {
  final int mineCount;
  final int cols;
  final int rows;
  final List<bool> _squares;

  int _toFindCount;

  Field([this.mineCount = 40, this.cols = 16, this.rows = 16]) :
    _squares = new List() {
    _squares.insertRange(0, rows * cols, false);
    assert(mineCount < _squares.length);
    assert(mineCount > 0);

    final rnd = new math.Random();

    // This is the most simple code, but it'll get slow as
    // mineCount approaches the square count.
    // But more efficient if mineCount << square count
    // which is expected.
    for(int i = 0; i < mineCount; i++) {
      int index;
      do {
        index = rnd.nextInt(_squares.length);
      } while(_squares[index]);
      _squares[index] = true;
    }
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
