#library('ppw-analytics');

#import('package:js/js.dart', prefix: 'js');

void trackAnalyticsEvent(String category, String action) {
  js.scoped((){
    js.context.pushAnalytics(js.array(['_trackEvent', category, action]));
  });
}
