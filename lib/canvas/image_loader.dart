class ImageLoader {
  final List<String> _urls;
  final Map<String, ImageElement> images;
  final Set<String> _loaded;
  final EventHandle<EventArgs> _finishedEvent;

  ImageLoader(this._urls) :
    images = <String, ImageElement>{},
    _loaded = new Set<String>(),
    _finishedEvent = new EventHandle<EventArgs>();

  void load() {
    assert(images.length == 0);
    for(final url in _urls) {
      assert(url != null);
      assert(!images.containsKey(url));
      final img = new ImageElement(url);
      images[url] = img;
      if(img.complete) {
        _loadHandler(url, img);
      } else {
        img.on.load.add((args) {
          final ImageElement img = args.currentTarget;
          assert(images.containsValue(img));
          assert(args.type == 'load');
          _loadHandler(url, img);
        });
      }
    }
  }

  EventRoot get finished => _finishedEvent;

  void _loadHandler(String originalUrl, ImageElement img) {
    assert(!_loaded.contains(originalUrl));
    _loaded.add(originalUrl);

    if(_loaded.length == images.length) {
      _finishedEvent.fireEvent(EventArgs.empty);
    }
  }
}
