// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:stagexl/stagexl.dart';

import '../game.dart';
import 'game_element.dart';

class GameBackgroundElement extends Sprite {
  num get _backgroundScale => (parent as GameElement).boardScale;

  int get _boardSize => (parent as GameElement).boardSize;

  Game get _game => (parent as GameElement).game;

  GameBackgroundElement(GameElement gameElement, TextureAtlas op) {
    addTo(gameElement);

    //the lengths we go to reduce bytes down the wire...
    final ttl = Bitmap(op.getBitmapData('background_top_left'));
    final stl = Bitmap(op.getBitmapData('background_side_left'))..y = 96;

    final bbl = Bitmap(op.getBitmapData('background_top_left'))
      ..scaleY = -1
      ..y = 1534;
    final sbl = Bitmap(op.getBitmapData('background_side_left'))
      ..scaleY = -1
      ..y = 1438;

    final ttr = Bitmap(op.getBitmapData('background_top_left'))
      ..scaleX = -1
      ..x = 2048;
    final str = Bitmap(op.getBitmapData('background_side_left'))
      ..scaleX = -1
      ..x = 2048
      ..y = 96;

    final bbr = Bitmap(op.getBitmapData('background_top_left'))
      ..scaleX = -1
      ..x = 2048
      ..scaleY = -1
      ..y = 1534;
    final sbr = Bitmap(op.getBitmapData('background_side_left'))
      ..scaleX = -1
      ..x = 2048
      ..scaleY = -1
      ..y = 1438;

    addChild(ttl);
    addChild(stl);
    addChild(bbl);
    addChild(sbl);
    addChild(ttr);
    addChild(str);
    addChild(bbr);
    addChild(sbr);

    //draw the board
    final boardData = BitmapData(_boardSize, _boardSize, 0x000000);
    final cr = Rectangle<int>(0, 0, 112, 122);
    boardData
      ..drawPixels(
          op.getBitmapData('game_board_corner_top_left'), cr, Point<int>(0, 0))
      ..drawPixels(op.getBitmapData('game_board_corner_top_right'), cr,
          Point<int>(_boardSize - 112, 0))
      ..drawPixels(op.getBitmapData('game_board_corner_bottom_left'), cr,
          Point<int>(0, _boardSize - 112))
      ..drawPixels(op.getBitmapData('game_board_corner_bottom_right'), cr,
          Point<int>(_boardSize - 112, _boardSize - 112));
    final tbr = Rectangle<int>(0, 0, 80, 112);
    final lrr = Rectangle<int>(0, 0, 112, 80);
    for (var i = 0; i < _game.field.width - 2; i++) {
      boardData
        ..drawPixels(op.getBitmapData('game_board_side_top'), tbr,
            Point<int>(112 + i * 80, 0))
        ..drawPixels(op.getBitmapData('game_board_side_bottom'), tbr,
            Point<int>(112 + i * 80, _boardSize - 112))
        ..drawPixels(op.getBitmapData('game_board_side_left'), lrr,
            Point<int>(0, 112 + i * 80))
        ..drawPixels(op.getBitmapData('game_board_side_right'), lrr,
            Point<int>(_boardSize - 112, 112 + i * 80));
    }

    final board = Bitmap(boardData)
      ..x = GameElement.boardOffset.x
      ..y = GameElement.boardOffset.y
      ..scaleX = _backgroundScale
      ..scaleY = _backgroundScale;

    addChild(board);
  }
}
