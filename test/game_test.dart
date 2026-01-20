// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:math';

import 'package:checks/checks.dart';
import 'package:pop_pop_win/src/game.dart';
import 'package:test/scaffolding.dart';

import 'test_util.dart';

void main() {
  test('initial values', _testInitial);
  test('setFlag', _testSetFlag);
  test('cannot reveal flagged', _testCannotRevealFlagged);
  test('cannot flag revealed', _testCannotFlagRevealed);
  test('reveal zero', _testRevealZero);
  test('loss', _testLoss);
  test('win', _testWin);
  test('random winner', _testRandomField);
  test('good chord', _testGoodChord);
  test('bad chord', _testBadChord);
  test('no-op chord', _testNoopChord);
  test('canReveal', _testCanReveal);
  test('canFlag', _testCanFlag);
  test('cannot re-reveal', _testCannotReReveal);

  _testSafeFirstClick();
}

void _testCannotReReveal() {
  final f = getSampleField();
  final g = Game.fromField(f);

  check(g.canReveal(5, 3)).isTrue();
  g
    ..reveal(5, 3)
    ..setFlag(4, 2, true);

  check(g.canReveal(5, 3)).isTrue();
  g.reveal(5, 3);

  check(g.canReveal(5, 3)).isFalse();
}

void _testCanFlag() {
  final f = getSampleField();
  final g = Game.fromField(f);

  check(g.canToggleFlag(0, 0)).isTrue();
  check(g.state).equals(GameState.reset);
  g.setFlag(0, 0, true);
  check(g.state).equals(GameState.started);
  check(g.canToggleFlag(0, 0)).isTrue();
  g.setFlag(0, 0, false);
  check(g.canToggleFlag(0, 0)).isTrue();

  check(g.canToggleFlag(5, 4)).isTrue();
  g.reveal(5, 4);
  check(g.canToggleFlag(5, 4)).isFalse();
}

void _testCanReveal() {
  final f = getSampleField();
  final g = Game.fromField(f);

  check(g.canReveal(0, 0)).isTrue();
  check(g.state).equals(GameState.reset);
  g.setFlag(0, 0, true);
  check(g.state).equals(GameState.started);
  check(g.canReveal(0, 0)).isFalse();

  check(g.canReveal(5, 4)).isTrue();
  g.reveal(5, 4);
  check(g.canReveal(5, 4)).isFalse();

  g.setFlag(4, 2, true);
  check(g.canReveal(5, 3)).isTrue();
  check(g.canReveal(4, 3)).isFalse();
  g.setFlag(3, 2, true);
  check(g.canReveal(4, 3)).isTrue();

  // now we'll over flag
  check(g.canReveal(5, 3)).isTrue();
  g.setFlag(5, 2, true);
  check(g.canReveal(5, 3)).isFalse();
}

void _testBadChord() {
  final f = getSampleField();
  final g = Game.fromField(f);

  check(g.bombsLeft).equals(13);
  final startReveals = f.length - 13;
  check(g.revealsLeft).equals(startReveals);
  check(g.state).equals(GameState.reset);

  g
    ..reveal(2, 3)
    ..setFlag(1, 2, true)
    ..setFlag(3, 2, true);

  check(g.bombsLeft).equals(11);
  check(g.revealsLeft).equals(startReveals - 1);

  final revealed = g.reveal(2, 3);
  check(revealed).isNull();
  check(g.state).equals(GameState.lost);
}

// Adjacent flag count != square count
// so nothing happens
void _testNoopChord() {
  final f = getSampleField();
  final g = Game.fromField(f);

  check(g.bombsLeft).equals(13);
  final startReveals = f.length - 13;
  check(g.revealsLeft).equals(startReveals);
  check(g.state).equals(GameState.reset);

  final revealed = g.reveal(2, 3);
  check(
    revealed,
  ).isA<Iterable<Point<int>>>().unorderedEquals([const Point(2, 3)]);

  g.setFlag(2, 2, true);

  check(g.bombsLeft).equals(12);
  check(g.revealsLeft).equals(startReveals - 1);

  check(() => g.reveal(2, 3)).throws<AssertionError>();
}

void _testGoodChord() {
  final f = getSampleField();
  final g = Game.fromField(f);

  check(g.bombsLeft).equals(13);
  final startReveals = f.length - 13;
  check(g.revealsLeft).equals(startReveals);
  check(g.state).equals(GameState.reset);

  g
    ..reveal(2, 3)
    ..setFlag(2, 2, true)
    ..setFlag(3, 2, true);

  check(g.bombsLeft).equals(11);
  check(g.revealsLeft).equals(startReveals - 1);

  g.reveal(2, 3);
  check(g.bombsLeft).equals(11);
  check(g.revealsLeft).equals(startReveals - 11);
  check(g.duration).isNotNull();
}

// Test 5 random fields five times
void _testRandomField() {
  final rnd = Random();
  for (var i = 0; i < 5; i++) {
    final f = Field();

    for (var j = 0; j < 5; j++) {
      final g = Game.fromField(f);
      while (g.revealsLeft > 0) {
        final x = rnd.nextInt(f.width);
        final y = rnd.nextInt(f.height);
        if (g.getSquareState(x, y) == SquareState.hidden) {
          if (f.get(x, y)) {
            g.setFlag(x, y, true);
          } else if (!f.get(x, y)) {
            g.reveal(x, y);
          }
        }
      }
      check(g.state).equals(GameState.won);
    }
  }
}

