class FieldTest {
  static void run() {
    test('defaults', _testDefaults);
    test('mineCount', _testMineCount);
    test('fromSquares', _testFromSquares);
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
}
