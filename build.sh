#!/bin/bash
PACK_DIR=`pwd`/packages/
echo $DART_SDK
dart2js='lib/dart2js/lib/compiler/implementation/dart2js.dart'
cmd="dart
--enable_type_checks
--enable_asserts
--package-root=$PACK_DIR
$DART_SDK/$dart2js
--minify
--out=./html/sweeper_dom.dart.js
./html/sweeper_dom.dart"
echo $cmd
exec $cmd
