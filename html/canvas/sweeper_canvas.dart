#import('dart:html');
#import('dart:json');

#import('../../lib/sweeper.dart');
#import('../../lib/canvas.dart');

final String _artFramesJson = '{"background_bottom.png":{"frame":"{{0,96},{2048,96}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{2048,96}}","sourceSize":"{2048,96}"},"background_left.png":{"frame":"{{352,192},{352,1344}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{352,1344}}","sourceSize":"{352,1344}"},"background_right.png":{"frame":"{{0,192},{352,1344}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{352,1344}}","sourceSize":"{352,1344}"},"background_top.png":{"frame":"{{0,0},{2048,96}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{2048,96}}","sourceSize":"{2048,96}"},"balloon.png":{"frame":"{{1949,908},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"dart_animation_0000.png":{"frame":"{{1985,192},{39,63}}","offset":"{516.5,-327.5}","rotated":true,"sourceColorRect":"{{1521,1064},{39,63}}","sourceSize":"{2048,1536}"},"dart_animation_0001.png":{"frame":"{{704,192},{621,219}}","offset":"{230.5,-259.5}","rotated":false,"sourceColorRect":"{{944,918},{621,219}}","sourceSize":"{2048,1536}"},"dart_animation_0002.png":{"frame":"{{1352,192},{633,336}}","offset":"{229.5,-217}","rotated":false,"sourceColorRect":"{{937,817},{633,336}}","sourceSize":"{2048,1536}"},"dart_animation_0003.png":{"frame":"{{638,1536},{638,340}}","offset":"{192,-151}","rotated":false,"sourceColorRect":"{{897,749},{638,340}}","sourceSize":"{2048,1536}"},"dart_animation_0004.png":{"frame":"{{704,411},{554,306}}","offset":"{152,-89}","rotated":false,"sourceColorRect":"{{899,704},{554,306}}","sourceSize":"{2048,1536}"},"dart_animation_0005.png":{"frame":"{{0,1536},{482,257}}","offset":"{123,-36.5}","rotated":true,"sourceColorRect":"{{906,676},{482,257}}","sourceSize":"{2048,1536}"},"dart_animation_0006.png":{"frame":"{{257,1536},{421,205}}","offset":"{100.5,2.5}","rotated":true,"sourceColorRect":"{{914,663},{421,205}}","sourceSize":"{2048,1536}"},"dart_animation_0007.png":{"frame":"{{462,1536},{369,176}}","offset":"{83.5,36}","rotated":true,"sourceColorRect":"{{923,644},{369,176}}","sourceSize":"{2048,1536}"},"dart_animation_0008.png":{"frame":"{{758,1876},{322,164}}","offset":"{70,64}","rotated":false,"sourceColorRect":"{{933,622},{322,164}}","sourceSize":"{2048,1536}"},"dart_animation_0009.png":{"frame":"{{1080,1876},{272,148}}","offset":"{63,82}","rotated":false,"sourceColorRect":"{{951,612},{272,148}}","sourceSize":"{2048,1536}"},"dart_animation_0010.png":{"frame":"{{1352,528},{245,133}}","offset":"{49.5,91.5}","rotated":false,"sourceColorRect":"{{951,610},{245,133}}","sourceSize":"{2048,1536}"},"dart_animation_0011.png":{"frame":"{{1597,528},{213,127}}","offset":"{42.5,87.5}","rotated":false,"sourceColorRect":"{{960,617},{213,127}}","sourceSize":"{2048,1536}"},"dart_animation_0012.png":{"frame":"{{1810,528},{182,133}}","offset":"{38,69.5}","rotated":false,"sourceColorRect":"{{971,632},{182,133}}","sourceSize":"{2048,1536}"},"dart_animation_0013.png":{"frame":"{{481,1905},{152,138}}","offset":"{36,46}","rotated":false,"sourceColorRect":"{{984,653},{152,138}}","sourceSize":"{2048,1536}"},"dart_animation_0014.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0015.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0016.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0017.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0018.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0019.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0020.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0021.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0022.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0023.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0024.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0025.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0026.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0027.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0028.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0029.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0030.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0031.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0032.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0033.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0034.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0035.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0036.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0037.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0038.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0039.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0040.png":{"frame":"{{1597,655},{125,138}}","offset":"{35.5,18}","rotated":true,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0041.png":{"frame":"{{633,1905},{125,138}}","offset":"{35.5,18}","rotated":false,"sourceColorRect":"{{997,681},{125,138}}","sourceSize":"{2048,1536}"},"dart_animation_0042.png":{"frame":"{{1870,661},{124,135}}","offset":"{35,19.5}","rotated":true,"sourceColorRect":"{{997,681},{124,135}}","sourceSize":"{2048,1536}"},"dart_animation_0043.png":{"frame":"{{1352,909},{124,135}}","offset":"{35,19.5}","rotated":true,"sourceColorRect":"{{997,681},{124,135}}","sourceSize":"{2048,1536}"},"dart_animation_0044.png":{"frame":"{{1567,780},{124,135}}","offset":"{35,19.5}","rotated":true,"sourceColorRect":"{{997,681},{124,135}}","sourceSize":"{2048,1536}"},"dart_animation_0045.png":{"frame":"{{1735,661},{124,135}}","offset":"{35,19.5}","rotated":true,"sourceColorRect":"{{997,681},{124,135}}","sourceSize":"{2048,1536}"},"dart_animation_0046.png":{"frame":"{{1352,785},{124,135}}","offset":"{35,19.5}","rotated":true,"sourceColorRect":"{{997,681},{124,135}}","sourceSize":"{2048,1536}"},"dart_animation_0047.png":{"frame":"{{1352,661},{124,135}}","offset":"{35,19.5}","rotated":true,"sourceColorRect":"{{997,681},{124,135}}","sourceSize":"{2048,1536}"},"dart_animation_0048.png":{"frame":"{{1837,785},{123,135}}","offset":"{35.5,19.5}","rotated":true,"sourceColorRect":"{{998,681},{123,135}}","sourceSize":"{2048,1536}"},"dart_animation_0049.png":{"frame":"{{1352,1033},{123,135}}","offset":"{35.5,19.5}","rotated":true,"sourceColorRect":"{{998,681},{123,135}}","sourceSize":"{2048,1536}"},"dart_animation_0050.png":{"frame":"{{1567,904},{123,135}}","offset":"{35.5,19.5}","rotated":true,"sourceColorRect":"{{998,681},{123,135}}","sourceSize":"{2048,1536}"},"dart_animation_0051.png":{"frame":"{{1702,785},{123,135}}","offset":"{35.5,19.5}","rotated":true,"sourceColorRect":"{{998,681},{123,135}}","sourceSize":"{2048,1536}"},"dart_animation_0052.png":{"frame":"{{1702,908},{122,135}}","offset":"{36,19.5}","rotated":true,"sourceColorRect":"{{999,681},{122,135}}","sourceSize":"{2048,1536}"},"dart_animation_0053.png":{"frame":"{{1567,1027},{121,135}}","offset":"{36.5,19.5}","rotated":true,"sourceColorRect":"{{1000,681},{121,135}}","sourceSize":"{2048,1536}"},"dart_animation_0054.png":{"frame":"{{1352,1156},{120,135}}","offset":"{37,19.5}","rotated":true,"sourceColorRect":"{{1001,681},{120,135}}","sourceSize":"{2048,1536}"},"game_board_center.png":{"frame":"{{1487,1141},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"game_board_corner_bottom_left.png":{"frame":"{{1814,1132},{112,112}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{112,112}}","sourceSize":"{112,112}"},"game_board_corner_bottom_right.png":{"frame":"{{1702,1030},{112,112}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{112,112}}","sourceSize":"{112,112}"},"game_board_corner_top_left.png":{"frame":"{{1837,1020},{112,112}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{112,112}}","sourceSize":"{112,112}"},"game_board_corner_top_right.png":{"frame":"{{1837,908},{112,112}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{112,112}}","sourceSize":"{112,112}"},"game_board_side_bottom.png":{"frame":"{{1258,523},{80,112}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,112}}","sourceSize":"{80,112}"},"game_board_side_left.png":{"frame":"{{369,1957},{112,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{112,80}}","sourceSize":"{112,80}"},"game_board_side_right.png":{"frame":"{{257,1957},{112,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{112,80}}","sourceSize":"{112,80}"},"game_board_side_top.png":{"frame":"{{1258,411},{80,112}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,112}}","sourceSize":"{80,112}"},"number_eight.png":{"frame":"{{1487,1061},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"number_five.png":{"frame":"{{1487,981},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"number_four.png":{"frame":"{{1487,901},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"number_one.png":{"frame":"{{1487,821},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"number_seven.png":{"frame":"{{1487,741},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"number_six.png":{"frame":"{{1487,661},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"number_three.png":{"frame":"{{1258,715},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"},"number_two.png":{"frame":"{{1258,635},{80,80}}","offset":"{0,0}","rotated":false,"sourceColorRect":"{{0,0},{80,80}}","sourceSize":"{80,80}"}}';

