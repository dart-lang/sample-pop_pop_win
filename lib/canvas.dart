#library('ppw-canvas');

#import('dart:html');
#import('dart:math');

#import('package:bot/bot.dart');
#import('package:bot/html.dart');
#import('package:bot/retained.dart');
#import('package:bot/texture.dart');

#import('poppopwin.dart');
#import('html.dart');
#import('analytics.dart');

#source('src/canvas/board_element.dart');
#source('src/canvas/game_background_element.dart');
#source('src/canvas/game_element.dart');
#source('src/canvas/game_root.dart');
#source('src/canvas/new_game_element.dart');
#source('src/canvas/score_element.dart');
#source('src/canvas/square_element.dart');
#source('src/canvas/title_element.dart');
#source('src/canvas/game_audio.dart');

EventHandle _titleClickedEventHandle = new EventHandle<EventArgs>();

EventRoot titleClickedEvent = _titleClickedEventHandle;

