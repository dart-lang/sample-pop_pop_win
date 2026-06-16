// Copyright (c) 2026, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

@TestOn('browser')
library;

import 'package:checks/checks.dart';
import 'package:pop_pop_win/src/game.dart';
import 'package:pop_pop_win/src/game_storage.dart';
import 'package:test/scaffolding.dart';

import 'test_util.dart';

class InMemoryStorage implements GameStorageLocation {
  final Map<String, String> _data = {};

  @override
  void clear() => _data.clear();

  @override
  String? getValue(String key) => _data[key];

  @override
  void setValue(String key, String? value) {
    if (value == null) {
      _data.remove(key);
    } else {
      _data[key] = value;
    }
  }
}

void main() {
  group('GameStorage abstraction tests', () {
    late InMemoryStorage storage;
    late GameStorage gameStorage;

    setUp(() {
      storage = InMemoryStorage();
      gameStorage = GameStorage(storage);
    });

    test('recordState stores state increments', () {
      gameStorage.recordState(GameState.started);
      check(storage.getValue(GameState.started.toString())).equals('1');

      gameStorage.recordState(GameState.started);
      check(storage.getValue(GameState.started.toString())).equals('2');

      gameStorage.recordState(GameState.won);
      check(storage.getValue(GameState.won.toString())).equals('1');
    });

    test('updateBestTime records and updates new best records', () {
      final f = getSampleField();
      final g = Game.fromField(f);

      // Win the game
      for (var x = 0; x < f.width; x++) {
        for (var y = 0; y < f.height; y++) {
          if (f.get(x, y)) {
            g.setFlag(x, y, true);
          } else if (g.getSquareState(x, y) == SquareState.hidden) {
            g.reveal(x, y);
          }
        }
      }

      check(g.state).equals(GameState.won);
      final duration = g.duration!.inMilliseconds;

      // Set best time first time
      final isNewBest1 = gameStorage.updateBestTime(g);
      check(isNewBest1).isTrue();
      check(
        gameStorage.getBestTimeMilliseconds(g.width, g.height, g.bombCount),
      ).equals(duration);

      // Set a worse time (longer duration) -> should return false
      // and not update.
      // Let's mock a game with a simulated longer duration
      // by writing directly to storage.
      final key = 'w${g.width}-h${g.height}-m${g.bombCount}';
      storage.setValue(
        key,
        (duration - 50).toString(),
      ); // existing best is better
      final isNewBest2 = gameStorage.updateBestTime(g);
      check(isNewBest2).isFalse();
      check(
        gameStorage.getBestTimeMilliseconds(g.width, g.height, g.bombCount),
      ).equals(duration - 50);

      // Set a better time (shorter duration) -> should return true
      // and update.
      storage.setValue(
        key,
        (duration + 100).toString(),
      ); // existing best is worse
      final isNewBest3 = gameStorage.updateBestTime(g);
      check(isNewBest3).isTrue();
      check(
        gameStorage.getBestTimeMilliseconds(g.width, g.height, g.bombCount),
      ).equals(duration);
    });

    test('reset clears all values', () {
      storage
        ..setValue('key1', 'val1')
        ..setValue('key2', 'val2');

      gameStorage.reset();

      check(storage.getValue('key1')).isNull();
      check(storage.getValue('key2')).isNull();
    });
  });
}
