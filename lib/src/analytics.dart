// Copyright (c) 2018, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// ignore_for_file: non_constant_identifier_names

@JS()
library;

import 'dart:js_interop';

import 'package:web/web.dart';

void gtag(
  String event,
  String action, [
  GTagAnalyticsEventOptions? eventParams,
]) {
  try {
    _gtag(event, action, eventParams);
    // ignore: avoid_catches_without_on_clauses
  } catch (e, stack) {
    console
      ..error(e.toString().toJS)
      ..error(stack.toString().toJS);
  }
}

@JS('gtag')
external void _gtag(
  String event,
  String action, [
  GTagAnalyticsEventOptions? eventParams,
]);

void sendTiming(
  String name, {
  int? value,
  String? eventCategory,
  String? eventLabel,
}) {
  value ??= window.performance.now().toInt();

  gtag(
    'send',
    'timing_complete',
    GTagAnalyticsEventOptions(
      name: name,
      value: value,
      event_category: eventCategory,
      event_label: eventLabel,
    ),
  );
}

extension type GTagAnalyticsEventOptions._(JSObject _) {
  external String get event_category;

  external String get event_label;

  external int get value;

  external int get name;

  external factory GTagAnalyticsEventOptions({
    String? event_category,
    String? event_label,
    int? value,
    String? name,
  });
}
