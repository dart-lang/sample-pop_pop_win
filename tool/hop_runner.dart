import 'dart:async';
import 'dart:io';
import 'package:hop/hop.dart';
import 'package:hop/hop_tasks.dart';
import '../test/console_test_harness.dart' as test_console;

void main() {

  addTask('test', createUnitTestTask(test_console.testCore));

  //
  // Analyzer
  //
  addTask('analyze_libs', createDartAnalyzerTask(_getLibs));

  //
  // Dart2js
  //
  addTask('dart2js', createDart2JsTask(['web/game_web.dart'],
      minify: true, liveTypeAnalysis: true, rejectDeprecatedFeatures: true));

  //
  // Dart2js - App
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

  runHop();
}


Future<List<String>> _getLibs() {
  return new Directory('lib').list()
      .where((FileSystemEntity fse) => fse is File)
      .map((File file) => file.path)
      .toList();
}
