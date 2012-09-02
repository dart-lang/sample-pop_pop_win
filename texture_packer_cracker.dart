#!/usr/bin/env dart --enable_type_checks --enable_asserts

#import('package:dart-xml/xml.dart');
#import('dart:io');
#import('dart:math');
#import('../dartlib/lib/dartlib.dart');

const String _path =
@"./html/canvas/art.plist";

main(){

  final path = new Path(_path);
  final file = new File.fromPath(path);
  final docString = file.readAsTextSync();

  final doc = XML.parse(docString);

  var rootDict = $(doc.children).first();
  final hashMap = _parseDict(rootDict);

  final frames = new List<TextureInput>();

  Map<String, Dynamic> frameMaps = hashMap['frames'];
  frameMaps.forEach((String key, Map<String, Dynamic> value) {
    final parsed = new TextureInput.fromHash(key, value);
    frames.add(parsed);
  });

  print(frames);
}

class TextureInput {
  static const _pairExp = const RegExp(@"{([^,{]+),([^}]+)}");

  final String name;
  final Rect frame;
  final Vector offset;
  final bool rotated;
  final Rect sourceColorRect;
  final Size sourceSize;

  TextureInput(this.name, this.frame, this.offset, this.rotated,
      this.sourceColorRect, this.sourceSize);

  factory TextureInput.fromHash(String keyName, Map<String, Dynamic> map) {
    final frame = _parseRect(map['frame']);
    final offset = _parseCoordinate(map['offset']).toVector();
    final sourceColorRect = _parseRect(map['sourceColorRect']);
    final sourceSize = _parseCoordinate(map['sourceSize']).toSize();

    return new TextureInput(keyName, frame, offset, map['rotated'],
        sourceColorRect, sourceSize);
  }

  String toString() => this.name;

  static Rect _parseRect(String input) {
    final matches = $(_pairExp.allMatches(input)).toList();
    assert(matches.length == 2);

    var coord = _parseCoordinate(matches[0][0]);
    var size = _parseCoordinate(matches[1][0]).toSize();

    return new Rect.fromCoordSize(coord, size);
  }

  static Coordinate _parseCoordinate(String input) {
    final match = $(_pairExp.allMatches(input)).single();
    assert(match.groupCount() == 2);

    final x = parseDouble(match[1]);
    final y = parseDouble(match[2]);

    return new Coordinate(x, y);
  }
}

HashMap<String, Dynamic> _parseMap(Map input) {
  assert(input != null);
}

HashMap<String, Dynamic> _parseDict(XmlElement element) {
  assert(element != null);
  assert(element.name == "dict");

  final children = $(element.children).toList();
  assert(children.length %2 == 0);

  final map = <String,Dynamic>{};
  for(int i= 0; i < children.length; i+=2) {
    final keyElement = children[i];
    assert(keyElement.name == 'key');
    final key = keyElement.text;

    final valueElement = children[i+1];
    final value = _parseValue(valueElement);

    map[key] = value;
  }

  return map;
}

Dynamic _parseValue(XmlElement element) {
  assert(element != null);
  switch(element.name) {
    case 'string':
      return element.text;
    case 'dict' :
      return _parseDict(element);
    case 'false' :
      return false;
    case 'true':
      return true;
    case 'integer':
      return parseInt(element.text);
    default:
      throw "support for ${element.name} has not implemented";
  }
}
