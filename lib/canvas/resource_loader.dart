String _getBlobUrl(Blob blob) {
  return window.createObjectUrl(blob);
}

void revokeBlobUrl(String blobUrl) {
  window.revokeObjectUrl(blobUrl);
}

// TODO: error events?
class ResourceLoader<T> {
  static const String StateUnloaded = 'unloaded';
  static const String StateLoading = 'loading';
  static const String StateLoaded = 'loaded';
  static const String StateError = 'error';

  final ReadOnlyCollection<String> _urlList;
  final EventHandle<EventArgs> _loadedEvent= new EventHandle<EventArgs>();
  final EventHandle<EventArgs> _progressEvent = new EventHandle<EventArgs>();
  final Map<String, T> _resources;
  final Map<String, String> _blobUrlMap = new Map<String, String>();

  String _state = StateUnloaded;

  ResourceLoader(Iterable<String> urlList) :
    _urlList = $(urlList).toReadOnlyCollection(),
    // DARTBUG: http://code.google.com/p/dart/issues/detail?id=5350
    _resources = new Map<String, T>();

  int get completedCount => _resources.length;

  String get state => _state;

  EventRoot get loaded => _loadedEvent;

  EventRoot get progress => _progressEvent;

  T getResource(String url) => _resources[url];

  void load() {
    assert(_state == StateUnloaded);
    _state = StateLoading;
    for(final url in _urlList) {
      _httpLoad(url);
    }
  }

  // protected
  abstract void _doLoad(String blobUrl);

  // protected
  void _saveResourceFailed(String blobUrl) {
    // TODO: report error some how?
    _revokeBlobUrl(blobUrl);
  }

  // protected
  void _saveResourceSucceed(String blobUrl, T resource) {
    assert(_state == StateLoading);
    assert(resource != null);

    final url = _blobUrlMap[blobUrl];
    _revokeBlobUrl(blobUrl);

    assert(url != null);
    assert(!_resources.containsKey(url));

    _resources[url] = resource;

    if(_resources.length == _urlList.length) {
      _state = StateLoaded;
      _loadedEvent.fireEvent(EventArgs.empty);
    } else {
      _progressEvent.fireEvent(EventArgs.empty);
    }
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
      assert(!_blobUrlMap.containsValue(url));
      final blobUrl = _getBlobUrl(request.response);
      _blobUrlMap[blobUrl] = url;
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

  void _revokeBlobUrl(String blobUrl) {
    assert(_blobUrlMap.containsKey(blobUrl));
    revokeBlobUrl(blobUrl);
    _blobUrlMap.remove(blobUrl);
  }
}
