// TODO: error events?
class ResourceLoader<T> {
  static const String StateUnloaded = 'unloaded';
  static const String StateLoading = 'loading';
  static const String StateLoaded = 'loaded';
  static const String StateError = 'error';

  final List<String> _urlList;
  final EventHandle<EventArgs> _loadedEventHandle;
  final Map<String, T> _resources;

  String _state = StateUnloaded;

  ResourceLoader(this._urlList) :
    _loadedEventHandle = new EventHandle<EventArgs>(),
    _resources = new Map<String, T>();

  String get state => _state;

  EventRoot get loaded => _loadedEventHandle;

  T getResource(String url) => _resources[url];

  void load() {
    assert(_state == StateUnloaded);
    _state = StateLoading;
    for(final url in _urlList) {
      _doLoad(url);
    }
  }

  abstract void _doLoad(String url);

  void _onLoaded() {
    assert(_state == StateLoading);
    _state = StateLoaded;
    _loadedEventHandle.fireEvent(EventArgs.empty);
  }

  void _onError() {
    assert(_state == StateLoading);
    _state = StateError;
  }
}
