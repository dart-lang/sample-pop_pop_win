// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'resources.dart';
import 'util.dart';

enum Sounds {
  win,
  click,
  pop(count: 9),
  flag,
  unflag,
  bomb(count: 5),
  throwDart;

  const Sounds({this.count = 1});

  final int count;

  void play() => _playAudio(this);
}

void _playAudio(Sounds sound) {
  final count = sound.count == 1 ? '' : random.nextInt(sound.count).toString();
  resourceManager.getSoundSprite('audio').play('${sound.name}$count');
}
