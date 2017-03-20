// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:pop_pop_win/pop_pop_win.dart';
import 'package:pwa/client.dart' as pwa;

main() {
  // register PWA ServiceWorker for offline caching.
  new pwa.Client();
  startGame();
}
