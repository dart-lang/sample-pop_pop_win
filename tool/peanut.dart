// See https://pub.dev/packages/peanut
import 'dart:io';

Future<void> main(List<String> args) async {
  final outputDir = args.first;

  for (var depFile in Directory(
    outputDir,
  ).listSync().whereType<File>().where((f) => f.path.endsWith('.deps'))) {
    print('Deleting `${depFile.path}`');
    depFile.deleteSync();
  }
}
