#!/bin/bash
PACK_DIR=`pwd`/packages/
dart2js='pkg/compiler/implementation/dart2js.dart'
core_cmd="dart
--heap_growth_rate=32
$DART_SDK/$dart2js
--package-root=$PACK_DIR
--throw-on-error
-v"

function build {
  echo "Building $1"
  cmd="$core_cmd --out=$1.js $1"
  echo $cmd
  eval $cmd
  echo
}

build './html/sweeper_canvas.dart'
build './html/dom/sweeper_dom.dart'
