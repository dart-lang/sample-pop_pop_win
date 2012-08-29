#!/bin/bash
PACK_DIR=`pwd`/packages/
echo $DART_SDK
dart2js='lib/dart2js/lib/compiler/implementation/dart2js.dart'
core_cmd="dart
--heap_growth_rate=32
--package-root=$PACK_DIR
$DART_SDK/$dart2js
--minify
-v"

function build {
  echo "Building $1"
  cmd="$core_cmd --out=$1.js $1"
  echo $cmd
  eval $cmd
  echo
}

build './html/sweeper_dom.dart'
build './html/canvas/sweeper_canvas.dart'
