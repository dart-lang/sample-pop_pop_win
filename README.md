An implementation of
<a href="http://en.wikipedia.org/wiki/Minesweeper_(video_game)">Minesweeper</a>
in [Dart](https://dart.dev/).

## Interaction

 * Click on hidden squares to reveal them.
 * Shift-click on squares to flag them.
 * Shift-click on revealed numbers to go fast--but be careful. If you've flagged
   incorrectly, you'll hit a bomb.

## Assets
 * Art - Pete Parisi, [fuzzycube software](http://fuzzycubesoftware.com/)
 * Sound Effects - Alistair Hirst,
   [OMNI Audio](https://www.linkedin.com/in/alistairhirst/)
 * Winning Sax Riff - Brian Moore

## Running and building

 * Clone the repository.
 * Run `pub get`.
 * To run locally with DDC:
 
   ```console
   $ pub run build_runner serve
   ```

 * To build with dart2js and minified output:
 
   ```console
   $ pub run build_runner build --release --output web:build
   ```
   
   Setting `--config release` tells `build_runner` to use the
   `build.release.yaml` configuration file.
