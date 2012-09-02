#!/usr/bin/env dart --enable_type_checks --enable_asserts

#import('lib/texture.dart');

const String _path = @"./html/canvas/art.plist";

main(){
  final textures = getTextures(_path);
  print(textures);
}
