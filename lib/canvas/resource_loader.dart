class _ResourceEntry<T> {
  final String url;
  T _resource;
  String _blobUrl;

  _ResourceEntry(this.url);

  void setResource(T resource) {
    assert(resource != null);
    assert(_resource == null);
    _resource = resource;
  }

  bool get completed => _resource != null;

  T get resource => _resource;

  bool matchesBlobUrl(String blobUrl) {
    assert(blobUrl != null);
    return blobUrl == _blobUrl;
  }

  String getBlobUrl(Blob blob) {
    assert(blob != null);
    assert(_blobUrl == null);
    _blobUrl = window.createObjectUrl(blob);
    return _blobUrl;
  }

  void revokeBlobUrl() {
    assert(_blobUrl != null);
    window.revokeObjectUrl(_blobUrl);
  }
}

// TODO: error events?
class ResourceLoader<T> {
  static const String StateUnloaded = 'unloaded';
  static const String StateLoading = 'loading';
  static const String StateLoaded = 'loaded';
  static const String StateError = 'error';

  final ReadOnlyCollection<_ResourceEntry<T>> _entries;
  final EventHandle<EventArgs> _loadedEvent= new EventHandle<EventArgs>();
  final EventHandle<EventArgs> _progressEvent = new EventHandle<EventArgs>();

  String _state = StateUnloaded;

  ResourceLoader(Iterable<String> urlList) :
    _entries = $(urlList)
    .map((url) => new _ResourceEntry(url))
    .toReadOnlyCollection();

  int get completedCount => _entries.count((e) => e.completed);

  String get state => _state;

  EventRoot get loaded => _loadedEvent;

  EventRoot get progress => _progressEvent;

  T getResource(String url) => _getByUrl(url).resource;

  void load() {
    assert(_state == StateUnloaded);
    _state = StateLoading;
    for(final e in _entries) {
      _httpLoad(e.url);
    }
  }

  // protected
  abstract void _doLoad(String blobUrl);

  // protected
  void _saveResourceFailed(String blobUrl) {
    // TODO: report error some how?
    final e = _getByBlobUrl(blobUrl);
    e.revokeBlobUrl();
  }

  // protected
  void _saveResourceSucceed(String blobUrl, T resource) {
    assert(_state == StateLoading);
    assert(resource != null);

    final entry = _getByBlobUrl(blobUrl);
    entry.revokeBlobUrl();

    entry.setResource(resource);

    if(_entries.every((e) => e.completed)) {
      _state = StateLoaded;
      _loadedEvent.fireEvent(EventArgs.empty);
    } else {
      _progressEvent.fireEvent(EventArgs.empty);
    }
  }

  _ResourceEntry<T> _getByUrl(String url) {
    assert(url != null);
    return _entries.single((e) => e.url == url);
  }

  _ResourceEntry<T> _getByBlobUrl(String blobUrl) {
    assert(blobUrl != null);
    return _entries.single((e) => e.matchesBlobUrl(blobUrl));
  }

  void _httpLoad(String url) {
    final request = new HttpRequest();

    request.responseType = 'blob';

    request.on.abort.add((args) => _onHttpEvent(url, args));
    request.on.error.add((args) => _onHttpEvent(url, args));

    // use loadEnd instead
    //request.on.load.add(_onHttpEvent);
    request.on.loadEnd.add((args) => _onLoadEnd(url, args));

    // loadStart is not that interesting
    //request.on.loadStart.add(_onHttpEvent);
    request.on.progress.add((args) => _onHttpEvent(url, args));

    // doesn't seem to add anything over other methods
    // request.on.readyStateChange.add(_onHttpEvent);
    request.open('GET', url);
    request.send();
  }

  void _onLoadEnd(String url, HttpRequestProgressEvent args) {
    final HttpRequest request = args.currentTarget;
    assert(request.readyState == HttpRequest.DONE);
    if(request.status == 200) {
      final e = _getByUrl(url);
      final blobUrl = e.getBlobUrl(request.response);
      _doLoad(blobUrl);
    } else {
      _onError(url, args);
    }
  }

  void _onHttpEvent(String url, HttpRequestProgressEvent args) {
    final HttpRequest request = args.currentTarget;
    assert(url != null);

    if(args.type == 'progress') {
      _onProgress(url, args);
      // let's do progress!
    } else {
      _onError(url, args);
    }
  }

  void _onError(String url, HttpRequestProgressEvent args) {
    // some error thingy here...
    throw 'wtf?';
  }

  void _onProgress(String url, HttpRequestProgressEvent args) {
    assert(args.type == 'progress');
    assert(args.lengthComputable);

    // DARTBUG: sanity checks for http://code.google.com/p/dart/issues/detail?id=5373
    assert(args.totalSize == args.total);
    assert(args.position == args.loaded);

    _updateProgress(url, args.loaded, args.totalSize);
  }

  void _updateProgress(String url, int loaded, int total) {
    print(['progress', url, loaded, total]);
  }
}
