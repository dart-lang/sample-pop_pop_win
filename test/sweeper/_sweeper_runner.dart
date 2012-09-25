#library('sweeper_test');

#import('dart:math');
#import('package:unittest/unittest.dart');
#import('package:bot/bot.dart');

#import('../../lib/sweeper.dart');

#source('test_field.dart');
#source('test_game.dart');

runSweeperTests() {
  group('sweeper', (){
    TestField.run();
    TestGame.run();
  });
}
