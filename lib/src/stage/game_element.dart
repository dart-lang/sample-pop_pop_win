// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:math';

import 'package:stagexl/stagexl.dart' hide Point;

import '../audio.dart' as game_audio;
import '../game.dart';
import '../resources.dart';
import '../util.dart';
import 'board_element.dart';
import 'game_background_element.dart';
import 'game_root.dart';
import 'score_element.dart';
import 'square_element.dart';

const _frameRate = 60;
const _edgeOffset = 32;
const _backgroundSize = Point<int>(2048, 1536);
const _backgroundHoleSize = 16 * SquareElement.size + 2 * _edgeOffset;
const _popAnimationHitFrame = 12;

class GameElement extends Sprite {
  static final Vector boardOffset = Vector(352, 96);
  static final _popExplodeAnimationOffset = Vector(-88, -88);
  static final _dartAnimationOffset =
      Vector(-512 + 0.5 * SquareElement.size, -388 + 0.5 * SquareElement.size);

  final GameRoot _manager;

  BoardElement _boardElement;
  ScoreElement _scoreElement;
  SimpleButton _logoButton;
  final _popLayer = Sprite(), _dartLayer = Sprite();

  int _boardSize;
  num _boardScale;

  TextureAtlas _animations;

  Game get game => _manager.game;

  int get boardSize => _boardSize;

  num get boardScale => _boardScale;

  ScoreElement get scoreElement => _scoreElement;

  GameElement(this._manager) {
    final opa = resourceManager.getTextureAtlas('opaque');
    final sta = resourceManager.getTextureAtlas('static');
    _animations = resourceManager.getTextureAtlas('animated');

    _boardSize = game.field.width * SquareElement.size + 2 * _edgeOffset;
    _boardScale = _backgroundHoleSize / _boardSize;

    GameBackgroundElement(this, opa);

    final newButtonNormal = Bitmap(sta.getBitmapData('button_new_game'));
    final newButtonPressed =
        Bitmap(sta.getBitmapData('button_new_game_clicked'));

    SimpleButton(
        newButtonNormal, newButtonPressed, newButtonPressed, newButtonPressed)
      ..x = 450
      ..y = 20
      ..onMouseClick.listen((e) {
        game_audio.click();
        _manager.newGame();
      })
      ..addTo(this);

    _boardElement = BoardElement(this)
      ..x = boardOffset.x + _edgeOffset * _boardScale
      ..y = boardOffset.y + _edgeOffset * _boardScale;

    _scoreElement = ScoreElement(_manager.bestTimeMilliseconds)..addTo(this);

    final logoScale = min(max(_boardScale, 1.1), 1.5);
    final logo = Bitmap(sta.getBitmapData('logo_win'));
    _logoButton = SimpleButton(logo, logo, logo, logo);
    _logoButton
      ..y = 20
      ..scaleX = logoScale
      ..scaleY = logoScale
      ..x = _backgroundSize.x / 2 - _logoButton.width / 2
      ..onMouseClick.listen((e) => _titleClickedEventHandle.add(null))
      ..addTo(this);

    _popLayer
      ..mouseEnabled = false
      ..x = boardOffset.x + _edgeOffset * _boardScale
      ..y = boardOffset.y + _edgeOffset * _boardScale
      ..scaleX = _boardScale
      ..scaleY = _boardScale
      ..addTo(this);

    _dartLayer
      ..mouseEnabled = false
      ..x = boardOffset.x + _edgeOffset * _boardScale
      ..y = boardOffset.y + _edgeOffset * _boardScale
      ..scaleX = _boardScale
      ..scaleY = _boardScale
      ..addTo(this);
  }

  void updateSquareState() => _boardElement.updateSquareState();

  void click(int x, int y, bool alt) {
    assert(!game.gameEnded);
    final ss = game.getSquareState(x, y);

    List<Point<int>> reveals;

    if (alt) {
      if (ss == SquareState.hidden || ss == SquareState.flagged) {
        _toggleFlag(x, y);
      } else if (ss == SquareState.revealed) {
        if (game.canReveal(x, y)) {
          // get adjacent balloons
          final adjHidden = game.field
              .getAdjacentIndices(x, y)
              .map((i) => game.field.getCoordinate(i))
              .where((t) => game.getSquareState(t.x, t.y) == SquareState.hidden)
              .toList();

          assert(adjHidden.isNotEmpty);

          _startDartAnimation(adjHidden);
          reveals = game.reveal(x, y);
        }
      }
    } else {
      if (ss == SquareState.hidden) {
        _startDartAnimation([Point(x, y)]);
        reveals = game.reveal(x, y);
      }
    }

    if (reveals != null && reveals.isNotEmpty) {
      assert(game.state != GameState.lost);
      if (!alt) {
        // if it was a normal click, the first item should be the clicked item
        final first = reveals[0];
        assert(first.x == x);
        assert(first.y == y);
      }
      _startPopAnimation(Point(x, y), reveals);
    } else if (game.state == GameState.lost) {
      _startPopAnimation(Point(x, y));
    }
  }

