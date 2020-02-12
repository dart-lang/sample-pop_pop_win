import 'dart:collection';
import 'dart:math' as math;

import 'util.dart';

class Array2d<T> extends ListBase<T> {
  final int width;
  final int height;
  final List<T> _source;

  factory Array2d(int width, int height, T Function(int i) generate) {
    requireArgument(width >= 0, 'width');
    requireArgument(height >= 0, 'height');
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
        _source = [] {
    assert(height >= 0);
  }

  Array2d.wrap(this.width, List<T> source)
      : _source = source,
        height = (width != null && width > 0 && source != null)
            ? source.length ~/ width
            : 0 {
    requireArgument(width >= 0, 'width', 'width must be non-zero');

    if (width * height == 0) {
      requireArgument(_source.isEmpty, 'width',
          'width must be greater than zero if the source is non-empty');
    } else {
      requireArgument(_source.isNotEmpty, 'source',
          'if width is non-zero, source must be non-empty');
      requireArgument(_source.length % width == 0, 'width',
          'width must evenly divide the source');
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
