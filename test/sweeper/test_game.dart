class TestGame {
  static void run() {
    group('Game', () {
      test('initial values', _testInitial);
      test('setFlag', _testSetFlag);
      test('cannot reveal flagged', _testCannotRevealFlagged);
      test('cannot flag revealed', _testCannotFlagRevealed);
      test('loss', _testLoss);
      test('win', _testWin);
    });
  }

  static void _testInitial() {
    final f = TestField.getSampleField();
    final g = new Game(f);

    expect(g.minesLeft, equals(13));
    expect(g.revealsLeft, equals(f.cols * f.rows - 13));
    expect(g.state, equals(GameState.notStarted));

    for(int x = 0; x < f.cols; x++) {
      for(int y = 0; y < f.rows; y++) {
        expect(g.getSquareState(x,y), equals(SquareState.hidden));
      }
    }
  }

  static void _testSetFlag() {
    final g = new Game(TestField.getSampleField());

    expect(g.getSquareState(0,0), equals(SquareState.hidden));
    g.setFlag(0, 0, true);
    expect(g.getSquareState(0,0), equals(SquareState.flagged));
    expect(g.minesLeft, equals(12));
    expect(g.state, equals(GameState.started));
  }

  static void _testCannotRevealFlagged() {
    final g = new Game(TestField.getSampleField());

    expect(g.getSquareState(0,0), equals(SquareState.hidden));
    g.setFlag(0, 0, true);
    expect(g.getSquareState(0,0), equals(SquareState.flagged));
    expect(g.minesLeft, equals(12));
    expect(g.state, equals(GameState.started));

    expect(() => g.reveal(0,0), throwsException);
  }

  static void _testCannotFlagRevealed() {
    final g = new Game(TestField.getSampleField());

    expect(g.getSquareState(1,1), equals(SquareState.hidden));
    g.reveal(1, 1);
    expect(g.getSquareState(1,1), equals(SquareState.revealed));
    expect(g.state, equals(GameState.started));

    expect(() => g.setFlag(1,1,true), throwsException);
  }

  static void _testLoss() {
    final g = new Game(TestField.getSampleField());

    expect(g.getSquareState(0,0), equals(SquareState.hidden));
    g.reveal(0, 0);
    expect(g.state, equals(GameState.lost));
    expect(g.getSquareState(0,0), equals(SquareState.revealed));
  }

  static void _testWin() {
    final f = TestField.getSampleField();
    final g = new Game(f);

    int minesLleft = f.mineCount;
    expect(g.revealsLeft, equals(f.cols * f.rows - 13));
    int revealsLeft = g.revealsLeft;
    for(int x = 0; x < f.cols; x++) {
      for(int y = 0; y < f.rows; y++) {
        expect(g.getSquareState(x,y), equals(SquareState.hidden));

        if(f.isMine(x,y)) {
          g.setFlag(x, y, true);
          minesLleft--;
          expect(g.minesLeft, equals(minesLleft));
        } else {
          g.reveal(x, y);
          revealsLeft--;
          expect(g.revealsLeft, equals(revealsLeft));
        }
        expect(g.state, isNot(equals(GameState.notStarted)));
        expect(g.state, isNot(equals(GameState.lost)));
      }
    }

    expect(g.state, equals(GameState.won));
  }
}
