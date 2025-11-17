// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'resources.dart';
import 'util.dart';

enum _Sounds { win, click, pop, flag, unflag, bomb, throwDart }

void win() => _playAudio(.win);

void click() => _playAudio(.click);

void pop() => _playAudio(.pop);

void flag() => _playAudio(.flag);

void unFlag() => _playAudio(.unflag);

void bomb() => _playAudio(.bomb);

void throwDart() => _playAudio(.throwDart);

void _playAudio(_Sounds sound) {
  final name = switch (sound) {
    .pop => '${sound.name}${random.nextInt(8)}',
    .bomb => '${sound.name}${random.nextInt(4)}',
    _ => sound.name,
  };
  resourceManager.getSoundSprite('audio').play(name);
}
