// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.
library pop_pop_win.platform_target;

import 'dart:async';

abstract class PlatformTarget {
  bool _initialized = false;

  factory PlatformTarget() => new _DefaultPlatform();

  PlatformTarget.base();

  bool get initialized => _initialized;

  void initialize() {
    assert(!_initialized);
    _initialized = true;
  }

  Future clearValues();

  Future setValue(String key, String value);

  Future<String> getValue(String key);

  int get size;

  bool get showAbout;

  void toggleAbout([bool value]);

  Stream<Null> get aboutChanged;
}

class _DefaultPlatform extends PlatformTarget {
  final Map<String, String> _values = new Map<String, String>();
  final _aboutController = new StreamController<Null>(sync: true);
  bool _about = false;

  _DefaultPlatform() : super.base();

  @override
  Future clearValues() async => _values.clear();

  @override
  Future setValue(String key, String value) async => _values[key] = value;

  @override
  Future<String> getValue(String key) async => _values[key];

  @override
  int get size => 7;

  @override
  void toggleAbout([bool value]) {
    assert(_about != null);
    if (value == null) {
      value = !_about;
    }
    _about = value;
    _aboutController.add(null);
  }

  @override
  bool get showAbout => _about;

  @override
  Stream<Null> get aboutChanged => _aboutController.stream;
}
