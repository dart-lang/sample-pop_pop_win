// TODO: error events?
class ResourceLoader<T> {
  static const String StateUnloaded = 'unloaded';
  static const String StateLoading = 'loading';
  static const String StateLoaded = 'loaded';
  static const String StateError = 'error';

  final List<String> _urlList;
  final EventHandle<EventArgs> _loadedEvent;
  final Map<String, T> _resources;
  final Set<String> _completed;

  String _state = StateUnloaded;

  ResourceLoader(this._urlList) :
    _loadedEvent= new EventHandle<EventArgs>(),
    _resources = new Map<String, T>(),
    _completed = new Set<String>();

  String get state => _state;

  EventRoot get loaded => _loadedEvent;

  T getResource(String url) => _resources[url];

  void load() {
    assert(_state == StateUnloaded);
    _state = StateLoading;
    for(final url in _urlList) {
      _doLoad(url);
    }
  }

  abstract void _doLoad(String url);

  void _onLoaded(String uri) {
    assert(_state == StateLoading);
    assert(_resources.containsKey(uri));
    assert(!_completed.contains(uri));

    _completed.add(uri);

    if(_completed.length == _urlList.length) {
      _loadedEvent.fireEvent(EventArgs.empty);
    }
  }

  void _onError() {
    assert(_state == StateLoading);
    _state = StateError;
  }
}
