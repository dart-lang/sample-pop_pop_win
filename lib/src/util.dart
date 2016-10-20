int getHashCode(Iterable source) {
  int hash = 0;
  for (final h in source) {
    int next = h == null ? 0 : h.hashCode;
    hash = 0x1fffffff & (hash + next);
    hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
    hash ^= hash >> 6;
  }
  hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
  hash ^= hash >> 11;
  return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}

void require(bool truth, [String message]) {
  if (!truth) {
    throw new Exception(message);
  }
}

void requireArgument(bool truth, String argName, [String message]) {
  if (!truth) {
    if (message == null || message.isEmpty) {
      message = 'value was invalid';
    }
    throw new ArgumentError([argName, message]);
  }
}

void requireArgumentNotNull(argument, String argName) {
  if (argument == null) {
    throw new ArgumentError.notNull(argName);
  }
}

class Tuple<T1, T2> {
  final T1 item1;
  final T2 item2;

  const Tuple(this.item1, this.item2);

  @override
  bool operator ==(other) {
    return other is Tuple && item1 == other.item1 && item2 == other.item2;
  }

  @override
  String toString() => "{item1: $item1, item2: $item2}";

  @override
  int get hashCode => getHashCode([item1, item2]);
}
