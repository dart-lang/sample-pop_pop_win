// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:pop_pop_win/src/game.dart';
import 'package:test/test.dart';

// This grid
// XXXXX2
// X7X8X3
// X5XXX2
// X32321
// 110000

const sampleField = <int>[
  null, null, null, null, null, 2, // row
  null, 7, null, 8, null, 3,
  null, 5, null, null, null, 2,
  null, 3, 2, 3, 2, 1,
  1, 1, 0, 0, 0, 0
];

Field getSampleField() =>
    Field.fromSquares(6, 5, List<bool>.from(sampleField.map((x) => x == null)));

final throwsAssertionError = throwsA(const TypeMatcher<AssertionError>());
