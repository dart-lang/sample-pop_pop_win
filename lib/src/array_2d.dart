import 'dart:collection';
import 'dart:math' as math;

class Array2d<T> extends ListBase<T> {
  final int width;
  final int height;
  final List<T> _source;

  factory Array2d(int width, int height, T Function(int i) generate) {
    assert(width >= 0);
    assert(height >= 0);
    if (width == 0) {
      return Array2d._skinny(height);
    }
    final s = List<T>.generate(width * height, generate);
    return Array2d.wrap(width, s);
  }

  factory Array2d.readonlyFrom(int width, Iterable<T> source) => Array2d.wrap(
      width, UnmodifiableListView<T>(source.toList(growable: false)));

  Array2d._skinny(this.height)
      : width = 0,
        _source = [],
        assert(height >= 0);

  Array2d.wrap(this.width, List<T> source)
      : _source = source,
        assert(width >= 0),
        height = (width != null && width > 0 && source != null)
            ? source.length ~/ width
            : 0 {
    if (width * height == 0) {
      assert(_source.isEmpty);
    } else {
      assert(_source.isNotEmpty);
      assert(_source.length % width == 0);
    }
  }

  @override
  int get length => _source.length;

  @override
  set length(int value) {
    throw UnsupportedError('Not supported');
  }

  @override
  T operator [](int index) => _source[index];

  @override
  void operator []=(int index, T value) {
    _source[index] = value;
  }

  T get(int x, int y) {
    final i = _getIndex(x, y);
    return this[i];
  }

  void set(int x, int y, T value) {
    final i = _getIndex(x, y);
    this[i] = value;
  }

  List<T> getAdjacent(int x, int y) {
    final m = getAdjacentIndices(x, y).map((i) => this[i]);
    return List<T>.from(m);
  }

  List<int> getAdjacentIndices(int x, int y) {
    final adj = <int>[];

    for (var k = math.max(0, y - 1); k < math.min(height, y + 2); k++) {
      for (var j = math.max(0, x - 1); j < math.min(width, x + 2); j++) {
        if (j != x || k != y) {
          adj.add(_getIndex(j, k));
        }
      }
    }
    return adj;
  }

  math.Point<int> getCoordinate(int index) {
    final x = index % width;
    final y = index ~/ width;
    assert(_getIndex(x, y) == index);
    return math.Point<int>(x, y);
  }

  int _getIndex(int x, int y) {
    assert(x >= 0 && x < width);
    assert(y >= 0 && y < height);
    return x + y * width;
  }
}
