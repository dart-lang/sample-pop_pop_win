class GameTest {
  static void run() {
    group('Game', () {
      test('initial values', _testInitial);
    });
  }

  static void _testInitial() {
    final g = new Game(FieldTest.getSampleField());

    expect(g.minesLeft, equals(13));
    expect(g.state, equals(GameState.notStarted));
  }
}
