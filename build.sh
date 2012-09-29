#!/bin/bash
PACK_DIR=`pwd`/packages/
core_cmd="dart2js
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
