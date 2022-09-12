An implementation of
<a href="http://en.wikipedia.org/wiki/Minesweeper_(video_game)">Minesweeper</a>
in [Dart](https://dart.dev/).

## Game Instructions
 Pop Pop Win is a minesweeper-based game with balloons and darts.
 Launching the game and clicking on the 'Pop Pop Win' logo will give instructions on how to play the game as well as allow you to choose your difficulty. 

 Below is an overview of the possible actions:
 * Click on a balloon to reveal the number of bombs adjacent to the balloon (or a bomb itself). If the balloon is not adjacent to any bombs, adjacent balloons will continue to pop until balloons adjacent to bombs are popped. 
 * Shift-click on a balloon to freeze the balloon, marking it so that it cannot be clicked and asserting there is a bomb underneath it. Shift clicking an already frozen balloon unfreezes it.
 * Click on 'New game' to reset the grid with the exact same game settings.
 * Clcik on the 'Pop Pop Win' logo to get additional help, instructions, and set the difficulty. 

## Win Conditions
  If all balloons other than those with bombs under them are popped, the game is won. The game can then be restarted by clicking 'New Game' or changing the settings through the 'Pop Pop Win' icon at the top of the page. 

## Game Difficulties
* Easy: 7x7 Grid with 7 bombs
* Medium: 11x11 Grid with 18 bombs
* Hard: 16x16 Grid with 40 bombs
* Extreme: 24x24 Grid with 90 bombs

## Assets
 * Art - Pete Parisi, [fuzzycube software](http://fuzzycubesoftware.com/)
 * Sound Effects - Alistair Hirst,
   [OMNI Audio](https://www.linkedin.com/in/alistairhirst/)
 * Winning Sax Riff - Brian Moore

## Running and building

 * Ensure [flutter](https://docs.flutter.dev/get-started/install) or dart sdk is downloaded.
 * Clone the repository.
 * Run `pub get`.
 * To run locally with [dartdevc](https://dart.dev/tools/dartdevc):
 
   ```console
   $ pub run build_runner serve
   ```
  If prompted, you may need to add the flag "--delete-conflicting-outputs" to allow the localhost to host the application

 * Open the localhost promted in your web browser

 * To build with [dart2js](https://dart.dev/tools/dart2js) and minified output:
 
   ```console
   $ pub run build_runner build --release --output web:build
   ```

  ## Changing Code for Expanded Gameplay
   Changing aspects of the code may add for a more customize-able experience. Changing the number of bombs or size of the board can make the game easier or more challenging beyond the levels specified in the existing game. 
  * Change Stage Options: StartGame method in lib/pop_pop_win.dart
  * Change keyboard controls: OnKeyDown and OnPopupClick in lib/pop_pop_win.dart
  * Change bomb count: variable bombCount in lib/src/game/field.dart
  * CHange row and column count: variables rows and cols in lib/src/game/field.dart

  ## Future Changes and Suggestions
  * In the future, a 'Custom' mode may be added to allow the user to specify the dimensions of the field as well as how many bombs there are. This would allow these changes to be made in game rather than through the code itself.

  * Feel free to add future suggestions or possibly test and commit these additions. 
