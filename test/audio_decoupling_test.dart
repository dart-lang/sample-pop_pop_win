// Copyright (c) 2026, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

@TestOn('browser')
library;

import 'package:checks/checks.dart';
import 'package:pop_pop_win/src/audio.dart';
import 'package:pop_pop_win/src/game.dart';
import 'package:pop_pop_win/src/game_manager.dart';
import 'package:test/scaffolding.dart';

class TestGameManager extends GameManager {
  TestGameManager(super.width, super.height, super.bombCount);

  @override
  void onGameStateChanged(GameState value) {
    if (value == GameState.won) {
      playAudio(Sounds.win);
    } else if (value == GameState.lost) {
      playAudio(Sounds.bomb);
    }
  }
}

void main() {
  group('Audio decoupling and event emission tests', () {
    test('playAudio puts Sound into audioEvent stream', () async {
      final manager = TestGameManager(6, 5, 13);
      final events = <Sounds>[];
      final sub = manager.audioEvent.listen(events.add);

      manager
        ..playAudio(Sounds.click)
        ..playAudio(Sounds.flag)
        ..playAudio(Sounds.throwDart);

      await pumpEventQueue();

      check(
        events,
      ).unorderedEquals([Sounds.click, Sounds.flag, Sounds.throwDart]);
      await sub.cancel();
    });

    test('state updates won/lost trigger expected audio events', () async {
      final manager = TestGameManager(4, 4, 2);
      final events = <Sounds>[];
      final sub = manager.audioEvent.listen(events.add);

      // First click starts stopwatch and sets started state
      manager.game.reveal(0, 0);

      // Trigger win state manually for coverage or lost state by hitting a
      // bomb.
      // The first click is guaranteed safe. Let's find a bomb and reveal it
      // to trigger lost.
      var bombX = -1;
      var bombY = -1;
      for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 4; y++) {
          if (manager.game.field.get(x, y)) {
            bombX = x;
            bombY = y;
            break;
          }
        }
        if (bombX != -1) break;
      }

      manager.game.reveal(bombX, bombY);
      check(manager.game.state).equals(GameState.lost);

      await pumpEventQueue();

      check(events).contains(Sounds.bomb);
      await sub.cancel();
    });
  });
}