ImageLoader _imageLoader;

main() {
  _imageLoader = new ImageLoader(['art.png']);
  _imageLoader.finished.add((args) => _doLoad());
  _imageLoader.load();
}

_doLoad() {
  final textures = _getTexturesFromJson(_artFramesJson);

  final targetMode = false;
  final int w = 16, h = 16;
  final int m = (w * h * 0.15625).toInt();

  final CanvasElement sweeperTable = query('#sweeperCanvas');
  final Element minesLeftDiv = query('#minesLeft');
  final Element gameStateDiv = query('#gameState');
  final Element clockDiv = query('#clock');

  assert(_imageLoader != null);
  assert(_imageLoader.images.containsKey('art.png'));

  final textureImg = _imageLoader.images['art.png'];

  final gameRoot = new GameRoot(w, h, m,
      sweeperTable, minesLeftDiv, gameStateDiv, clockDiv, targetMode,
      textures, textureImg);

  // disable touch events
  window.on.touchMove.add(_onTouchMove);

  final ButtonElement newGameButton = query('#newGame');
  newGameButton.on.click.add((args) => gameRoot.newGame());

  final ButtonElement flagButton = query('#flag');
  flagButton.on.click.add((args) => gameRoot.toggleTargetFlag());

  final ButtonElement revealButton = query('#reveal');
  revealButton.on.click.add((args) => gameRoot.revealTarget());

  final updateButtons = (args) {
    revealButton.disabled = !gameRoot.canRevealTarget;
    flagButton.disabled = !gameRoot.canFlagTarget;
  };

  gameRoot.targetChanged.add(updateButtons);

  updateButtons(null);
}

void _onTouchMove(TouchEvent args) {
  args.preventDefault();
}

Map<String, TextureInput> _getTexturesFromJson(String json) {
  var roundTrip = JSON.parse(json);

  final frames = <String, TextureInput>{};

  roundTrip.forEach((String key, Map<String, Dynamic> value) {
    final parsed = new TextureInput.fromHash(key, value);
    frames[key] = parsed;
  });

  return frames;
}
