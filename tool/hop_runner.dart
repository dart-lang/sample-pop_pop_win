import 'dart:io';
import 'package:bot/bot.dart';
import 'package:bot/hop.dart';
import 'package:bot/hop_tasks.dart';
import '../test/console_test_harness.dart' as test_console;

void main() {
  _assertKnownPath();

  addTask('test', createUnitTestTask(test_console.testCore));

  //
  // Dart2js
  //

  // DARTBUG: https://code.google.com/p/dart/issues/detail?id=6763
  // disabling minify for now until dart bug is fixed
  addTask('dart2js', createDart2JsTask(['web/game.dart'],  minify: false));

  //
  // gh_pages
  //
  addAsyncTask('pages', (ctx) =>
      branchForDir(ctx, 'compress', 'web', 'gh-pages'));

  runHopCore();
}

void _assertKnownPath() {
  // since there is no way to determine the path of 'this' file
  // assume that Directory.current() is the root of the project.
  // So check for existance of /bin/hop_runner.dart
  final thisFile = new File('tool/hop_runner.dart');
  assert(thisFile.existsSync());
}
