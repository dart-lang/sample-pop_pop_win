class _ResourceEntry<T> {
  final String url;
  T _resource;
  String _blobUrl;
  int _total = null, _completed = 0;

  _ResourceEntry(this.url);

  int get totalBytes => _total;

  int get completedBytes => _completed;

  void setResource(T resource) {
    assert(resource != null);
    assert(_resource == null);
    _resource = resource;
  }

  bool updateProgress(int completed, int total) {
    assert(completed != null);
    assert(total != null);
    assert(completed <= total);
    assert(_total == null || _total == total);

    var changed = false;
    if(_completed != completed) {
      _completed = completed;
      changed = true;
    }

    if(_total != total) {
      _total = total;
      changed = true;
    }
    return changed;
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

  static const int _defaultSize = 2000;

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

  int get completedBytes {
    return _entries.selectNumbers((e) => e.completedBytes).sum();
  }

  int get totalBytes {
    return _entries.selectNumbers((e) {
      if(e.totalBytes == null) {
        return _defaultSize;
      } else {
        return e.totalBytes;
      }
    }).sum();
  }

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

    final e = _getByUrl(url);

    request.on.abort.add((args) => _onError(e, args));
    request.on.error.add((args) => _onError(e, args));

    // use loadEnd instead
    //request.on.load.add(_onHttpEvent);
    request.on.loadEnd.add((args) => _onLoadEnd(e, args));

    // loadStart is not that interesting
    //request.on.loadStart.add(_onHttpEvent);
    request.on.progress.add((args) => _onProgress(e, args));

    // doesn't seem to add anything over other methods
    // request.on.readyStateChange.add(_onHttpEvent);
    request.open('GET', url);
    request.send();
  }

  void _onLoadEnd(_ResourceEntry<T> entry, HttpRequestProgressEvent args) {
    final HttpRequest request = args.currentTarget;
    assert(request.readyState == HttpRequest.DONE);
    if(request.status == 200) {
      final blobUrl = entry.getBlobUrl(request.response);
      _doLoad(blobUrl);
    } else {
      _onError(entry, args);
    }
  }

  void _onError(_ResourceEntry<T> entry, HttpRequestProgressEvent args) {
    // some error thingy here...
    throw 'wtf?';
  }

  void _onProgress(_ResourceEntry<T> entry, HttpRequestProgressEvent args) {
    assert(args.type == 'progress');
    assert(args.lengthComputable);

    // DARTBUG: sanity checks for http://code.google.com/p/dart/issues/detail?id=5373
    assert(args.totalSize == args.total);
    assert(args.position == args.loaded);

    if(entry.updateProgress(args.loaded, args.totalSize)) {
      _progressEvent.fireEvent(EventArgs.empty);
    }
  }
}
