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
  addTask('dart2js', createDart2JsTask(['web/game_web.dart'],
      minify: true, liveTypeAnalysis: true, rejectDeprecatedFeatures: true));

  //
  //
  //
  addTask('app_dart2js', createDart2JsTask(['app_package/game_app.dart'],
      minify: true,
      allowUnsafeEval: false,
      liveTypeAnalysis: true,
      rejectDeprecatedFeatures: true,
      packageRoot: 'packages/'
  ));

  //
  // gh_pages
  //
  addAsyncTask('pages', (ctx) =>
      branchForDir(ctx, 'master', 'web', 'gh-pages'));

  runHopCore();
}

void _assertKnownPath() {
  // since there is no way to determine the path of 'this' file
  // assume that Directory.current() is the root of the project.
  // So check for existance of /bin/hop_runner.dart
  final thisFile = new File('tool/hop_runner.dart');
  assert(thisFile.existsSync());
}
