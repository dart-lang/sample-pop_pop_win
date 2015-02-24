// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.
library pop_pop_win.audio;

import 'dart:math';

import 'package:stagexl/stagexl.dart';

final Random _rnd = new Random();

ResourceManager _resourceManager;

const String _WIN = 'win',
    _CLICK = 'click',
    _POP = 'Pop',
    _FLAG = 'flag',
    _UNFLAG = 'unflag',
    _BOMB = 'Bomb',
    _THROW_DART = 'throw';

void initialize(ResourceManager resourceManager) {
  if (_resourceManager != null) throw new StateError('already initialized');
  _resourceManager = resourceManager;
}

void win() => _playAudio(_WIN);

void click() => _playAudio(_CLICK);

void pop() => _playAudio(_POP);

void flag() => _playAudio(_FLAG);

void unflag() => _playAudio(_UNFLAG);

void bomb() => _playAudio(_BOMB);

void throwDart() => _playAudio(_THROW_DART);

void _playAudio(String name) {
  if (_resourceManager == null) throw new StateError('Not initialized');
  switch (name) {
    case _POP:
      var i = _rnd.nextInt(8);
      name = '${_POP}$i';
      break;
    case _BOMB:
      var i = _rnd.nextInt(4);
      name = '${_BOMB}$i';
      break;
  }
  _resourceManager.getSoundSprite('audio').play(name);
}
