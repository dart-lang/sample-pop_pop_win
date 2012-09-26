class AudioLoader extends ResourceLoader<AudioBuffer> {
  final AudioContext context;

  AudioLoader(this.context, Iterable<String> urlList) :
    super(urlList);

  void _doLoad(String blobUrl) {
    // Load buffer asynchronously
    final HttpRequest arrayBufferRequest = new HttpRequest();
    arrayBufferRequest.open("GET", blobUrl, true);
    arrayBufferRequest.responseType = "arraybuffer";

    arrayBufferRequest.on.load.add((args) {
      // Asynchronously decode the audio file data in request.response
      context.decodeAudioData(
        arrayBufferRequest.response,
        (buffer) => _saveBuffer(blobUrl, buffer),
        (error) => _onAudioLoadError(blobUrl, 'decode error', error));
    });

    arrayBufferRequest.on.error.add((args) {
      _onAudioLoadError(blobUrl, 'BufferLoader: XHR error', args);
    });

    arrayBufferRequest.send();
  }

  void _onAudioLoadError(String blobUrl, String description, error) {
    print(['Erro!', description, error]);
    _saveResourceFailed(blobUrl);
  }

  void _saveBuffer(String blobUrl, AudioBuffer buffer) {
    if (buffer == null) {
      _onAudioLoadError(blobUrl, 'null buffer', '');
    }
    _saveResourceSucceed(blobUrl, buffer);
  }
}
