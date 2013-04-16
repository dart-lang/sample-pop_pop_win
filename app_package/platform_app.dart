library ppw_platform_web;

import 'dart:async';

import 'package:meta/meta.dart';
import 'package:js/js.dart' as js;
import 'package:poppopwin/platform_target.dart';

class PlatformApp extends PlatformTarget {
  PlatformApp() : super.base();

  @override
  Future clearValues() {
    final completer = new Completer();

    js.scoped(() {
      final onDone = new js.Callback.once(() => completer.complete());

      _localProxy['clear'](onDone);
    });

    return completer.future;
  }

  @override
  Future setValue(String key, String value) {
    var map = new Map<String, String>()
        ..[key] = value;

    final completer = new Completer();

    js.scoped(() {

      final onDone = new js.Callback.once(() => completer.complete());

      _localProxy['set'](js.map(map), onDone);
    });

    return completer.future;
  }

  @override
  Future<String> getValue(String key) {
    final completer = new Completer();

    js.scoped(() {
      final onDone = new js.Callback.once(
          (value) {
            completer.complete(value[key]);
          });

      _localProxy['get'](key, onDone);
    });

    return completer.future;
  }

  js.Proxy get _localProxy => js.context['chrome']['storage']['local'];

}
