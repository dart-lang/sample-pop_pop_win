class FieldTest {
  static void run() {
    test('defaults', _testDefaults);
    test('mineCount', _testMineCount);
    test('fromSquares', _testFromSquares);
    test('adjacent', _testAdjacent);
  }

  static void _testDefaults() {
    final f = new Field();

    expect(f.mineCount, equals(40));
    expect(f.rows, equals(16));
    expect(f.cols, equals(16));
  }

  static void _testMineCount() {
    final f = new Field();

    int mineCount = 0;
    for(int x = 0; x < 16; x++) {
      for(int y = 0; y < 16; y++) {
        if(f.isMine(x, y)) {
          mineCount++;
        }
      }
    }
    expect(mineCount, equals(f.mineCount));
  }

  static void _testFromSquares() {
    final f = new Field.fromSquares(2, 2, [true, true, true, false]);
    expect(f.rows, equals(2));
    expect(f.cols, equals(2));
    expect(f.mineCount, equals(3));
  }

  static void _testAdjacent() {
    // This grid
    // XXXXX2
    // X7X8X3
    // X5XXX2
    // X32321
    // 110000

    final source = [null, null, null, null, null, 2,
                    null,    7, null,    8, null, 3,
                    null,    5, null, null, null, 2,
                    null,    3,    2,    3,    2, 1,
                       1,    1,    0,    0,    0, 0];

    final bools = new List<bool>.from(source.map((x) => x == null));

    final f = new Field.fromSquares(6, 5, bools);

    expect(f.mineCount, equals(13));

    for(int x = 0; x < f.cols; x++) {
      for(int y = 0; y < f.rows; y++) {
        final i = x + y * f.cols;
        final adj = f.getAdjacent(x, y);
        expect(adj, equals(source[i]));
      }
    }
  }
}
