class GameAudio {
  static const String WIN = 'win', CLICK = 'click', POP = 'Pop', FLAG = 'flag',
      UNFLAG = 'unflag', BOMB = 'Bomb', THROW_DART = 'throw';

  static final EventHandle<String> _audioEventHandle = new EventHandle<String>();

  static EventRoot<String> get audioEvent => _audioEventHandle;

  static void win() => _audioEventHandle.fireEvent(WIN);

  static void click() => _audioEventHandle.fireEvent(CLICK);

  static void pop() => _audioEventHandle.fireEvent(POP);

  static void flag() => _audioEventHandle.fireEvent(FLAG);

  static void unflag() => _audioEventHandle.fireEvent(UNFLAG);

  static void bomb() => _audioEventHandle.fireEvent(BOMB);

  static void throwDart() => _audioEventHandle.fireEvent(THROW_DART);
}
