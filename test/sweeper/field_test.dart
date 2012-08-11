class FieldTest {
  static void run() {
    test('defaults', _testDefaults);
    test('mineCount', _testMineCount);
  }

  static void _testDefaults() {
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

}