  bool _toggleFlag(int x, int y) {
    assert(!game.gameEnded);
    final se = _boardElement.squareAt(x, y);
    final ss = se.squareState;
    if (ss == SquareState.hidden) {
      game.setFlag(x, y, true);
      se.updateState();
      game_audio.flag();
      return true;
    } else if (ss == SquareState.flagged) {
      game.setFlag(x, y, false);
      se.updateState();
      game_audio.unFlag();
      return true;
    }
    return false;
  }

  void _startPopAnimation(Point<int> start, [Iterable<Point<int>> reveals]) {
    if (reveals == null) {
      assert(game.state == GameState.lost);

      reveals = Iterable.generate(game.field.length, (i) {
        final c = game.field.getCoordinate(i);
        return _Tuple(c, game.getSquareState(c.x, c.y));
      })
          .where((t2) =>
              t2.item2 == SquareState.bomb || t2.item2 == SquareState.hidden)
          .map((t2) => t2.item1)
          .toList();
    }

    final values = reveals.map((c) {
      final initialOffset =
          Vector(SquareElement.size * c.x, SquareElement.size * c.y);
      final squareOffset = _popExplodeAnimationOffset + initialOffset;

      var delay = _popAnimationHitFrame + ((c - start).magnitude * 4).toInt();
      delay += random.nextInt(10);

      return _Values(c, squareOffset, delay);
    }).toList()
      ..sort((a, b) => a.delay.compareTo(b.delay));

    for (var v in values) {
      final c = v.point;
      final squareOffset = v.squareOffset;

      final se = _boardElement.squareAt(c.x, c.y);
      final ss = se.squareState;

      final texturePrefix =
          ss == SquareState.bomb ? 'balloon_explode' : 'balloon_pop';

      final anim =
          FlipBook(_animations.getBitmapDatas(texturePrefix), _frameRate, false)
            ..x = squareOffset.x
            ..y = squareOffset.y
            ..alpha = 0
            ..mouseEnabled = false
            ..addTo(_popLayer);

      anim.onComplete.listen((e) => anim.removeFromParent());

      stage.juggler
        ..add(anim)
        ..delayCall(() => _animationDelay(anim, se, ss), v.delay / _frameRate);
    }
  }

  void _startDartAnimation(List<Point> points) {
    assert(points.isNotEmpty);
    game_audio.throwDart();
    for (var point in points) {
      final squareOffset = _dartAnimationOffset +
          Vector(SquareElement.size * point.x, SquareElement.size * point.y);

      final dart =
          FlipBook(_animations.getBitmapDatas('dart'), _frameRate, false)
            ..x = squareOffset.x
            ..y = squareOffset.y
            ..mouseEnabled = false
            ..play()
            ..addTo(_dartLayer);

      dart.onComplete.listen((e) => dart.removeFromParent());

      final shadow =
          FlipBook(_animations.getBitmapDatas('shadow'), _frameRate, false)
            ..x = squareOffset.x
            ..y = squareOffset.y
            ..mouseEnabled = false
            ..play()
            ..addTo(_dartLayer);

      shadow.onComplete.listen((e) => shadow.removeFromParent());

      stage.juggler..add(dart)..add(shadow);
    }
  }
}

void _animationDelay(FlipBook anim, SquareElement se, SquareState ss) {
  anim
    ..alpha = 1
    ..play();
  se.updateState();
  switch (ss) {
    case SquareState.revealed:
    case SquareState.hidden:
      game_audio.pop();
      break;
    case SquareState.bomb:
      game_audio.bomb();
      break;
    default:
    // noop
  }
}

final _titleClickedEventHandle = StreamController<void>();

Stream<void> get titleClickedEvent => _titleClickedEventHandle.stream;

class _Values {
  final Point<int> point;
  final Vector squareOffset;
  final int delay;

  _Values(this.point, this.squareOffset, this.delay);
}

class _Tuple {
  final Point<int> item1;
  final SquareState item2;

  _Tuple(this.item1, this.item2);
}
