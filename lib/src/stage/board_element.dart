// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:stagexl/stagexl.dart';

import '../array_2d.dart';
import '../game.dart';
import 'game_element.dart';
import 'square_element.dart';

class BoardElement extends Sprite {
  Array2d<SquareElement> _elements;

  BoardElement(GameElement gameElement) {
    addTo(gameElement);

    final scaledSize = SquareElement.size * _boardScale;
    _elements = Array2d<SquareElement>(
      game.field.width,
      game.field.height,
      (i) {
        final x = i % game.field.width;
        final y = i ~/ game.field.height;
        return SquareElement(x, y)
          ..x = x * scaledSize
          ..y = y * scaledSize
          ..scaleX = _boardScale
          ..scaleY = _boardScale
          ..addTo(this)
          ..updateState();
      },
    );
  }

  GameElement get gameElement => parent as GameElement;

  num get _boardScale => gameElement.boardScale;

  SquareElement squareAt(int x, int y) => _elements.get(x, y);

  void updateSquareState() {
    for (var squareElement in _elements) {
      squareElement.updateState();
    }
  }

  Game get game => gameElement.game;
}
