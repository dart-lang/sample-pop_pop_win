#!/bin/bash
set -v
closure-compiler --js web/game_web.dart.js --js_output_file web/game.small.js
mv web/game.small.js web/game_web.dart.js
rm web/game_web.dart.js.*
