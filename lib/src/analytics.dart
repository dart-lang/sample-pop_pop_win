// Copyright (c) 2018, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// ignore_for_file: non_constant_identifier_names

@JS()
library analytics;

import 'package:js/js.dart';

@JS('gtag')
external void gtag(String event, String eventName,
    [GTagAnalyticsEventOptions eventParams]);

@JS()
@anonymous
class GTagAnalyticsEventOptions {
  external String get event_category;
  external String get event_label;
  external int get value;

  external factory GTagAnalyticsEventOptions(
      {String event_category, String event_label, int value});
}
