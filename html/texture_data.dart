Map<String, TextureInput> _getTextures(ImageElement transparentElement,
    ImageElement opaqueElement) {

  final frames = <String, TextureInput>{};

  _getTransparentItems().forEach((String key, Map<String, Dynamic> value) {
    final parsed = new TextureInput.fromHash(key, value, transparentElement);
    frames[key] = parsed;
  });

  _getOpaqueItems().forEach((String key, Map<String, Dynamic> value) {
    final parsed = new TextureInput.fromHash(key, value, opaqueElement);
    frames[key] = parsed;
  });

  return frames;
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
  "frame": {"x":1104,"y":352,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_pieces_b.png":
{
  "frame": {"x":1024,"y":352,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_pieces_c.png":
{
  "frame": {"x":1216,"y":192,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_pieces_d.png":
{
  "frame": {"x":1216,"y":112,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_tagged_!.png":
{
  "frame": {"x":1184,"y":272,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_tagged_bomb.png":
{
  "frame": {"x":1136,"y":192,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_tagged_frozen.png":
{
  "frame": {"x":1136,"y":112,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_tagged_question_mark.png":
{
  "frame": {"x":1104,"y":272,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"balloon_tagged_x.png":
{
  "frame": {"x":832,"y":368,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"crater_b.png":
{
  "frame": {"x":944,"y":304,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"game_board_center.png":
{
  "frame": {"x":1024,"y":272,"w":80,"h":80},
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
  "frame": {"x":672,"y":368,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_five.png":
{
  "frame": {"x":752,"y":320,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_four.png":
{
  "frame": {"x":864,"y":288,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_one.png":
{
  "frame": {"x":944,"y":224,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_seven.png":
{
  "frame": {"x":1056,"y":192,"w":80,"h":80},
  "rotated": false,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":80,"h":80},
  "sourceSize": {"w":80,"h":80}
},
"number_six.png":
{
  "frame": {"x":1056,"y":112,"w":80,"h":80},
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
  "frame": {"x":1659,"y":455,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0001.png":
{
  "frame": {"x":900,"y":458,"w":80,"h":84},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":89,"y":89,"w":80,"h":84},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0002.png":
{
  "frame": {"x":740,"y":904,"w":188,"h":188},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":43,"y":25,"w":188,"h":188},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0003.png":
{
  "frame": {"x":1438,"y":234,"w":216,"h":222},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":23,"y":19,"w":216,"h":222},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0004.png":
{
  "frame": {"x":1662,"y":452,"w":226,"h":216},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":17,"y":17,"w":226,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0005.png":
{
  "frame": {"x":1210,"y":234,"w":226,"h":216},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":17,"y":17,"w":226,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0006.png":
{
  "frame": {"x":1656,"y":232,"w":222,"h":218},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":16,"y":15,"w":222,"h":218},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0007.png":
{
  "frame": {"x":190,"y":1172,"w":222,"h":216},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":16,"y":16,"w":222,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0008.png":
{
  "frame": {"x":1436,"y":458,"w":224,"h":216},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":15,"y":16,"w":224,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0009.png":
{
  "frame": {"x":518,"y":692,"w":224,"h":216},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":15,"y":15,"w":224,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0010.png":
{
  "frame": {"x":982,"y":234,"w":226,"h":216},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":13,"y":15,"w":226,"h":216},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0011.png":
{
  "frame": {"x":520,"y":462,"w":226,"h":224},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":14,"y":14,"w":226,"h":224},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0012.png":
{
  "frame": {"x":752,"y":234,"w":228,"h":222},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":15,"w":228,"h":222},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0013.png":
{
  "frame": {"x":288,"y":692,"w":228,"h":224},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":13,"w":228,"h":224},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0014.png":
{
  "frame": {"x":522,"y":234,"w":228,"h":226},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":13,"w":228,"h":226},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0015.png":
{
  "frame": {"x":288,"y":462,"w":230,"h":228},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":12,"w":230,"h":228},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0016.png":
{
  "frame": {"x":1416,"y":2,"w":230,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":12,"w":230,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0017.png":
{
  "frame": {"x":1184,"y":2,"w":230,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":12,"w":230,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0018.png":
{
  "frame": {"x":718,"y":2,"w":232,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":13,"w":232,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0019.png":
{
  "frame": {"x":952,"y":2,"w":230,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":13,"w":230,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0020.png":
{
  "frame": {"x":484,"y":2,"w":232,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":13,"w":232,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0021.png":
{
  "frame": {"x":288,"y":234,"w":232,"h":226},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":13,"w":232,"h":226},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0022.png":
{
  "frame": {"x":250,"y":2,"w":232,"h":230},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":12,"w":232,"h":230},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0023.png":
{
  "frame": {"x":1648,"y":2,"w":230,"h":228},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":13,"y":13,"w":230,"h":228},
  "sourceSize": {"w":256,"h":256}
},
"balloon_explode_0024.png":
{
  "frame": {"x":736,"y":688,"w":190,"h":214},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":23,"y":17,"w":190,"h":214},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0000.png":
{
  "frame": {"x":1659,"y":452,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0001.png":
{
  "frame": {"x":1072,"y":962,"w":142,"h":114},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":60,"y":66,"w":142,"h":114},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0002.png":
{
  "frame": {"x":982,"y":452,"w":230,"h":184},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":16,"y":31,"w":230,"h":184},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0003.png":
{
  "frame": {"x":590,"y":1156,"w":232,"h":186},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":15,"y":30,"w":232,"h":186},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0004.png":
{
  "frame": {"x":2,"y":1056,"w":236,"h":186},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":30,"w":236,"h":186},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0005.png":
{
  "frame": {"x":2,"y":818,"w":236,"h":186},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":31,"w":236,"h":186},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0006.png":
{
  "frame": {"x":2,"y":580,"w":236,"h":186},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":12,"y":31,"w":236,"h":186},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0007.png":
{
  "frame": {"x":190,"y":932,"w":238,"h":184},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":10,"y":33,"w":238,"h":184},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0008.png":
{
  "frame": {"x":376,"y":918,"w":236,"h":182},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":35,"w":236,"h":182},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0009.png":
{
  "frame": {"x":408,"y":1156,"w":236,"h":180},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":36,"w":236,"h":180},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0010.png":
{
  "frame": {"x":560,"y":918,"w":236,"h":178},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":11,"y":37,"w":236,"h":178},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0011.png":
{
  "frame": {"x":1660,"y":1070,"w":84,"h":106},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":83,"y":79,"w":84,"h":106},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0012.png":
{
  "frame": {"x":1312,"y":1152,"w":88,"h":112},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":81,"y":76,"w":88,"h":112},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0013.png":
{
  "frame": {"x":1188,"y":1248,"w":94,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":78,"y":73,"w":94,"h":118},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0014.png":
{
  "frame": {"x":2,"y":1294,"w":100,"h":124},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":74,"y":70,"w":100,"h":124},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0015.png":
{
  "frame": {"x":1180,"y":1142,"w":104,"h":130},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":72,"y":67,"w":104,"h":130},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0016.png":
{
  "frame": {"x":1818,"y":680,"w":110,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":68,"y":64,"w":110,"h":136},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0017.png":
{
  "frame": {"x":1372,"y":972,"w":114,"h":140},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":66,"y":62,"w":114,"h":140},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0018.png":
{
  "frame": {"x":1514,"y":976,"w":120,"h":144},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":62,"y":60,"w":120,"h":144},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0019.png":
{
  "frame": {"x":1536,"y":676,"w":124,"h":148},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":60,"y":58,"w":124,"h":148},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0020.png":
{
  "frame": {"x":928,"y":1126,"w":128,"h":152},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":57,"y":56,"w":128,"h":152},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0021.png":
{
  "frame": {"x":1216,"y":946,"w":130,"h":154},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":56,"y":55,"w":130,"h":154},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0022.png":
{
  "frame": {"x":1376,"y":676,"w":134,"h":158},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":53,"y":53,"w":134,"h":158},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0023.png":
{
  "frame": {"x":1072,"y":800,"w":136,"h":160},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":52,"y":51,"w":136,"h":160},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0024.png":
{
  "frame": {"x":1212,"y":664,"w":138,"h":162},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":51,"y":50,"w":138,"h":162},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0025.png":
{
  "frame": {"x":1210,"y":804,"w":140,"h":160},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":49,"y":51,"w":140,"h":160},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0026.png":
{
  "frame": {"x":930,"y":900,"w":140,"h":160},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":49,"y":51,"w":140,"h":160},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0027.png":
{
  "frame": {"x":1372,"y":812,"w":142,"h":158},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":47,"y":52,"w":142,"h":158},
  "sourceSize": {"w":256,"h":256}
},
"balloon_pop_0028.png":
{
  "frame": {"x":1516,"y":826,"w":136,"h":148},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":49,"y":56,"w":136,"h":148},
  "sourceSize": {"w":256,"h":256}
},
"crater_a.png":
{
  "frame": {"x":928,"y":638,"w":160,"h":160},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":48,"y":47,"w":160,"h":160},
  "sourceSize": {"w":256,"h":256}
},
"dart_fly_0000.png":
{
  "frame": {"x":1656,"y":455,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0001.png":
{
  "frame": {"x":778,"y":1286,"w":108,"h":164},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":869,"y":485,"w":108,"h":164},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0002.png":
{
  "frame": {"x":2,"y":290,"w":186,"h":288},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":794,"y":385,"w":186,"h":288},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0003.png":
{
  "frame": {"x":2,"y":2,"w":246,"h":286},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":736,"y":317,"w":246,"h":286},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0004.png":
{
  "frame": {"x":1214,"y":452,"w":210,"h":220},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":690,"y":271,"w":210,"h":220},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0005.png":
{
  "frame": {"x":1880,"y":2,"w":182,"h":166},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":653,"y":243,"w":182,"h":166},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0006.png":
{
  "frame": {"x":1090,"y":638,"w":160,"h":120},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":622,"y":231,"w":160,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0007.png":
{
  "frame": {"x":928,"y":800,"w":142,"h":98},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":597,"y":211,"w":142,"h":98},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0008.png":
{
  "frame": {"x":1094,"y":1262,"w":126,"h":92},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":576,"y":189,"w":126,"h":92},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0009.png":
{
  "frame": {"x":1654,"y":882,"w":112,"h":86},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":558,"y":179,"w":112,"h":86},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0010.png":
{
  "frame": {"x":748,"y":584,"w":98,"h":94},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":545,"y":177,"w":98,"h":94},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0011.png":
{
  "frame": {"x":1960,"y":862,"w":86,"h":110},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":534,"y":185,"w":86,"h":110},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0012.png":
{
  "frame": {"x":1284,"y":1248,"w":76,"h":124},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":524,"y":199,"w":76,"h":124},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0013.png":
{
  "frame": {"x":1362,"y":1242,"w":66,"h":134},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":517,"y":221,"w":66,"h":134},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0014.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0015.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0016.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0017.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0018.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0019.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0020.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0021.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0022.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0023.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0024.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0025.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0026.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0027.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0028.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0029.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0030.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0031.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0032.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0033.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0034.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0035.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0036.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0037.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0038.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0039.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0040.png":
{
  "frame": {"x":1430,"y":1226,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0041.png":
{
  "frame": {"x":1426,"y":1162,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0042.png":
{
  "frame": {"x":1906,"y":1142,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0043.png":
{
  "frame": {"x":1906,"y":1078,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0044.png":
{
  "frame": {"x":1768,"y":1096,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0045.png":
{
  "frame": {"x":1896,"y":894,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0046.png":
{
  "frame": {"x":1768,"y":1032,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0047.png":
{
  "frame": {"x":1832,"y":894,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0048.png":
{
  "frame": {"x":1768,"y":894,"w":62,"h":136},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0049.png":
{
  "frame": {"x":1662,"y":818,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0050.png":
{
  "frame": {"x":1482,"y":1098,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0051.png":
{
  "frame": {"x":1344,"y":1088,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0052.png":
{
  "frame": {"x":1206,"y":1078,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0053.png":
{
  "frame": {"x":1068,"y":1078,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0054.png":
{
  "frame": {"x":930,"y":1062,"w":62,"h":136},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":506,"y":248,"w":62,"h":136},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_0055.png":
{
  "frame": {"x":1656,"y":452,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0000.png":
{
  "frame": {"x":376,"y":1156,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0001.png":
{
  "frame": {"x":288,"y":918,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0002.png":
{
  "frame": {"x":1930,"y":640,"w":94,"h":146},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":393,"y":451,"w":94,"h":146},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0003.png":
{
  "frame": {"x":1880,"y":412,"w":136,"h":226},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":375,"y":382,"w":136,"h":226},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0004.png":
{
  "frame": {"x":1880,"y":186,"w":164,"h":224},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":355,"y":330,"w":164,"h":224},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0005.png":
{
  "frame": {"x":778,"y":1094,"w":148,"h":190},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":362,"y":296,"w":148,"h":190},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0006.png":
{
  "frame": {"x":1662,"y":680,"w":136,"h":154},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":369,"y":273,"w":136,"h":154},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0007.png":
{
  "frame": {"x":1058,"y":1142,"w":120,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":378,"y":261,"w":120,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0008.png":
{
  "frame": {"x":1660,"y":970,"w":106,"h":98},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":388,"y":249,"w":106,"h":98},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0009.png":
{
  "frame": {"x":1570,"y":1282,"w":74,"h":90},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":410,"y":232,"w":74,"h":90},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0010.png":
{
  "frame": {"x":844,"y":580,"w":92,"h":82},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":404,"y":224,"w":92,"h":82},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0011.png":
{
  "frame": {"x":1912,"y":1206,"w":92,"h":88},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":410,"y":223,"w":92,"h":88},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0012.png":
{
  "frame": {"x":1960,"y":974,"w":86,"h":102},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":420,"y":231,"w":86,"h":102},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0013.png":
{
  "frame": {"x":944,"y":1280,"w":78,"h":114},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":433,"y":244,"w":78,"h":114},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0014.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0015.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0016.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0017.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0018.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0019.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0020.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0021.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0022.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0023.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0024.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0025.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0026.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0027.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0028.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0029.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0030.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0031.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0032.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0033.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0034.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0035.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0036.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0037.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0038.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0039.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0040.png":
{
  "frame": {"x":824,"y":458,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0041.png":
{
  "frame": {"x":748,"y":462,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0042.png":
{
  "frame": {"x":1494,"y":1226,"w":74,"h":120},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0043.png":
{
  "frame": {"x":1800,"y":818,"w":74,"h":120},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":264,"w":74,"h":120},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0044.png":
{
  "frame": {"x":1570,"y":1162,"w":74,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":444,"y":266,"w":74,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0045.png":
{
  "frame": {"x":1720,"y":1160,"w":72,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":445,"y":266,"w":72,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0046.png":
{
  "frame": {"x":1646,"y":1276,"w":72,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":445,"y":266,"w":72,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0047.png":
{
  "frame": {"x":1646,"y":1156,"w":72,"h":118},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":445,"y":266,"w":72,"h":118},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0048.png":
{
  "frame": {"x":1930,"y":788,"w":72,"h":116},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":445,"y":268,"w":72,"h":116},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0049.png":
{
  "frame": {"x":1788,"y":1300,"w":70,"h":116},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":447,"y":268,"w":70,"h":116},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0050.png":
{
  "frame": {"x":1794,"y":1228,"w":70,"h":116},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":446,"y":268,"w":70,"h":116},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0051.png":
{
  "frame": {"x":1024,"y":1280,"w":68,"h":114},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":448,"y":270,"w":68,"h":114},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0052.png":
{
  "frame": {"x":1794,"y":1160,"w":66,"h":110},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":449,"y":274,"w":66,"h":110},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0053.png":
{
  "frame": {"x":1720,"y":1280,"w":66,"h":104},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":449,"y":280,"w":66,"h":104},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0054.png":
{
  "frame": {"x":128,"y":1294,"w":60,"h":98},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":454,"y":286,"w":60,"h":98},
  "sourceSize": {"w":1024,"h":768}
},
"dart_fly_shadow_0055.png":
{
  "frame": {"x":250,"y":234,"w":1,"h":1},
  "rotated": false,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":1,"h":1},
  "sourceSize": {"w":1024,"h":768}
},
"logo_boom.png":
{
  "frame": {"x":190,"y":290,"w":320,"h":96},
  "rotated": true,
  "trimmed": false,
  "spriteSourceSize": {"x":0,"y":0,"w":320,"h":96},
  "sourceSize": {"w":320,"h":96}
},
"logo_win.png":
{
  "frame": {"x":190,"y":612,"w":318,"h":96},
  "rotated": true,
  "trimmed": true,
  "spriteSourceSize": {"x":0,"y":0,"w":318,"h":96},
  "sourceSize": {"w":320,"h":96}
}};
}
