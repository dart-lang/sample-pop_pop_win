#import('package:unittest/unittest.dart');
#import('package:unittest/vm_config.dart');

#import('sweeper/_sweeper_runner.dart');

main() {
  useVmConfiguration();
  groupSep = ' - ';

  runSweeperTests();
}
