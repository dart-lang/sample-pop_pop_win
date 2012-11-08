import 'package:unittest/unittest.dart';
import 'package:unittest/vm_config.dart';
import 'ppw/_ppw_runner.dart';

main() {
  useVmConfiguration();
  groupSep = ' - ';

  runppwTests();
}
