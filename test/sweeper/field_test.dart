class FieldTest {
  static void run() {
    test('simple', _simple);
  }

  static void _simple() {
    final f = new Field();
    expect(f.mineCount, equals(40));
    expect(f.rows, equals(16));
    expect(f.cols, equals(16));
  }

}
