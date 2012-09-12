class AudioLoader extends ResourceLoader<AudioBuffer> {
  final AudioContext context;

  AudioLoader(this.context, List<String> urlList) :
    super(urlList);

  void _doLoad(String url) {
    // Load buffer asynchronously
    final HttpRequest request = new HttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.on.load.add((args) {
      // Asynchronously decode the audio file data in request.response
      context.decodeAudioData(
        request.response,
        (buffer) => _saveBuffer(url, buffer),
        (error) => print(['error!',error])
      );
    });

    request.on.error.add((args) {
      print('BufferLoader: XHR error');
    });

    request.send();
  }

  void _saveBuffer(String url, AudioBuffer buffer) {
    if (buffer == null) {
      print('error decoding file data: $url');
      return;
    }
    _resources[url] = buffer;
    if (_resources.length == _urlList.length) {
      _onLoaded();
    }
  }
}
