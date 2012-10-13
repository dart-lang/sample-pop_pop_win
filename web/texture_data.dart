Map<String, TextureInput> _getTextures(ImageElement transparentElement,
    ImageElement opaqueElement, ImageElement transparentStaticElement) {

  final frames = <String, TextureInput>{};

  _getTransparentItems().forEach((String key, Map<String, Dynamic> value) {
    final parsed = new TextureInput.fromHash(key, value, transparentElement);
    frames[key] = parsed;
  });

  _getOpaqueItems().forEach((String key, Map<String, Dynamic> value) {
    final parsed = new TextureInput.fromHash(key, value, opaqueElement);
    frames[key] = parsed;
  });

  _getTransparentStaticItems().forEach((String key, Map<String, Dynamic> value) {
    final parsed = new TextureInput.fromHash(key, value, transparentStaticElement);
    frames[key] = parsed;
  });

  return frames;
}

Map _getTransparentStaticItems() {
  return {

"button_new_game.png":
{
  "frame": {"x":398,"y":150,"w":294,"h":94},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":294,"h":94},
  "sourceSize": {"w":294,"h":94}
},
"button_new_game_clicked.png":
{
  "frame": {"x":504,"y":0,"w":292,"h":94},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":292,"h":94},
  "sourceSize": {"w":292,"h":94}
},
"logo_win.png":
{
  "frame": {"x":0,"y":88,"w":318,"h":96},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":318,"h":96},
  "sourceSize": {"w":318,"h":96}
}};
}

