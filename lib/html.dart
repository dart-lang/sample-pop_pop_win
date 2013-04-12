library ppw_html;

import 'dart:async';
import 'dart:collection';
import 'dart:html';
import 'dart:math' as math;
import 'package:bot/bot.dart';
import 'package:bot_web/bot_html.dart';
import 'poppopwin.dart';
import 'platform.dart';

part 'src/html/high_score_view.dart';
part 'src/html/game_view.dart';
part 'src/html/game_storage.dart';
part 'src/html/game_manager.dart';

PlatformTarget _platformImpl;

void initPlatform(PlatformTarget value) {
  assert(value != null);
  assert(!value.initialized);
  assert(_platformImpl == null);
  _platformImpl = value;
  _platformImpl.initialize();
}

PlatformTarget get targetPlatform {
  if(_platformImpl == null) {
    initPlatform(new PlatformTarget());
  }
  return _platformImpl;
}
