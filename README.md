An implementation of
<a href="http://en.wikipedia.org/wiki/Minesweeper_(video_game)">Minesweeper</a>
in [Dart](https://dart.dev/).

<a href="https://studio.firebase.google.com/import?url=https%3A%2F%2Fgithub.com%2Fdart-lang%2Fsample-pop_pop_win%2F">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://cdn.firebasestudio.dev/btn/open_dark_32.svg">
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://cdn.firebasestudio.dev/btn/open_light_32.svg">
    <img
      height="32"
      alt="Open in Firebase Studio"
      src="https://cdn.firebasestudio.dev/btn/open_blue_32.svg">
  </picture>
</a>

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
 * To run locally with [dartdevc](https://dart.dev/tools/dartdevc):
 
   ```console
   dart run build_runner serve
   ```

 * To build with [dart2js](https://dart.dev/tools/dart2js) and minified output:
 
   ```console
   dart run build_runner build --release --output web:build
   ```
