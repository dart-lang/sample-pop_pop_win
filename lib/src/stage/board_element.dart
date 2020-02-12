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
    _elements =
        Array2d<SquareElement>(game.field.width, game.field.height, (x, y) {
      final se = SquareElement(x, y)
        ..x = x * scaledSize
        ..y = y * scaledSize
        ..scaleX = _boardScale
        ..scaleY = _boardScale
        ..addTo(this);

      se.updateState();
      return se;
    });
  }

  GameElement get gameElement => parent as GameElement;

  num get _boardScale => gameElement.boardScale;

  Array2d<SquareElement> get squares => _elements;

  Game get game => gameElement.game;

  TextureAtlas get opaqueAtlas =>
      gameElement.resourceManager.getTextureAtlas('opaque');
}
