// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:stagexl/stagexl.dart';

import '../analytics.dart';
import '../audio.dart' as game_audio;
import '../game.dart';
import '../game_manager.dart';
import 'game_element.dart';

class GameRoot extends GameManager {
  final Stage stage;
  final _eventCount = <GameState, int>{};

  late final GameElement _gameElement;

  GameRoot(super.width, super.height, super.bombCount, this.stage) {
    _gameElement = GameElement(this)..alpha = 0;

    stage
      ..addChild(_gameElement)
      ..juggler.addTween(_gameElement, .5).animate.alpha.to(1);
  }

  @override
  void onGameStateChanged(GameState value) {
    final count = _eventCount[value] = (_eventCount[value] ?? 0) + 1;

    gtag(
      'event',
      'game_event',
      GTagAnalyticsEventOptions(
        event_category: 'sample-pop_pop_win',
        event_label: value.name,
        value: count,
      ),
    );
    if (value == GameState.won) {
      _gameElement.updateSquareState();
      if (_gameElement.scoreElement!.bestTime == null ||
          game.duration!.inMilliseconds <
              _gameElement.scoreElement!.bestTime!) {
        _gameElement.scoreElement!.bestTime = game.duration!.inMilliseconds;
      }
      game_audio.win();
    }
  }

  @override
  void newGame() {
    super.newGame();
    _gameElement.updateSquareState();
  }
}
