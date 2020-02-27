// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:html' as html;

import 'package:stagexl/stagexl.dart' hide KeyboardEvent;

import 'src/platform_web.dart';
import 'src/resources.dart';
import 'src/stage.dart';

const String _assetDir = 'packages/pop_pop_win/assets';

Future<void> startGame() async {
  final stage = Stage(
    html.querySelector('#gameCanvas') as html.CanvasElement,
    options: StageOptions()
      ..backgroundColor = 0xb4ad7f
      ..transparent = true,
  );

  RenderLoop().addStage(stage);

  BitmapData.defaultLoadOptions.webp = true;

  //have to load the loading bar first...
  final resourceManager = ResourceManager()
    ..addTextureAtlas(
      'static',
      '$_assetDir/images/static.json',
      TextureAtlasFormat.JSON,
    );

  await resourceManager.load();
  await _initialLoad(resourceManager, stage);
}

Future<void> _initialLoad(ResourceManager resourceManager, Stage stage) async {
  final atlas = resourceManager.getTextureAtlas('static');

  final bar = Gauge(atlas.getBitmapData('loading_bar'), Gauge.DIRECTION_RIGHT)
    ..x = 51
    ..y = 8
    ..ratio = 0;

  final loadingText = Bitmap(atlas.getBitmapData('loading_text'))
    ..x = 141
    ..y = 10;

  final loadingSprite = Sprite()
    ..addChild(Bitmap(atlas.getBitmapData('loading_background')))
    ..addChild(bar)
    ..addChild(loadingText)
    ..x = stage.sourceWidth ~/ 2 - 1008 ~/ 2
    ..y = 400
    ..scaleX = 2
    ..scaleY = 2
    ..addTo(stage);

  resourceManager
    ..addTextureAtlas(
      'opaque',
      '$_assetDir/images/opaque.json',
      TextureAtlasFormat.JSON,
    )
    ..addTextureAtlas(
      'animated',
      '$_assetDir/images/animated.json',
      TextureAtlasFormat.JSON,
    )
    ..addSoundSprite('audio', '$_assetDir/audio/audio.json');

  resourceManager.onProgress.listen(
    (e) {
      bar.ratio = resourceManager.finishedResources.length /
          resourceManager.resources.length;
    },
  );

  await resourceManager.load();

  _secondaryLoad(resourceManager, stage, loadingSprite);
}

void _secondaryLoad(
  ResourceManager resourceManager,
  Stage stage,
  Sprite loadingSprite,
) {
  stage.juggler.addTween(loadingSprite, .5)
    ..animate.alpha.to(0)
    ..onComplete = () => stage.removeChild(loadingSprite);

  _updateAbout();

  targetPlatform.aboutChanged.listen((_) => _updateAbout());

  final size = targetPlatform.size;
  final m = (size * size * 0.15625).toInt();

  initializeResources(resourceManager);
  GameRoot(size, size, m, stage);

  // disable touch events
  html.window.onTouchMove.listen((args) => args.preventDefault());

  html.window.onKeyDown.listen(_onKeyDown);

  html.querySelector('#popup').onClick.listen(_onPopupClick);

  titleClickedEvent.listen((args) => targetPlatform.toggleAbout(true));
}

void _onPopupClick(html.MouseEvent args) {
  if (args.relatedTarget is! html.AnchorElement) {
    targetPlatform.toggleAbout(false);
  }
}

void _onKeyDown(html.KeyboardEvent args) {
  final keyEvent = html.KeyEvent.wrap(args);
  switch (keyEvent.keyCode) {
    case html.KeyCode.ESC: // esc
      targetPlatform.toggleAbout(false);
      break;
    case html.KeyCode.H: // h
      targetPlatform.toggleAbout();
      break;
  }
}

void _updateAbout() {
  final popDisplay = targetPlatform.showAbout ? 'inline-block' : 'none';
  html.querySelector('#popup').style.display = popDisplay;
}
