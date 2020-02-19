// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:stagexl/stagexl.dart';

import '../game.dart';
import 'game_element.dart';

class ScoreElement extends TextField {
  int bestTime;

  ScoreElement(this.bestTime) {
    defaultTextFormat =
        TextFormat('Slackey, cursive', 28, Color.Black, leading: 1);
    autoSize = TextFieldAutoSize.LEFT;
    x = 1400;
    y = 20;
  }

  @override
  void render(RenderState renderState) {
    final newTextValue = _textValue();
    if (newTextValue != text) {
      text = newTextValue;
    }
    super.render(renderState);
  }

  String _textValue() {
    final timeInSeconds = (_game.duration == null)
        ? '0'
        : (_game.duration.inMilliseconds / 1000).toStringAsFixed(1);
    var textValue = 'Bombs Left: ${_game.bombsLeft}\nTime: $timeInSeconds';
    if (bestTime != null) {
      textValue = '$textValue\nRecord: ${(bestTime / 1000).toStringAsFixed(1)}';
    }

    return textValue;
  }

  Game get _game => (parent as GameElement).game;
}
