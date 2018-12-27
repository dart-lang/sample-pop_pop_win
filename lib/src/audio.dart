// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:math';

import 'package:stagexl/stagexl.dart';

final Random _rnd = Random();

ResourceManager _resourceManager;

const String _win = 'win',
    _click = 'click',
    _pop = 'Pop',
    _flag = 'flag',
    _unflag = 'unflag',
    _bomb = 'Bomb',
    _throwDart = 'throw';

void initialize(ResourceManager resourceManager) {
  if (_resourceManager != null) throw StateError('already initialized');
  _resourceManager = resourceManager;
}

void win() => _playAudio(_win);

void click() => _playAudio(_click);

void pop() => _playAudio(_pop);

void flag() => _playAudio(_flag);

void unflag() => _playAudio(_unflag);

void bomb() => _playAudio(_bomb);

void throwDart() => _playAudio(_throwDart);

void _playAudio(String name) {
  if (_resourceManager == null) throw StateError('Not initialized');
  switch (name) {
    case _pop:
      final i = _rnd.nextInt(8);
      name = '$_pop$i';
      break;
    case _bomb:
      final i = _rnd.nextInt(4);
      name = '$_bomb$i';
      break;
  }
  _resourceManager.getSoundSprite('audio').play(name);
}
