library ppw_test;

import 'dart:math';
import 'package:unittest/unittest.dart';
import 'package:bot/bot.dart';

import 'package:poppopwin/poppopwin.dart';

part 'test_field.dart';
part 'test_game.dart';

runppwTests() {
  group('ppw', (){
    TestField.run();
    TestGame.run();
  });
}
