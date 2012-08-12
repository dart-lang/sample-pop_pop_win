class GameTest {
  static void run() {
    group('Game', () {
      test('initial values', _testInitial);
      test('setFlag', _testSetFlag);
      test('cannot reveal flagged', _testCannotRevealFlagged);
      test('cannot flag revealed', _testCannotFlagRevealed);
    });
  }

  static void _testInitial() {
    final f = FieldTest.getSampleField();
    final g = new Game(f);

    expect(g.minesLeft, equals(13));
    expect(g.state, equals(GameState.notStarted));

    for(int x = 0; x < f.cols; x++) {
      for(int y = 0; y < f.rows; y++) {
        expect(g.getSquareState(x,y), equals(SquareState.hidden));
      }
    }
  }

  static void _testSetFlag() {
    final g = new Game(FieldTest.getSampleField());

    expect(g.getSquareState(0,0), equals(SquareState.hidden));
    g.setFlag(0, 0, true);
    expect(g.getSquareState(0,0), equals(SquareState.flagged));
    expect(g.minesLeft, equals(12));
    expect(g.state, equals(GameState.started));
  }

  static void _testCannotRevealFlagged() {
  }

  static void _testCannotFlagRevealed() {
  }

  static void _testWin() {
  }
}
