#library('ppw_test');

#import('dart:math');
#import('package:unittest/unittest.dart');
#import('package:bot/bot.dart');

#import('package:poppopwin/ppw.dart');

#source('test_field.dart');
#source('test_game.dart');

runppwTests() {
  group('ppw', (){
    TestField.run();
    TestGame.run();
  });
}
