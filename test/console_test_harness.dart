library test_console;

import 'package:unittest/unittest.dart';
import 'package:unittest/vm_config.dart';
import 'ppw/_ppw_runner.dart';

main() {
  final config = new VMConfiguration();
  testCore(config);
}

void testCore(Configuration config) {
    configure(config);
  groupSep = ' - ';

  runppwTests();
}
