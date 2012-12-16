library ppw_platform;

class PlatformTarget {
  final Map<String, String> storage = new Map<String, String>();
  bool _initialized = false;

  bool get initialized => _initialized;

  void initialize() {
    assert(!_initialized);
    _initialized = true;
  }

  void trackAnalyticsEvent(String category, String action, [String label, int value]) {
    print('Analytics:: category: $category; action: $action, label: $label, value: $value');
  }
}
