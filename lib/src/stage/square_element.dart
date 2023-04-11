// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:stagexl/stagexl.dart';

import '../game.dart';
import '../resources.dart';
import 'board_element.dart';
import 'game_element.dart';

class SquareElement extends Sprite {
  static const int size = 80;

  static const List<String> _balloonBits = [
    'balloon_pieces_a',
    'balloon_pieces_b',
    'balloon_pieces_c',
    'balloon_pieces_d'
  ];

  static const List<String> _numberMap = [
    'game_board_center',
    'number_one',
    'number_two',
    'number_three',
    'number_four',
    'number_five',
    'number_six',
    'number_seven',
    'number_eigh'
  ];

  final int column, row;

  final Bitmap _bitmap = Bitmap(BitmapData(size, size, Color.Transparent));

  SquareElement(this.column, this.row) {
    addChild(_bitmap);

    onMouseClick.listen(_onClick);
    onMouseRightClick.listen(_onClick);

    useHandCursor = true;
  }

  void updateState() {
    final textureName = switch (squareState) {
      SquareState.hidden => _getHiddenTexture(),
      SquareState.flagged => 'balloon_tagged_frozen',
      SquareState.revealed => _numberMap[_adjacentCount],
      SquareState.bomb => 'crater_b',
      SquareState.safe => 'balloon_tagged_bomb'
    };

    useHandCursor = !_game.gameEnded &&
        (squareState == SquareState.hidden ||
            squareState == SquareState.flagged);

    _bitmap.bitmapData!
      ..clear()
      ..drawPixels(
          resourceManager.getTextureAtlas('opaque').getBitmapData(textureName),
          Rectangle<int>(0, 0, size, size),
          Point<int>(0, 0));
  }

  void _onClick(MouseEvent e) {
    if (!_game.gameEnded) {
      final alt = (e.type == MouseEvent.RIGHT_CLICK) || e.shiftKey!;
      _gameElement.click(column, row, alt);
    }
  }

  @override
  String toString() => 'Square at [$x, $y]';

  String _getHiddenTexture() {
    assert(squareState == SquareState.hidden);
    if (_game.state == GameState.lost) {
      useHandCursor = false;
      final index = (column + row) % _balloonBits.length;
      return _balloonBits[index];
    } else {
      useHandCursor = true;
      return 'balloon';
    }
  }

  SquareState get squareState => _game.getSquareState(column, row);

  int get _adjacentCount => _game.field.getAdjacentCount(column, row)!;

  BoardElement get _board => parent as BoardElement;

  GameElement get _gameElement => _board.gameElement;

  Game get _game => _board.game;
}
