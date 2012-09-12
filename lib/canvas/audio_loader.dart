class AudioLoader {
  final AudioContext _context;
  final List<String> _urlList;
  final _onLoad;
  final Map<String, AudioBuffer> _bufferList;

  AudioLoader(this._context, List<String> urlList, this._onLoad) :
    _urlList = urlList,
    _bufferList = new Map<String, AudioBuffer>();

  void load() {
    for(final url in _urlList) {
      _loadBuffer(url);
    }
  }

  void _loadBuffer(String url) {
    // Load buffer asynchronously
    final HttpRequest request = new HttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.on.load.add((args) {
      // Asynchronously decode the audio file data in request.response
      _context.decodeAudioData(
          request.response,
          (buffer) {
            if (buffer == null) {
              print('error decoding file data: $url');
              return;
            }
            _bufferList[url] = buffer;
            if (_bufferList.length == _urlList.length) {
              this._onLoad(_context, _bufferList);
            }
          },
          (error) {
            print(['error!',error]);
          }
      );
    });

    request.on.error.add((args) {
      print('BufferLoader: XHR error');
    });

    request.send();
  }
}