void _testRevealZero() {
  final f = getSampleField();
  final g = Game.fromField(f);

  check(g.bombsLeft).equals(13);
  final startReveals = f.length - 13;
  check(g.revealsLeft).equals(startReveals);
  check(g.state).equals(GameState.reset);

  g.reveal(5, 4);
  check(g.revealsLeft).equals(startReveals - 10);
}

void _testInitial() {
  final f = getSampleField();
  final g = Game.fromField(f);

  check(g.bombsLeft).equals(13);
  check(g.revealsLeft).equals(f.length - 13);
  check(g.state).equals(GameState.reset);
  check(g.duration).isNull();

  for (var x = 0; x < f.width; x++) {
    for (var y = 0; y < f.height; y++) {
      check(g.getSquareState(x, y)).equals(SquareState.hidden);
    }
  }
}

void _testSetFlag() {
  final g = Game.fromField(getSampleField());

  check(g.getSquareState(0, 0)).equals(SquareState.hidden);
  g.setFlag(0, 0, true);
  check(g.getSquareState(0, 0)).equals(SquareState.flagged);
  check(g.bombsLeft).equals(12);
  check(g.state).equals(GameState.started);
}

void _testCannotRevealFlagged() {
  final g = Game.fromField(getSampleField());

  check(g.getSquareState(0, 0)).equals(SquareState.hidden);
  g.setFlag(0, 0, true);
  check(g.getSquareState(0, 0)).equals(SquareState.flagged);
  check(g.bombsLeft).equals(12);
  check(g.state).equals(GameState.started);

  check(() => g.reveal(0, 0)).throws<AssertionError>();
}

void _testCannotFlagRevealed() {
  final g = Game.fromField(getSampleField());

  check(g.getSquareState(1, 1)).equals(SquareState.hidden);
  g.reveal(1, 1);
  check(g.getSquareState(1, 1)).equals(SquareState.revealed);
  check(g.state).equals(GameState.started);

  check(() => g.setFlag(1, 1, true)).throws<AssertionError>();
}

void _testLoss() {
  final g = Game.fromField(getSampleField());

  check(g.getSquareState(0, 0)).equals(SquareState.hidden);
  final revealed = g.reveal(0, 0);
  check(revealed).isNull();
  check(g.state).equals(GameState.lost);
  check(g.getSquareState(0, 0)).equals(SquareState.bomb);
}

void _testWin() {
  final f = getSampleField();
  final g = Game.fromField(f);

  var bombsLeft = f.bombCount;
  check(g.revealsLeft).equals(f.length - 13);
  var revealsLeft = g.revealsLeft;
  for (var x = 0; x < f.width; x++) {
    for (var y = 0; y < f.height; y++) {
      if (f.get(x, y)) {
        g.setFlag(x, y, true);
        bombsLeft--;
        check(g.bombsLeft).equals(bombsLeft);
      } else if (g.getSquareState(x, y) == SquareState.hidden) {
        revealsLeft -= g.reveal(x, y)!.length;
        check(revealsLeft).equals(g.revealsLeft);
      } else {
        check(g.getSquareState(x, y)).equals(SquareState.revealed);
      }
      check(g.state).not((it) => it.equals(GameState.reset));
      check(g.state).not((it) => it.equals(GameState.lost));
    }
  }

  check(g.state).equals(GameState.won);
}

// Test to verify that the first click is never a bomb
void _testSafeFirstClick() {
  group('Safe First Click Tests', () {
    test('first click is never a bomb - multiple positions', () {
      for (var testRun = 0; testRun < 10; testRun++) {
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            final game = Game(8, 8, 10); // 8x8 grid with 10 bombs

            // First click at position (x, y)
            final reveals = game.reveal(x, y);

            // Should never be null (which indicates hitting a bomb)
            check(reveals).isNotNull();

            // Game should be started, not lost
            check(game.state).equals(GameState.started);
          }
        }
      }
    });

    test('field generation is lazy', () {
      final game = Game(8, 8, 10);

      // Before any click, field returns a temporary field for UI purposes
      final tempField = game.field;
      check(tempField.bombCount).equals(10);
      check(tempField.width).equals(8);
      check(tempField.height).equals(8);

      // After first click, field should be the actual generated field
      game.reveal(4, 4);
      final gameField = game.field;

      // The clicked position should be safe
      check(gameField.get(4, 4)).isFalse();

      // And it should be a different field instance (the real one)
      check(identical(tempField, gameField)).isFalse();
    });

    test('bomb count is correct after lazy generation', () {
      final game = Game(8, 8, 10)..reveal(3, 3);

      // Count actual bombs in field
      var actualBombs = 0;
      for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
          if (game.field.get(x, y)) {
            actualBombs++;
          }
        }
      }

      check(actualBombs).equals(10);
      check(game.bombsLeft).equals(10);
    });

    test('legacy Game.fromField constructor still works', () {
      // This ensures backward compatibility
      final game = Game(4, 4, 3)..reveal(2, 2); // Generate the field
      final field = game.field; // Get a field from lazy generation
      final game2 = Game.fromField(field);

      check(game2.field).equals(field);
      check(game2.bombCount).equals(field.bombCount);
      check(game2.width).equals(field.width);
      check(game2.height).equals(field.height);
    });
  });
}
