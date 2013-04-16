library ppw_platform_web;

import 'dart:html';
import 'package:js/js.dart' as js;
import 'package:poppopwin/platform_target.dart';

class PlatformWeb extends PlatformTarget {

  Map<String, String> get storage => window.localStorage;

  void trackAnalyticsEvent(String category, String action, [String label, int value]) {
    js.context['pushAnalytics'](js.array(['_trackEvent', category, action, label, value]));
  }
}