Map _getOpaqueItems() {
  return {

"background_side_left.png":
{
  "frame": {"x":0,"y":96,"w":352,"h":672},
  "rotated": true,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":352,"h":672},
  "sourceSize": {"w":352,"h":672}
},
"background_top_left.png":
{
  "frame": {"x":0,"y":0,"w":1024,"h":96},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":1024,"h":96},
  "sourceSize": {"w":1024,"h":96}
},
"balloon.png":
{
  "frame": {"x":1184,"y":352,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_pieces_a.png":
{
  "frame": {"x":1184,"y":272,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_pieces_b.png":
{
  "frame": {"x":1184,"y":192,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_pieces_c.png":
{
  "frame": {"x":1104,"y":352,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_pieces_d.png":
{
  "frame": {"x":1024,"y":304,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_tagged_!.png":
{
  "frame": {"x":832,"y":368,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_tagged_bomb.png":
{
  "frame": {"x":944,"y":304,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_tagged_frozen.png":
{
  "frame": {"x":1104,"y":272,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"crater_b.png":
{
  "frame": {"x":1136,"y":112,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"game_board_center.png":
{
  "frame": {"x":1104,"y":192,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"game_board_corner_bottom_left.png":
{
  "frame": {"x":784,"y":96,"w":112,"h":112},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":112,"h":112},
  "sourceSize": {"w":112,"h":112}
},
"game_board_corner_bottom_right.png":
{
  "frame": {"x":672,"y":96,"w":112,"h":112},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":112,"h":112},
  "sourceSize": {"w":112,"h":112}
},
"game_board_corner_top_left.png":
{
  "frame": {"x":1136,"y":0,"w":112,"h":112},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":112,"h":112},
  "sourceSize": {"w":112,"h":112}
},
"game_board_corner_top_right.png":
{
  "frame": {"x":1024,"y":0,"w":112,"h":112},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":112,"h":112},
  "sourceSize": {"w":112,"h":112}
},
"game_board_side_bottom.png":
{
  "frame": {"x":976,"y":112,"w":80,"h":112},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":112},
  "sourceSize": {"w":80,"h":112}
},
"game_board_side_left.png":
{
  "frame": {"x":784,"y":208,"w":112,"h":80},
  "rotated": true,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":112,"h":80},
  "sourceSize": {"w":112,"h":80}
},
"game_board_side_right.png":
{
  "frame": {"x":672,"y":208,"w":112,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":112,"h":80},
  "sourceSize": {"w":112,"h":80}
},
"game_board_side_top.png":
{
  "frame": {"x":896,"y":96,"w":80,"h":112},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":112},
  "sourceSize": {"w":80,"h":112}
},
"number_eight.png":
{
  "frame": {"x":1056,"y":112,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_five.png":
{
  "frame": {"x":1024,"y":224,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_four.png":
{
  "frame": {"x":672,"y":368,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_one.png":
{
  "frame": {"x":752,"y":320,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_seven.png":
{
  "frame": {"x":864,"y":288,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_six.png":
{
  "frame": {"x":944,"y":224,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_three.png":
{
  "frame": {"x":864,"y":208,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_two.png":
{
  "frame": {"x":672,"y":288,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
}};
}
Map _getTransparentItems() {
  return {

"balloon_explode_0000.png":
{
  "frame": {"x":1840,"y":1306,"w":80,"h":84},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":89,"y":89,"w":80,"h":84},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0001.png":
{
  "frame": {"x":736,"y":650,"w":188,"h":188},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":43,"y":25,"w":188,"h":188},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0002.png":
{
  "frame": {"x":512,"y":1088,"w":216,"h":222},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":23,"y":19,"w":216,"h":222},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0003.png":
{
  "frame": {"x":284,"y":868,"w":226,"h":216},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":17,"y":17,"w":226,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0004.png":
{
  "frame": {"x":284,"y":650,"w":226,"h":216},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":17,"y":17,"w":226,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0005.png":
{
  "frame": {"x":512,"y":650,"w":222,"h":218},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":16,"y":15,"w":222,"h":218},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0006.png":
{
  "frame": {"x":512,"y":870,"w":222,"h":216},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":16,"y":16,"w":222,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0007.png":
{
  "frame": {"x":1650,"y":462,"w":224,"h":216},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":15,"y":16,"w":224,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0008.png":
{
  "frame": {"x":1424,"y":462,"w":224,"h":216},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":15,"y":15,"w":224,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0009.png":
{
  "frame": {"x":1442,"y":234,"w":226,"h":216},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":13,"y":15,"w":226,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0010.png":
{
  "frame": {"x":1214,"y":234,"w":226,"h":224},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":14,"y":14,"w":226,"h":224},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0011.png":
{
  "frame": {"x":1660,"y":232,"w":228,"h":222},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":15,"w":228,"h":222},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0012.png":
{
  "frame": {"x":984,"y":234,"w":228,"h":224},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":13,"w":228,"h":224},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0013.png":
{
  "frame": {"x":754,"y":234,"w":228,"h":226},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":13,"w":228,"h":226},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0014.png":
{
  "frame": {"x":522,"y":234,"w":230,"h":228},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":12,"w":230,"h":228},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0015.png":
{
  "frame": {"x":1416,"y":2,"w":230,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":12,"w":230,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0016.png":
{
  "frame": {"x":1184,"y":2,"w":230,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":12,"w":230,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0017.png":
{
  "frame": {"x":718,"y":2,"w":232,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":13,"w":232,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0018.png":
{
  "frame": {"x":952,"y":2,"w":230,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":13,"w":230,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0019.png":
{
  "frame": {"x":484,"y":2,"w":232,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":13,"w":232,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0020.png":
{
  "frame": {"x":288,"y":234,"w":232,"h":226},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":13,"w":232,"h":226},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0021.png":
{
  "frame": {"x":250,"y":2,"w":232,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":12,"w":232,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0022.png":
{
  "frame": {"x":1648,"y":2,"w":230,"h":228},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":13,"y":13,"w":230,"h":228},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0023.png":
{
  "frame": {"x":1232,"y":460,"w":190,"h":214},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":23,"y":17,"w":190,"h":214},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0000.png":
{
  "frame": {"x":1120,"y":982,"w":142,"h":114},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":60,"y":66,"w":142,"h":114},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0001.png":
{
  "frame": {"x":522,"y":464,"w":230,"h":184},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":16,"y":31,"w":230,"h":184},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0002.png":
{
  "frame": {"x":288,"y":462,"w":232,"h":186},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":15,"y":30,"w":232,"h":186},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0003.png":
{
  "frame": {"x":2,"y":1056,"w":236,"h":186},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":30,"w":236,"h":186},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0004.png":
{
  "frame": {"x":2,"y":818,"w":236,"h":186},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":31,"w":236,"h":186},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0005.png":
{
  "frame": {"x":2,"y":580,"w":236,"h":186},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":31,"w":236,"h":186},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0006.png":
{
  "frame": {"x":754,"y":462,"w":238,"h":184},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":10,"y":33,"w":238,"h":184},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0007.png":
{
  "frame": {"x":994,"y":460,"w":236,"h":182},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":35,"w":236,"h":182},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0008.png":
{
  "frame": {"x":994,"y":644,"w":236,"h":180},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":36,"w":236,"h":180},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0009.png":
{
  "frame": {"x":1424,"y":680,"w":236,"h":178},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":37,"w":236,"h":178},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0010.png":
{
  "frame": {"x":102,"y":1294,"w":84,"h":106},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":83,"y":79,"w":84,"h":106},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0011.png":
{
  "frame": {"x":1872,"y":1028,"w":88,"h":112},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":81,"y":76,"w":88,"h":112},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0012.png":
{
  "frame": {"x":478,"y":1306,"w":94,"h":118},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":78,"y":73,"w":94,"h":118},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0013.png":
{
  "frame": {"x":1406,"y":976,"w":100,"h":124},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":74,"y":70,"w":100,"h":124},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0014.png":
{
  "frame": {"x":1300,"y":980,"w":104,"h":130},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":72,"y":67,"w":104,"h":130},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0015.png":
{
  "frame": {"x":1874,"y":852,"w":110,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":68,"y":64,"w":110,"h":136},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0016.png":
{
  "frame": {"x":1390,"y":860,"w":114,"h":140},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":66,"y":62,"w":114,"h":140},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0017.png":
{
  "frame": {"x":998,"y":982,"w":120,"h":144},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":62,"y":60,"w":120,"h":144},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0018.png":
{
  "frame": {"x":872,"y":1006,"w":124,"h":148},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":60,"y":58,"w":124,"h":148},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0019.png":
{
  "frame": {"x":1260,"y":826,"w":128,"h":152},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":57,"y":56,"w":128,"h":152},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0020.png":
{
  "frame": {"x":1128,"y":826,"w":130,"h":154},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":56,"y":55,"w":130,"h":154},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0021.png":
{
  "frame": {"x":736,"y":1000,"w":134,"h":158},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":53,"y":53,"w":134,"h":158},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0022.png":
{
  "frame": {"x":1884,"y":326,"w":136,"h":160},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":52,"y":51,"w":136,"h":160},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0023.png":
{
  "frame": {"x":1884,"y":186,"w":138,"h":162},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":51,"y":50,"w":138,"h":162},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0024.png":
{
  "frame": {"x":336,"y":1224,"w":140,"h":160},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":49,"y":51,"w":140,"h":160},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0025.png":
{
  "frame": {"x":1874,"y":690,"w":140,"h":160},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":49,"y":51,"w":140,"h":160},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0026.png":
{
  "frame": {"x":736,"y":840,"w":142,"h":158},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":47,"y":52,"w":142,"h":158},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0027.png":
{
  "frame": {"x":736,"y":1160,"w":136,"h":148},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":49,"y":56,"w":136,"h":148},
  "sourceSize": {"w":256,"h":256}
},
"dart_fly_0000.png":
{
  "frame": {"x":880,"y":840,"w":108,"h":164},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":869,"y":485,"w":108,"h":164},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0001.png":
{
  "frame": {"x":2,"y":290,"w":186,"h":288},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":794,"y":385,"w":186,"h":288},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0002.png":
{
  "frame": {"x":2,"y":2,"w":246,"h":286},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":736,"y":317,"w":246,"h":286},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0003.png":
{
  "frame": {"x":1662,"y":680,"w":210,"h":220},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":690,"y":271,"w":210,"h":220},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0004.png":
{
  "frame": {"x":1880,"y":2,"w":182,"h":166},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":653,"y":243,"w":182,"h":166},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0005.png":
{
  "frame": {"x":874,"y":1156,"w":160,"h":120},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":622,"y":231,"w":160,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0006.png":
{
  "frame": {"x":1654,"y":902,"w":142,"h":98},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":597,"y":211,"w":142,"h":98},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0007.png":
{
  "frame": {"x":1406,"y":1078,"w":126,"h":92},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":576,"y":189,"w":126,"h":92},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0008.png":
{
  "frame": {"x":996,"y":1192,"w":112,"h":86},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":558,"y":179,"w":112,"h":86},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0009.png":
{
  "frame": {"x":598,"y":1306,"w":98,"h":94},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":545,"y":177,"w":98,"h":94},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0010.png":
{
  "frame": {"x":1136,"y":1126,"w":86,"h":110},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":534,"y":185,"w":86,"h":110},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0011.png":
{
  "frame": {"x":1534,"y":1132,"w":76,"h":124},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":524,"y":199,"w":76,"h":124},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0012.png":
{
  "frame": {"x":926,"y":648,"w":66,"h":134},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":517,"y":221,"w":66,"h":134},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0013.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0014.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0015.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0016.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0017.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0018.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0019.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0020.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0021.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0022.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0023.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0024.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0025.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0026.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0027.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0028.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0029.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0030.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0031.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0032.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0033.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0034.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0035.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0036.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0037.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0038.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0039.png":
{
  "frame": {"x":1496,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0040.png":
{
  "frame": {"x":1358,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0041.png":
{
  "frame": {"x":1220,"y":1338,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0042.png":
{
  "frame": {"x":1514,"y":1274,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0043.png":
{
  "frame": {"x":1514,"y":1210,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0044.png":
{
  "frame": {"x":1376,"y":1236,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0045.png":
{
  "frame": {"x":1376,"y":1172,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0046.png":
{
  "frame": {"x":1312,"y":1112,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0047.png":
{
  "frame": {"x":1248,"y":1120,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0048.png":
{
  "frame": {"x":1110,"y":1214,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0049.png":
{
  "frame": {"x":998,"y":1128,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0050.png":
{
  "frame": {"x":1654,"y":1066,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0051.png":
{
  "frame": {"x":1654,"y":1002,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0052.png":
{
  "frame": {"x":1236,"y":982,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0053.png":
{
  "frame": {"x":1874,"y":964,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0054.png":
{
  "frame": {"x":284,"y":610,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0000.png":
{
  "frame": {"x":1880,"y":186,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0001.png":
{
  "frame": {"x":188,"y":1306,"w":94,"h":146},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":393,"y":451,"w":94,"h":146},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0002.png":
{
  "frame": {"x":284,"y":1086,"w":136,"h":226},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":375,"y":382,"w":136,"h":226},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0003.png":
{
  "frame": {"x":1876,"y":464,"w":164,"h":224},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":355,"y":330,"w":164,"h":224},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0004.png":
{
  "frame": {"x":1232,"y":676,"w":148,"h":190},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":362,"y":296,"w":148,"h":190},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0005.png":
{
  "frame": {"x":990,"y":826,"w":136,"h":154},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":369,"y":273,"w":136,"h":154},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0006.png":
{
  "frame": {"x":1532,"y":860,"w":120,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":378,"y":261,"w":120,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0007.png":
{
  "frame": {"x":2,"y":1294,"w":106,"h":98},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":388,"y":249,"w":106,"h":98},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0008.png":
{
  "frame": {"x":698,"y":1310,"w":74,"h":90},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":410,"y":232,"w":74,"h":90},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0009.png":
{
  "frame": {"x":868,"y":1318,"w":92,"h":82},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":404,"y":224,"w":92,"h":82},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0010.png":
{
  "frame": {"x":774,"y":1310,"w":92,"h":88},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":410,"y":223,"w":92,"h":88},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0011.png":
{
  "frame": {"x":1782,"y":1140,"w":86,"h":102},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":420,"y":231,"w":86,"h":102},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0012.png":
{
  "frame": {"x":1792,"y":1024,"w":78,"h":114},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":433,"y":244,"w":78,"h":114},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0013.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0014.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0015.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0016.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0017.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0018.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0019.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0020.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0021.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0022.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0023.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0024.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0025.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0026.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0027.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0028.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0029.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0030.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0031.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0032.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0033.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0034.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0035.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0036.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0037.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0038.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0039.png":
{
  "frame": {"x":996,"y":1280,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0040.png":
{
  "frame": {"x":1660,"y":1130,"w":74,"h":120},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0041.png":
{
  "frame": {"x":1532,"y":980,"w":74,"h":120},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0042.png":
{
  "frame": {"x":1798,"y":902,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0043.png":
{
  "frame": {"x":1534,"y":1056,"w":74,"h":118},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":266,"w":74,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0044.png":
{
  "frame": {"x":1886,"y":1118,"w":72,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":445,"y":266,"w":72,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0045.png":
{
  "frame": {"x":1146,"y":1278,"w":72,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":445,"y":266,"w":72,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0046.png":
{
  "frame": {"x":1072,"y":1280,"w":72,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":445,"y":266,"w":72,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0047.png":
{
  "frame": {"x":1960,"y":1128,"w":72,"h":116},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":445,"y":268,"w":72,"h":116},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0048.png":
{
  "frame": {"x":1724,"y":1228,"w":70,"h":116},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":447,"y":268,"w":70,"h":116},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0049.png":
{
  "frame": {"x":1652,"y":1210,"w":70,"h":116},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":446,"y":268,"w":70,"h":116},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0050.png":
{
  "frame": {"x":1724,"y":1300,"w":68,"h":114},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":448,"y":270,"w":68,"h":114},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0051.png":
{
  "frame": {"x":1842,"y":1238,"w":66,"h":110},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":449,"y":274,"w":66,"h":110},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0052.png":
{
  "frame": {"x":190,"y":1200,"w":66,"h":104},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":449,"y":280,"w":66,"h":104},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0053.png":
{
  "frame": {"x":1986,"y":1028,"w":60,"h":98},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":454,"y":286,"w":60,"h":98},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0054.png":
{
  "frame": {"x":250,"y":234,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":1024,"h":768}
}};
}
