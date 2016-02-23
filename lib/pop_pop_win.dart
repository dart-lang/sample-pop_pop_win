// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.
library pop_pop_win;

import 'dart:async';
import 'dart:html' as html;

import 'package:stagexl/stagexl.dart' hide KeyboardEvent;

import 'platform_target.dart';
import 'src/audio.dart' as GameAudio;
import 'src/platform.dart';
import 'src/stage.dart';

const String _ASSET_DIR = 'packages/pop_pop_win/assets';

Future startGame(PlatformTarget platform) async {
  initPlatform(platform);

  var options = new StageOptions()
    ..backgroundColor = 0xb4ad7f
    ..transparent = true;

  var stage = new Stage(html.querySelector('#gameCanvas'), options: options);

  new RenderLoop()..addStage(stage);

  BitmapData.defaultLoadOptions.webp = true;

  //have to load the loading bar first...
  var resourceManager = new ResourceManager()
    ..addTextureAtlas(
        "static", '$_ASSET_DIR/images/static.json', TextureAtlasFormat.JSON);

  var resMan = await resourceManager.load();
  await _initialLoad(resMan, stage);
}

Future _initialLoad(ResourceManager resourceManager, Stage stage) async {
  var atlas = resourceManager.getTextureAtlas('static');

  var bar = new Gauge(atlas.getBitmapData('loading_bar'), Gauge.DIRECTION_RIGHT)
    ..x = 51
    ..y = 8
    ..ratio = 0;

  var loadingText = new Bitmap(atlas.getBitmapData('loading_text'))
    ..x = 141
    ..y = 10;

  var loadingSprite = new Sprite()
    ..addChild(new Bitmap(atlas.getBitmapData('loading_background')))
    ..addChild(bar)
    ..addChild(loadingText)
    ..x = stage.sourceWidth ~/ 2 - 1008 ~/ 2
    ..y = 400
    ..scaleX = 2
    ..scaleY = 2
    ..addTo(stage);

  resourceManager
    ..addTextureAtlas(
        'opaque', '$_ASSET_DIR/images/opaque.json', TextureAtlasFormat.JSON)
    ..addTextureAtlas('animated', '$_ASSET_DIR/images/animated.json',
        TextureAtlasFormat.JSON);

  resourceManager.addSoundSprite('audio', '$_ASSET_DIR/audio/audio.json');

  resourceManager.onProgress.listen((e) {
    bar.ratio = resourceManager.finishedResources.length /
        resourceManager.resources.length;
  });

  await resourceManager.load();

  _secondaryLoad(resourceManager, stage, loadingSprite);
}

void _secondaryLoad(
    ResourceManager resourceManager, Stage stage, Sprite loadingSprite) {
  stage.juggler.addTween(loadingSprite, .5)
    ..animate.alpha.to(0)
    ..onComplete = () => stage.removeChild(loadingSprite);

  _updateAbout();

  targetPlatform.aboutChanged.listen((_) => _updateAbout());

  var size = targetPlatform.size;
  var m = (size * size * 0.15625).toInt();

  GameAudio.initialize(resourceManager);
  new GameRoot(size, size, m, stage, resourceManager);

  // disable touch events
  html.window.onTouchMove.listen((args) => args.preventDefault());

  html.window.onKeyDown.listen(_onKeyDown);

  html.querySelector('#popup').onClick.listen(_onPopupClick);

  titleClickedEvent.listen((args) => targetPlatform.toggleAbout(true));
}

void _onPopupClick(html.MouseEvent args) {
  if (args.toElement is! html.AnchorElement) {
    targetPlatform.toggleAbout(false);
  }
}

void _onKeyDown(html.KeyboardEvent args) {
  var keyEvent = new html.KeyEvent.wrap(args);
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
  var popDisplay = targetPlatform.showAbout ? 'inline-block' : 'none';
  html.querySelector('#popup').style.display = popDisplay;
}
