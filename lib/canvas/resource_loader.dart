// TODO: error events?
// TODO: done property
// TODO: error property
class ResourceLoader<T> {
  final List<String> _urlList;
  final EventHandle<EventArgs> _loadedEvent;
  final Map<String, T> _resources;

  ResourceLoader(this._urlList) :
    _loadedEvent = new EventHandle<EventArgs>(),
    _resources = new Map<String, T>() {
  }

  EventRoot get loaded => _loadedEvent;

  T getResource(String url) => _resources[url];

  // TODO: only can load once!
  void load() {
    for(final url in _urlList) {
      _doLoad(url);
    }
  }

  abstract void _doLoad(String url);
}
