library ppw_platform_web;

import 'html.dart';
import 'dart:html';
import 'package:js/js.dart' as js;
import 'platform.dart';

class PlatformWeb extends PlatformTarget {
  void initialize() {
    super.initialize();
  }

  Map<String, String> get storage => window.localStorage;

  void trackAnalyticsEvent(String category, String action, [String label, int value]) {
    js.scoped((){
      js.context.pushAnalytics(js.array(['_trackEvent', category, action, label, value]));
    });
  }
}
