#library('sweeper_test');

#import('../../../dartlib/vendor/unittest/unittest.dart');
#import('../../lib/sweeper.dart');

#source('field_test.dart');
#source('game_test.dart');

runSweeperTests() {
  group('sweeper', (){
    FieldTest.run();
    GameTest.run();
  });
}
