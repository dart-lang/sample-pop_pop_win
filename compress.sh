#!/bin/bash
set -v
closure-compiler --js web/game.dart.js --js_output_file web/game.small.js
mv web/game.small.js web/game.dart.js
rm web/game.dart.js.map 
