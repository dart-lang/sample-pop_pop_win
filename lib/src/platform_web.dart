// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:html';

final PlatformWeb targetPlatform = PlatformWeb._();

class PlatformWeb {
  static const String _aboutHash = '#about';
  bool _sizeAccessed = false;

  final _aboutController = StreamController<void>(sync: true);

  PlatformWeb._() {
    window.onPopState.listen((args) => _processUrlHash());
  }

  void clearValues() => window.localStorage.clear();

  void setValue(String key, String value) {
    window.localStorage[key] = value;
  }

  String getValue(String key) => window.localStorage[key];

  int get size {
    _sizeAccessed = true;
    var hash = (_urlHash == null) ? '7' : _urlHash;
    hash = hash.replaceAll('#', '');
    return int.tryParse(hash) ?? 7;
  }

  bool get showAbout => _urlHash == _aboutHash;

  Stream<void> get aboutChanged => _aboutController.stream;

  void toggleAbout([bool value]) {
    final loc = window.location;
    // ensure we treat empty hash like '#', which makes comparison easy later
    final hash = loc.hash.isEmpty ? '#' : loc.hash;

    final isOpen = hash == _aboutHash;
    value ??= !isOpen;

    final targetHash = value ? _aboutHash : '#';
    if (targetHash != hash) {
      loc.assign(targetHash);
    }
    _aboutController.add(null);
  }

  String get _urlHash => window.location.hash;

  void _processUrlHash() {
    final loc = window.location;
    final hash = loc.hash;
    final href = loc.href;

    switch (hash) {
      case '#reset':
        assert(href.endsWith(hash));
        final newLoc = href.substring(0, href.length - hash.length);

        window.localStorage.clear();

        loc.replace(newLoc);
        break;
      case _aboutHash:
        _aboutController.add(null);
        break;
      default:
        if (hash.isNotEmpty && _sizeAccessed) {
          loc.reload();
        }
        break;
    }
  }
}
