// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:pop_pop_win/src/game.dart';
import 'package:test/test.dart';

import 'test_util.dart';

void main() {
  test('defaults', _testDefaults);
  test('bombCount', _testBombCount);
  test('fromSquares', _testFromSquares);
  test('adjacent', _testAdjacent);
}

void _testDefaults() {
  final f = Field();

  expect(f.bombCount, equals(40));
  expect(f.height, equals(16));
  expect(f.width, equals(16));
}

void _testBombCount() {
  final f = Field();

  var bombCount = 0;
  for (var x = 0; x < 16; x++) {
    for (var y = 0; y < 16; y++) {
      if (f.get(x, y)) {
        bombCount++;
      }
    }
  }
  expect(bombCount, equals(f.bombCount));
}

void _testFromSquares() {
  final f = Field.fromSquares(2, 2, [true, true, true, false]);
  expect(f.height, equals(2));
  expect(f.width, equals(2));
  expect(f.bombCount, equals(3));
}

void _testAdjacent() {
  final f = getSampleField();

  expect(f.bombCount, equals(13));

  for (var x = 0; x < f.width; x++) {
    for (var y = 0; y < f.height; y++) {
      final i = x + y * f.width;

      final expected = sampleField[i];

      if (expected == null) {
        expect(() => f.getAdjacentCount(x, y), throwsAssertionError);
      } else {
        expect(f.getAdjacentCount(x, y), expected);
      }
    }
  }
}
