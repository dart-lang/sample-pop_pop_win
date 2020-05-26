// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:html';

import 'package:pop_pop_win/pop_pop_win.dart';

Future<void> main() async {
  _experimentWithAnalyticsErrorReporting();
  await startGame();
}

void _experimentWithAnalyticsErrorReporting() {
  const target = 'error';
  var input = '';
  window.onKeyPress.listen((event) {
    input = '$input${event.key}';
    if (input == target) {
      input = '';
      throw StateError('you typed error');
    } else if (target.startsWith(input)) {
      print('"$input" of "$target"');
    } else {
      input = '';
    }
  });
}
