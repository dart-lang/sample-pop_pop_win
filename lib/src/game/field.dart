// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:math';

import '../array_2d.dart';

class Field extends Array2d<bool> {
  final int bombCount;
  final Array2d<int?> _adjacents;

  /// Creates a field with a guaranteed safe position at (safeX, safeY)
  /// This ensures the first click in Minesweeper is never a bomb
  factory Field({
    int bombCount = 40,
    int cols = 16,
    int rows = 16,
    Point<int>? noBomb,
    int? seed,
  }) {
    final squares = List<bool>.filled(rows * cols, false);
    assert(bombCount < squares.length);
    assert(bombCount > 0);
    if (noBomb != null) {
      assert(noBomb.x >= 0 && noBomb.x < cols);
      assert(noBomb.y >= 0 && noBomb.y < rows);
    }

    final rnd = Random(seed);
    final safeIndex = noBomb == null ? null : noBomb.y * cols + noBomb.x;

    final availablePositions = <int>[];
    for (var i = 0; i < squares.length; i++) {
      if (i != safeIndex) {
        availablePositions.add(i);
      }
    }

    // Shuffle the available positions and place bombs in first X positions
    availablePositions.shuffle(rnd);
    for (var i = 0; i < bombCount; i++) {
      squares[availablePositions[i]] = true;
    }

    return Field._internal(bombCount, cols, squares);
  }

  factory Field.fromSquares(int cols, int rows, List<bool> squares) {
    assert(cols > 0);
    assert(rows > 0);
    assert(squares.length == cols * rows);

    var count = 0;
    for (final m in squares) {
      if (m) {
        count++;
      }
    }
    assert(count > 0);
    assert(count < squares.length);

    return Field._internal(count, cols, List.unmodifiable(squares));
  }

  Field._internal(this.bombCount, int cols, List<bool> source)
    : _adjacents = Array2d<int?>(cols, source.length ~/ cols, (i) => null),
      assert(bombCount > 0),
      super.wrap(cols, source) {
    assert(width > 0);
    assert(height > 0);
    assert(bombCount < length);

    var count = 0;
    for (var m in this) {
      if (m) {
        count++;
      }
    }
    assert(count == bombCount);
  }

  int? getAdjacentCount(int x, int y) {
    assert(!get(x, y), 'Cannot get adjacent count from populated list!');

    var val = _adjacents.get(x, y);

    if (val == null) {
      val = 0;
      for (var i in getAdjacentIndices(x, y)) {
        if (this[i]) {
          val = val! + 1;
        }
      }
      _adjacents.set(x, y, val);
    }
    return val;
  }

  @override
  String toString() => 'w${width}h${height}m$bombCount';
}
