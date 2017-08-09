// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.
library pop_pop_win.stage.game_element;

import 'dart:async';
import 'dart:math';

import 'package:stagexl/stagexl.dart' hide Point;

import '../audio.dart' as game_audio;
import '../game.dart';
import '../util.dart';
import 'board_element.dart';
import 'game_background_element.dart';
import 'game_root.dart';
import 'score_element.dart';
import 'square_element.dart';

const _frameRate = 60;

class GameElement extends Sprite {
  static const _edgeOffset = 32;
  static final _backgroundSize = new Point<int>(2048, 1536);
  static const _backgroundHoleSize = 16 * SquareElement.size + 2 * _edgeOffset;
  static final Vector boardOffset = new Vector(352, 96);
  static const _popAnimationHitFrame = 12;
  static final _popExplodeAnimationOffset = new Vector(-88, -88);
  static final _dartAnimationOffset = new Vector(
      -512 + 0.5 * SquareElement.size, -388 + 0.5 * SquareElement.size);

  final GameRoot manager;

  final Random _rnd = new Random();

  BoardElement _boardElement;
  ScoreElement _scoreElement;
  SimpleButton _logoButton;
  final _popLayer = new Sprite(), _dartLayer = new Sprite();

  int _boardSize;
  num _boardScale;

  int _targetX, _targetY;
  TextureAtlas _animations;

  Game get game => manager.game;
  ResourceManager get resourceManager => manager.resourceManager;

  int get boardSize => _boardSize;
  num get boardScale => _boardScale;

  ScoreElement get scoreElement => _scoreElement;
  BoardElement get boardElement => _boardElement;

  GameElement(this.manager) {
    TextureAtlas opa = resourceManager.getTextureAtlas('opaque');
    TextureAtlas sta = resourceManager.getTextureAtlas('static');
    _animations = resourceManager.getTextureAtlas('animated');

    _boardSize = game.field.width * SquareElement.size + 2 * _edgeOffset;
    _boardScale = _backgroundHoleSize / _boardSize;

    new GameBackgroundElement(this, opa);

    var newButtonNormal = new Bitmap(sta.getBitmapData('button_new_game'));
    var newButtonPressed =
        new Bitmap(sta.getBitmapData('button_new_game_clicked'));

    new SimpleButton(
        newButtonNormal, newButtonPressed, newButtonPressed, newButtonPressed)
      ..x = 450
      ..y = 20
      ..onMouseClick.listen((e) {
        game_audio.click();
        manager.newGame();
      })
      ..addTo(this);

    _boardElement = new BoardElement(this)
      ..x = boardOffset.x + _edgeOffset * _boardScale
      ..y = boardOffset.y + _edgeOffset * _boardScale;

    manager.bestTimeMilliseconds.then((v) {
      if (v == null) v = 0;
      _scoreElement = new ScoreElement(v)..addTo(this);

      stage.juggler.add(_scoreElement);
    });

    num logoScale = min(max(_boardScale, 1.1), 1.5);
    Bitmap logo = new Bitmap(sta.getBitmapData('logo_win'));
    _logoButton = new SimpleButton(logo, logo, logo, logo);
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

  bool get canRevealTarget =>
      _targetX != null && game.canReveal(_targetX, _targetY);

  bool get canFlagTarget =>
      _targetX != null && game.canToggleFlag(_targetX, _targetY);

  void revealTarget() {
    if (_targetX != null) {
      game.reveal(_targetX, _targetY);
    }
  }

  void click(int x, int y, bool alt) {
    assert(!game.gameEnded);
    final ss = game.getSquareState(x, y);

    List<Point<int>> reveals;

    if (alt) {
      if (ss == SquareState.hidden || ss == SquareState.flagged) {
        _toggleFlag(x, y);
      } else if (ss == SquareState.revealed) {
        if (game.canReveal(x, y)) {
          // get adjacent ballons
          final adjHidden = game.field
              .getAdjacentIndices(x, y)
              .map((i) => game.field.getCoordinate(i))
              .where((t) => game.getSquareState(t.x, t.y) == SquareState.hidden)
              .toList();

          assert(adjHidden.length > 0);

          _startDartAnimation(adjHidden);
          reveals = game.reveal(x, y);
        }
      }
    } else {
      if (ss == SquareState.hidden) {
        _startDartAnimation([new Point(x, y)]);
        reveals = game.reveal(x, y);
      }
    }

    if (reveals != null && reveals.length > 0) {
      assert(game.state != GameState.lost);
      if (!alt) {
        // if it was a normal click, the first item should be the clicked item
        var first = reveals[0];
        assert(first.x == x);
        assert(first.y == y);
      }
      _startPopAnimation(new Point(x, y), reveals);
    } else if (game.state == GameState.lost) {
      _startPopAnimation(new Point(x, y));
    }
  }

  bool _toggleFlag(int x, int y) {
    assert(!game.gameEnded);
    final se = _boardElement.squares.get(x, y);
    final ss = se.squareState;
    if (ss == SquareState.hidden) {
      game.setFlag(x, y, true);
      se.updateState();
      game_audio.flag();
      return true;
    } else if (ss == SquareState.flagged) {
      game.setFlag(x, y, false);
      se.updateState();
      game_audio.unflag();
      return true;
    }
    return false;
  }

  void _startPopAnimation(Point<int> start, [Iterable<Point<int>> reveals]) {
    if (reveals == null) {
      assert(game.state == GameState.lost);

      reveals = new Iterable.generate(game.field.length, (i) {
        var c = game.field.getCoordinate(i);
        return new Tuple(c, game.getSquareState(c.x, c.y));
      })
          .where((t2) =>
              t2.item2 == SquareState.bomb || t2.item2 == SquareState.hidden)
          .map((t2) => t2.item1)
          .toList();
    }

    final values = reveals.map((c) {
      var initialOffset =
          new Vector(SquareElement.size * c.x, SquareElement.size * c.y);
      var squareOffset = _popExplodeAnimationOffset + initialOffset;

      var delay = _popAnimationHitFrame + ((c - start).magnitude * 4).toInt();
      delay += _rnd.nextInt(10);

      return new _Values(c, squareOffset, delay);
    }).toList();

    values.sort((a, b) {
      return a.delay.compareTo(b.delay);
    });

    for (var v in values) {
      var c = v.point;
      var squareOffset = v.squareOffset;

      var se = _boardElement.squares.get(c.x, c.y);
      var ss = se.squareState;

      var texturePrefix =
          ss == SquareState.bomb ? 'balloon_explode' : 'balloon_pop';

      var anim = new FlipBook(
          _animations.getBitmapDatas(texturePrefix), _frameRate, false)
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
    assert(points.length >= 1);
    game_audio.throwDart();
    for (var point in points) {
      var squareOffset = _dartAnimationOffset +
          new Vector(
              SquareElement.size * point.x, SquareElement.size * point.y);

      var dart =
          new FlipBook(_animations.getBitmapDatas('dart'), _frameRate, false)
            ..x = squareOffset.x
            ..y = squareOffset.y
            ..mouseEnabled = false
            ..play()
            ..addTo(_dartLayer);

      dart.onComplete.listen((e) => dart.removeFromParent());

      var shadow =
          new FlipBook(_animations.getBitmapDatas('shadow'), _frameRate, false)
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

final StreamController _titleClickedEventHandle = new StreamController();

Stream get titleClickedEvent => _titleClickedEventHandle.stream;

class _Values {
  final Point<int> point;
  final Vector squareOffset;
  final int delay;

  _Values(this.point, this.squareOffset, this.delay);
}
