// Copyright (c) 2026, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

@TestOn('browser')
import 'package:checks/checks.dart';
import 'package:pop_pop_win/src/platform_web.dart';
import 'package:test/scaffolding.dart';

void main() {
  group('PlatformWeb size parsing and clamping tests', () {
    test('defaults to 7 for invalid or empty values', () {
      check(PlatformWeb.clampSize('')).equals(7);
      check(PlatformWeb.clampSize('#')).equals(7);
      check(PlatformWeb.clampSize('invalid')).equals(7);
      check(PlatformWeb.clampSize('#invalid')).equals(7);
    });

    test('parses valid sizes and clamps inside bounds [5, 40]', () {
      check(PlatformWeb.clampSize('7')).equals(7);
      check(PlatformWeb.clampSize('#7')).equals(7);
      check(PlatformWeb.clampSize('12')).equals(12);
      check(PlatformWeb.clampSize('#16')).equals(16);
      check(PlatformWeb.clampSize('#24')).equals(24);
    });

    test('clamps values below minimum (5) up to 5', () {
      check(PlatformWeb.clampSize('0')).equals(5);
      check(PlatformWeb.clampSize('#0')).equals(5);
      check(PlatformWeb.clampSize('-5')).equals(5);
      check(PlatformWeb.clampSize('3')).equals(5);
      check(PlatformWeb.clampSize('#4')).equals(5);
    });

    test('clamps values above maximum (40) down to 40', () {
      check(PlatformWeb.clampSize('41')).equals(40);
      check(PlatformWeb.clampSize('#100')).equals(40);
      check(PlatformWeb.clampSize('9999')).equals(40);
    });
  });
}
