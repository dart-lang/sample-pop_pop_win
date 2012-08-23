# Dartsweeper

An implementation of <a href="http://en.wikipedia.org/wiki/Minesweeper_(video_game)">Minesweeper</a> in [Dart](http://www.dartlang.org).

## Getting the code

Dartsweeper uses my [Dartlib](https://github.com/kevmoo/dartlib) library. I haven't quite migrated Dartlib to pub. If you want to play with the code, make sure you download (or git clone) both the code for Dartsweeper and Dartlib and put them in adjacent directories.

 * source_code
    * sweeper.dart
      * lib
      * html
      * readme.md (for sweeper)
      * ...
    * dartlib
      * bin
      * docs
      * readme.md (for dartlib)
      * ...

If you're using Dart Editor, which I recommend, open both directories to see all of the code.

## Play

 * [sweeper.j832.com](http://sweeper.j832.com)
 * This is a version compiled to Javascript and should work in any modern browser.
 * This version does not work in Dartium (The custom Chromium version for Dart). The associated code files are not deployed.

## Interaction

 * Click on hidden squares to reveal them.
 * Shift-click on squares to flag them.
 * Shift-click on revealed numbers to go fast--but be careful. If you've flagged incorrectly, you'll hit a mine.

## Authors
 * [Kevin Moore](https://github.com/kevmoo) ([@kevmoo](http://twitter.com/kevmoo))
 * _You? File bugs. Fix bugs. Add features._

## License

    Copyright (c) 2012, Dartsweeper authors

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.