function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.DateImplementation = {"":
 ["isUtc", "millisecondsSinceEpoch?"],
 super: "Object",
 get$millisecond: function() {
  return $.Primitives_getMilliseconds(this);
},
 get$second: function() {
  return $.Primitives_getSeconds(this);
},
 get$minute: function() {
  return $.Primitives_getMinutes(this);
},
 get$hour: function() {
  return $.Primitives_getHours(this);
},
 get$day: function() {
  return $.Primitives_getDay(this);
},
 get$month: function() {
  return $.Primitives_getMonth(this);
},
 get$year: function() {
  return $.Primitives_getYear(this);
},
 difference$1: function(other) {
  return $.DurationImplementation$(0, 0, 0, 0, $.sub(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch()));
},
 add$1: function(duration) {
  return $.DateImplementation$fromMillisecondsSinceEpoch($.add(this.millisecondsSinceEpoch, duration.get$inMilliseconds()), this.isUtc);
},
 toString$0: function() {
  var t1 = new $.DateImplementation_toString_fourDigits();
  var t2 = new $.DateImplementation_toString_threeDigits();
  var t3 = new $.DateImplementation_toString_twoDigits();
  var y = t1.call$1(this.get$year());
  var m = t3.call$1(this.get$month());
  var d = t3.call$1(this.get$day());
  var h = t3.call$1(this.get$hour());
  var min = t3.call$1(this.get$minute());
  var sec = t3.call$1(this.get$second());
  var ms = t2.call$1(this.get$millisecond());
  if (this.isUtc === true)
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  else
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
},
 hashCode$0: function() {
  return this.millisecondsSinceEpoch;
},
 operator$ge$1: function(other) {
  return $.ge(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$gt$1: function(other) {
  return $.gt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$le$1: function(other) {
  return $.le(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$lt$1: function(other) {
  return $.lt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$eq$1: function(other) {
  if (!(typeof other === 'object' && other !== null && !!other.is$Date))
    return false;
  return $.eq(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000))
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
  t1 = this.isUtc;
  if (t1 == null)
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
},
 DateImplementation$now$0: function() {
  $.Primitives_lazyAsJsDate(this);
},
 is$Date: true
};

$$.DurationImplementation = {"":
 ["inMilliseconds?"],
 super: "Object",
 toString$0: function() {
  var t1 = new $.DurationImplementation_toString_threeDigits();
  var t2 = new $.DurationImplementation_toString_twoDigits();
  var t3 = this.inMilliseconds;
  if ($.ltB(t3, 0))
    return '-' + $.S($.DurationImplementation$(0, 0, 0, 0, $.neg(t3)));
  var twoDigitMinutes = t2.call$1($.remainder(this.get$inMinutes(), 60));
  var twoDigitSeconds = t2.call$1($.remainder(this.get$inSeconds(), 60));
  var threeDigitMs = t1.call$1($.remainder(t3, 1000));
  return $.S(this.get$inHours()) + ':' + $.S(twoDigitMinutes) + ':' + $.S(twoDigitSeconds) + '.' + $.S(threeDigitMs);
},
 hashCode$0: function() {
  return $.hashCode(this.inMilliseconds);
},
 operator$eq$1: function(other) {
  if (!(typeof other === 'object' && other !== null && !!other.is$Duration))
    return false;
  return $.eq(this.inMilliseconds, other.get$inMilliseconds());
},
 get$inSeconds: function() {
  return $.tdiv(this.inMilliseconds, 1000);
},
 get$inMinutes: function() {
  return $.tdiv(this.inMilliseconds, 60000);
},
 get$inHours: function() {
  return $.tdiv(this.inMilliseconds, 3600000);
},
 is$Duration: true
};

$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_lib2_value", "_isComplete"],
 super: "Object",
 _setException$2: function(exception, stackTrace) {
  if (exception == null)
    throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
},
 _setValue$1: function(value) {
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib2_value = value;
  this._complete$0();
},
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null))
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true;) {
        var handler = t1.next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true;) {
        var listener = t1.next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true;) {
      var listener0 = t1.next$0();
      try {
        listener0.call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }

    }
  }
},
 handleException$1: function(onException) {
  if (this._exceptionHandled === true)
    return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null))
      this._exceptionHandled = onException.call$1(t1);
  } else
    $.add$1(this._exceptionHandlers, onException);
},
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true)
    onSuccess.call$1(this.get$value());
  else if (this.get$isComplete() !== true)
    $.add$1(this._successListeners, onSuccess);
  else if (this._exceptionHandled !== true)
    throw $.captureStackTrace(this._exception);
},
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
},
 get$isComplete: function() {
  return this._isComplete;
},
 get$stackTrace: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
},
 get$exception: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._exception;
},
 get$value: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null))
    throw $.captureStackTrace(t1);
  return this._lib2_value;
}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
},
 get$future: function() {
  return this._futureImpl;
}
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_lib2_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC15))
      f.call$2(key, $.index(this._lib2_values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC15))
      f.call$2(key, $.index(this._lib2_values, i));
  }
},
 get$length: function() {
  return this._numberOfEntries;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._lib2_values, index);
    $.indexSet(this._lib2_values, index, null);
    $.indexSet(this._keys, index, $.CTC15);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 putIfAbsent$2: function(key, ifAbsent) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0))
    return $.index(this._lib2_values, index);
  var value = ifAbsent.call$0();
  this.operator$indexSet$2(key, value);
  return value;
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._lib2_values, index);
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  var t3 = t1.length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t3 = t1.length;
    if (index < 0 || index >= t3)
      throw $.ioore(index);
    var t4 = t1[index] === $.CTC15;
    t1 = t4;
  } else
    t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number')
      return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t3 = t1.length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._lib2_values;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  var t5 = t1.length;
  if (index < 0 || index >= t5)
    throw $.ioore(index);
  t1[index] = value;
},
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !($.index(t1, index) == null))
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC15;
            t1 = t3;
        }
      else
        t1 = true;
    case 3:
      if (state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._lib2_values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._lib2_values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._lib2_values, i, null);
  }
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._lib2_values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, {E: 'V'});
  this._lib2_values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC15)
      continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._lib2_values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._lib2_values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, {E: 'V'});
      this._lib2_values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC15)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._lib2_values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0))
    return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(2, key, hash, numberOfProbes, insertionIndex, t1);
    var t3 = t1.length;
    if (hash < 0 || hash >= t3)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC15 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              var t1 = this._keys;
            case 2:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC15 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 3:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, {E: 'V'});
  this._lib2_values = t1;
},
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 get$length: function() {
  return $.get$length(this._backingMap);
},
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
},
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, {E: 'E'});
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(f, result));
  return result;
},
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
},
 addAll$1: function(collection) {
  $.forEach(collection, new $.HashSetImplementation_addAll__(this));
},
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true)
    return false;
  t1.remove$1(value);
  return true;
},
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
},
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0))
    throw $.iae(value);
  var t3 = t1.length;
  if (value < 0 || value >= t3)
    throw $.ioore(value);
  t1[value] = value;
},
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
},
 clear$0: function() {
  $.clear(this._backingMap);
},
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
},
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$)
      break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3)
      throw $.ioore(t2);
    entry = t1[t2];
  } while (entry == null || entry === $.CTC15);
},
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$))
      break;
    entry = $.index(t1, this._nextValidIndex);
  } while (entry == null || entry === $.CTC15);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t4 = t1.length;
  if (t3 < 0 || t3 >= t4)
    throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
},
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
},
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
    return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4)
    return false;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  if (t1 < 0 || t1 >= t4)
    throw $.ioore(t1);
  if (t2[t1] === $.CTC15)
    this._advance$0();
  return this._nextValidIndex < t2.length;
},
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2)))
    return false;
  if ($.index(t2, this._nextValidIndex) === $.CTC15)
    this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
},
 HashSetIterator$1: function(set_) {
  this._advance$0();
}
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_lib2_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib2_list);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 get$length: function() {
  return $.get$length(this._map);
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 forEach$1: function(f) {
  $.forEach(this._lib2_list, new $.LinkedHashMapImplementation_forEach__(f));
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.index_1 = 0;
  $.forEach(this._lib2_list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.index_1 = 0;
  $.forEach(this._lib2_list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
},
 putIfAbsent$2: function(key, ifAbsent) {
  var value = this.operator$index$1(key);
  if (this.operator$index$1(key) == null && this.containsKey$1(key) !== true) {
    value = ifAbsent.call$0();
    this.operator$indexSet$2(key, value);
  }
  return value;
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._lib2_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._lib2_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: 'KeyValuePair<K, V>'});
  this._lib2_list = t1;
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_lib2_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._lib2_element;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._lib2_element;
},
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  t1._link$2(this._previous, this);
},
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._lib2_element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_lib2_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC33);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 remove$0: function() {
  throw $.captureStackTrace($.CTC33);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, {E: 'E'});
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_lib2_element()) === true)
      other.addLast$1(entry.get$_lib2_element());
    entry = nextEntry;
  }
  return other;
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_lib2_element());
    entry = nextEntry;
  }
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
},
 first$0: function() {
  return this._sentinel.get$_next().get$element();
},
 get$first: function() { return new $.BoundClosure(this, 'first$0'); },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  this._sentinel = t1;
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  this._buffer = t1;
  this._length = 0;
  return this;
},
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
  return this;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 isEmpty$0: function() {
  return this._length === 0;
},
 get$length: function() {
  return this._length;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
},
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null)
    return;
  var matchStart = $.regExpMatchStart(m);
  var t1 = $.get$length($.index(m, 0));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var matchEnd = matchStart + t1;
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
},
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
},
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
},
 group$1: function(index) {
  return $.index(this._groups, index);
}
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
}
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true)
    return false;
  else if (!(this._next == null))
    return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  } else
    return true;
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var next = this._next;
  this._next = null;
  return next;
}
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, t1, sb);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
},
 is$Exception: true
};

$$.FormatException = {"":
 ["message?"],
 super: "Object",
 toString$0: function() {
  return 'FormatException: ' + $.S(this.message);
},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
},
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
},
 is$Exception: true
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
},
 is$Exception: true
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
},
 is$Exception: true
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
},
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
}
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
},
 is$Function: true
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object",
 set$3: function(arg0, arg1, arg2) { return this.set.call$3(arg0, arg1, arg2); }
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib4_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
},
 operator$index$1: function(g) {
  return this.group$1(g);
}
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$select: function() {
  return this.operator$index$1('select');
},
 select$1: function(arg0) { return this.get$select().call$1(arg0); },
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$mouseOut: function() {
  return this.operator$index$1('mouseout');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$.FilteredElementList = {"":
 ["_childNodes", "_node"],
 super: "Object",
 last$0: function() {
  return $.last(this.get$_filtered());
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
},
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
},
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
},
 get$length: function() {
  return $.get$length(this.get$_filtered());
},
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
},
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    result.remove$0();
  return result;
},
 clear$0: function() {
  $.clear(this._childNodes);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.CTC9);
},
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
},
 addLast$1: function(value) {
  this.add$1(value);
},
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
},
 add$1: function(value) {
  $.add$1(this._childNodes, value);
},
 get$add: function() { return new $.BoundClosure0(this, 'add$1'); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len))
    return;
  else if ($.ltB(newLength, 0))
    throw $.captureStackTrace($.CTC25);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
},
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
},
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
},
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2 !== null && t2.is$Element())
      return t2;
  }
  return;
},
 first$0: function() { return this.get$first().call$0(); },
 get$_filtered: function() {
  return $.ListFactory_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$.EmptyElementRect = {"":
 ["clientRects", "bounding", "scroll", "offset", "client"],
 super: "Object"
};

$$._ChildrenElementList = {"":
 ["_childElements", "_lib_element?"],
 super: "Object",
 last$0: function() {
  return this._lib_element.get$$$dom_lastElementChild();
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._lib_element.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._lib_element.set$text('');
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.CTC9);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC9);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._lib_element; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 iterator$0: function() {
  return $.iterator(this._toList$0());
},
 addLast$1: function(value) {
  return this.add$1(value);
},
 add$1: function(value) {
  this._lib_element.$dom_appendChild$1(value);
  return value;
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC24);
},
 operator$indexSet$2: function(index, value) {
  this._lib_element.$dom_replaceChild$2(value, $.index(this._childElements, index));
},
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
},
 get$length: function() {
  return $.get$length(this._childElements);
},
 isEmpty$0: function() {
  return this._lib_element.get$$$dom_firstElementChild() == null;
},
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
},
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 get$first: function() {
  return this._lib_element.get$$$dom_firstElementChild();
},
 first$0: function() { return this.get$first().call$0(); },
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._toList$0$bailout(1, t1);
  var output = $.ListFactory_List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var t3 = t1[i];
    var t4 = output.length;
    if (i < 0 || i >= t4)
      throw $.ioore(i);
    output[i] = t3;
  }
  return output;
},
 _toList$0$bailout: function(state, t1) {
  var output = $.ListFactory_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    var t3 = output.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 last$0: function() {
  return $.last(this._nodeList);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC24);
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC24);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.CTC24);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC24);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC24);
},
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC24);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC24);
},
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC24);
},
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
},
 get$length: function() {
  return $.get$length(this._nodeList);
},
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
},
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      out.add$1(t2);
  }
  return out;
},
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 get$first: function() {
  return $.index(this._nodeList, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_index", "_list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._index;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = $.get$length(this._list);
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._index;
    case 1:
      state = 0;
      var t3 = $.get$length(this._list);
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._index;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._index = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t5 = t1.length;
  if (t3 < 0 || t3 >= t5)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC2);
      var t1 = this._list;
    case 1:
      state = 0;
      var t3 = this._index;
    case 2:
      state = 0;
      this._index = $.add(t3, 1);
      return $.index(t1, t3);
  }
}
};

$$._ElementList = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
},
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1.call(this, f));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._SimpleClientRect = {"":
 ["height?", "width?", "top?", "left?"],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.left) + ', ' + $.S(this.top) + ', ' + $.S(this.width) + ', ' + $.S(this.height) + ')';
},
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top()) && $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
}
};

$$._ElementRectImpl = {"":
 ["_clientRects", "_boundingClientRect", "scroll", "offset", "client"],
 super: "Object"
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$select: function() {
  return this.operator$index$1('select');
},
 select$1: function(arg0) { return this.get$select().call$1(arg0); },
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$mouseOut: function() {
  return this.operator$index$1('mouseout');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
}
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _lib_remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
},
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
},
 remove$2: function(listener, useCapture) {
  this._lib_remove$2(listener, useCapture);
  return this;
},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
},
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 clear$0: function() {
  this._this.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 last$0: function() {
  return this._this.lastChild;
},
 get$first: function() {
  return this._this.firstChild;
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 get$first: function() {
  return $.index(this._list, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 insertRange$3: function(start, rangeLength, initialValue) {
  return $.insertRange$3(this._list, start, rangeLength, initialValue);
},
 removeRange$2: function(start, rangeLength) {
  return $.removeRange(this._list, start, rangeLength);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
},
 last$0: function() {
  return $.last(this._list);
},
 removeLast$0: function() {
  return $.removeLast(this._list);
},
 clear$0: function() {
  return $.clear(this._list);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
},
 addAll$1: function(collection) {
  return $.addAll(this._list, collection);
},
 addLast$1: function(value) {
  return $.addLast(this._list, value);
},
 add$1: function(value) {
  return $.add$1(this._list, value);
},
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
},
 operator$index$1: function(index) {
  return $.index(this._list, index);
},
 get$length: function() {
  return $.get$length(this._list);
},
 isEmpty$0: function() {
  return $.isEmpty(this._list);
},
 filter$1: function(f) {
  return $.filter(this._list, f);
},
 forEach$1: function(f) {
  return $.forEach(this._list, f);
},
 iterator$0: function() {
  return $.iterator(this._list);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._list, start, rangeLength));
},
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._list, f));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); },
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$select: function() {
  return this.operator$index$1('select');
},
 select$1: function(arg0) { return this.get$select().call$1(arg0); },
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$mouseOut: function() {
  return this.operator$index$1('mouseout');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
},
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$select: function() {
  return this.operator$index$1('select');
},
 select$1: function(arg0) { return this.get$select().call$1(arg0); },
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$mouseOut: function() {
  return this.operator$index$1('mouseout');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$message: function() {
  return this.operator$index$1('message');
},
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MeasurementRequest = {"":
 ["exception=", "value=", "completer?", "computeValue"],
 super: "Object",
 computeValue$0: function() { return this.computeValue.call$0(); }
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 super: "Object",
 postMessage$3: function(message, targetOrigin, messagePorts) {
  var t1 = messagePorts == null;
  var t2 = this._window;
  if (t1)
    $._DOMWindowCrossFrameImpl__postMessage2(t2, message, targetOrigin);
  else
    $._DOMWindowCrossFrameImpl__postMessage3(t2, message, targetOrigin, messagePorts);
},
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage$3(message,targetOrigin,null)
},
 close$0: function() {
  return $._DOMWindowCrossFrameImpl__close(this._window);
},
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__top(this._window));
}
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t5 = t1.length;
  if (t3 < 0 || t3 >= t5)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC2);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
},
 reset$0: function() {
},
 operator$indexSet$2: function(object, info) {
},
 operator$index$1: function(object) {
  return;
}
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 visitFunction$1: function(func) {
  throw $.captureStackTrace('Serialization of functions is not allowed.');
},
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  if (typeof x === 'function' || typeof x === 'object' && x !== null && !!x.is$Function)
    return this.visitFunction$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
},
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
}
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = {};
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null))
    return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  map.forEach$1(new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
},
 visitList$1: function(list) {
  if (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior())
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
},
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitPrimitive$1: function(x) {
  return x;
}
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    result[i] = t2;
  }
  return result;
},
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
},
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
},
 visitPrimitive$1: function(x) {
  return x;
}
};

$$._Deserializer = {"":
 [],
 super: "Object",
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    var t1 = keys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t2 = values.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
},
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i)
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      return result;
  }
},
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || (dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())
    return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    var t1 = dartList.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._deserializeHelper$1(dartList[i]);
    var t3 = dartList.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    dartList[i] = t2;
  }
  return dartList;
},
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i)
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  return dartList;
},
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
},
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      throw $.captureStackTrace('Unexpected serialized object');
  }
},
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
}
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true)
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
},
 _nativeInitWorkerMessageHandler$0: function() {
    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  
},
 _nativeDetectEnvironment$0: function() {
    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  
},
 get$needSerialization: function() {
  return this.get$useWorkers();
},
 get$useWorkers: function() {
  return this.supportsWorkers;
},
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
}
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1.remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState().get$isolates().remove$1(this.id);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1.containsKey$1(portId) === true)
    throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
},
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
},
 _setGlobals$0: function() {
$setGlobals(this);
},
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1._setGlobals$0();
  }
  return result;
},
 initGlobals$0: function() {
$initGlobals(this);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
}
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true)
    this._runHelper$0();
  else
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }

},
 _runHelper$0: function() {
  if (!($._window() == null))
    new $._EventLoop__runHelper_next(this).call$0();
  else
    for (; this.runIteration$0() === true;)
      ;
},
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true)
      $._globalState().maybeCloseWorker$0();
    else if (!($._globalState().get$rootContext() == null) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true)
      throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    return false;
  }
  event$.process$0();
  return true;
},
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true)
    return;
  return t1.removeFirst$0();
},
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
}
};

$$._IsolateEvent = {"":
 ["message?", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
}
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
$globalThis.postMessage(msg);
},
 get$id: function() {
  return 0;
}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port._workerId, port._isolateId, port._receivePortId];
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port._isolateId, port._receivePort.get$_id()];
},
 visitSendPort$1: function(x) {
  if (!!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (!!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (!!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
},
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port._workerId, port._isolateId, port._receivePortId);
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port._receivePort, port._isolateId);
},
 visitSendPort$1: function(x) {
  if (!!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (!!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (!!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
},
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null)
      return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  } else
    return $._WorkerSendPort$(managerId, isolateId, receivePortId);
}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
return o['__MessageTraverser__attached_info__'];
},
 _setAttachedInfo$2: function(o, info) {
o['__MessageTraverser__attached_info__'] = info;
},
 _clearAttachedInfo$1: function(o) {
o['__MessageTraverser__attached_info__'] = (void 0);
},
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number')
    return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
},
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
},
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
},
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_NativeJsSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_WorkerSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_BufferingSendPort))
    throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
},
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(this, message, replyTo));
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort)
    var t1 = $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId);
  else
    t1 = false;
  return t1;
},
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(this, message, replyTo));
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_callback?", "_id?"],
 super: "Object",
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState().get$currentContext().get$id());
},
 close$0: function() {
  this._callback = null;
  $._globalState().get$currentContext().unregister$1(this._id);
},
 receive$1: function(onMessage) {
  this._callback = onMessage;
},
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._id, this);
}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitSendPort$1: function(port) {
  if (!!port.is$_BufferingSendPort && port._port == null)
    $.add$1(this.ports, port.get$_futurePort());
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null))
    return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
},
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null))
    return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
},
 visitPrimitive$1: function(x) {
},
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._Timer = {"":
 ["_handle", "_once"],
 super: "Object",
 _Timer$repeating$2: function(milliSeconds, callback) {
  this._handle = $._window().setInterval$2(new $.anon0(this, callback), milliSeconds);
},
 _Timer$2: function(milliSeconds, callback) {
  this._handle = $._window().setTimeout$2(new $.anon(this, callback), milliSeconds);
}
};

$$.Field = {"":
 ["_adjacents", "mineCount?", "_source", "height", "width"],
 super: "Array2d",
 getAdjacentCount$2: function(x, y) {
  if (this.get$2(x, y) === true)
    return;
  var t1 = this._adjacents;
  var val = t1.get$2(x, y);
  if (val == null) {
    for (var t2 = $.iterator(this.getAdjacentIndices$2(x, y)), val = 0; t2.hasNext$0() === true;)
      if (this.operator$index$1(t2.next$0()) === true)
        ++val;
    t1.set$3(x, y, val);
  }
  return val;
},
 Field$_internal$3: function(mineCount, cols, source) {
  for (var t1 = $.iterator(this), count = 0; t1.hasNext$0() === true;)
    if (t1.next$0() === true)
      ++count;
}
};

$$.Game = {"":
 ["_endTime", "_startTime", "_revealsLeft", "_minesLeft", "_state", "_updatedEvent", "_states", "field?"],
 super: "Object",
 _getAdjacentFlagCount$2: function(x, y) {
  var t1 = $.iterator(this.field.getAdjacentIndices$2(x, y));
  var t2 = this._states;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
    return this._getAdjacentFlagCount$2$bailout(1, t1, t2);
  var val = 0;
  for (; t1.hasNext$0() === true;) {
    var t3 = t1.next$0();
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    var t4 = t2.length;
    if (t3 < 0 || t3 >= t4)
      throw $.ioore(t3);
    if ($.eqB(t2[t3], $.CTC13))
      ++val;
  }
  return val;
},
 _getAdjacentFlagCount$2$bailout: function(state, t1, t2) {
  var val = 0;
  for (; t1.hasNext$0() === true;)
    if ($.eqB($.index(t2, t1.next$0()), $.CTC13))
      ++val;
  return val;
},
 _ensureStarted$0: function() {
  if ($.eqB(this.get$state(), $.CTC28))
    this._setState$1($.CTC26);
},
 _setState$1: function(value) {
  if (!$.eqB(this._state, value)) {
    this._state = value;
    if ($.eqB(this._state, $.CTC26))
      this._startTime = $.DateImplementation$now();
    else if (this.get$gameEnded() === true)
      this._endTime = $.DateImplementation$now();
  }
},
 _update$0: function() {
  return this._updatedEvent.fireEvent$1($.CTC22);
},
 _setLost$0: function() {
  var t1 = this.field;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._setLost$0$bailout(1, t1, 0);
  var t3 = this._states;
  if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior())
    return this._setLost$0$bailout(2, t1, t3);
  var i = 0;
  for (; t2 = t1.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    if (t1[i] === true) {
      var t2 = t3.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      t3[i] = $.CTC16;
    }
  }
  this._setState$1($.CTC30);
},
 _setLost$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.field;
    case 1:
      state = 0;
      var t3 = this._states;
    case 2:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i)
        if ($.index(t1, i) === true)
          $.indexSet(t3, i, $.CTC16);
      this._setState$1($.CTC30);
  }
},
 _setWon$0: function() {
  var t1 = this.field;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._setWon$0$bailout(1, t1, 0);
  var t3 = this._states;
  if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior())
    return this._setWon$0$bailout(2, t1, t3);
  var i = 0;
  for (; t2 = t1.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    if (t1[i] === true) {
      var t2 = t3.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      t3[i] = $.CTC17;
    }
  }
  this._setState$1($.CTC29);
},
 _setWon$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.field;
    case 1:
      state = 0;
      var t3 = this._states;
    case 2:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i)
        if ($.index(t1, i) === true)
          $.indexSet(t3, i, $.CTC17);
      this._setState$1($.CTC29);
  }
},
 _doReveal$2: function(x, y) {
  var t1 = this._states;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._doReveal$2$bailout(1, x, t1, y, 0, 0);
  t1.set$3(x, y, $.CTC14);
  var t3 = this._revealsLeft;
  if (typeof t3 !== 'number')
    return this._doReveal$2$bailout(2, x, t1, y, t3, 0);
  this._revealsLeft = t3 - 1;
  var t2 = this._revealsLeft;
  if (typeof t2 !== 'number')
    return this._doReveal$2$bailout(3, x, t1, y, t2, 0);
  if (t2 === 0) {
    this._setWon$0();
    var revealCount = 1;
  } else {
    t2 = this.field;
    t3 = t2.getAdjacentCount$2(x, y);
    if (typeof t3 !== 'number')
      return this._doReveal$2$bailout(4, x, t1, y, t3, t2);
    if (t3 === 0)
      for (t3 = $.iterator(t2.getAdjacentIndices$2(x, y)), revealCount = 1; t3.hasNext$0() === true;) {
        var t4 = t3.next$0();
        if (t4 !== (t4 | 0))
          throw $.iae(t4);
        var t5 = t1.length;
        if (t4 < 0 || t4 >= t5)
          throw $.ioore(t4);
        if ($.eqB(t1[t4], $.CTC12)) {
          var c = t2.getCoordinate$1(t4);
          t4 = this._doReveal$2(c.get$Item1(), c.get$Item2());
          if (typeof t4 !== 'number')
            throw $.iae(t4);
          revealCount += t4;
        }
      }
    else
      revealCount = 1;
  }
  return revealCount;
},
 _doReveal$2$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var x = env0;
      t1 = env1;
      var y = env2;
      break;
    case 2:
      x = env0;
      t1 = env1;
      y = env2;
      t3 = env3;
      break;
    case 3:
      x = env0;
      t1 = env1;
      y = env2;
      t2 = env3;
      break;
    case 4:
      x = env0;
      t1 = env1;
      y = env2;
      t3 = env3;
      t2 = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._states;
    case 1:
      state = 0;
      t1.set$3(x, y, $.CTC14);
      var t3 = this._revealsLeft;
    case 2:
      state = 0;
      this._revealsLeft = $.sub(t3, 1);
      var t2 = this._revealsLeft;
    case 3:
      state = 0;
    case 4:
      if (state === 0 && $.eqB(t2, 0)) {
        this._setWon$0();
        var revealCount = 1;
      } else
        switch (state) {
          case 0:
            t2 = this.field;
            t3 = t2.getAdjacentCount$2(x, y);
          case 4:
            state = 0;
            if ($.eqB(t3, 0))
              for (t3 = $.iterator(t2.getAdjacentIndices$2(x, y)), revealCount = 1; t3.hasNext$0() === true;) {
                var t4 = t3.next$0();
                if ($.eqB($.index(t1, t4), $.CTC12)) {
                  var c = t2.getCoordinate$1(t4);
                  t4 = this._doReveal$2(c.get$Item1(), c.get$Item2());
                  if (typeof t4 !== 'number')
                    throw $.iae(t4);
                  revealCount += t4;
                }
              }
            else
              revealCount = 1;
        }
      return revealCount;
  }
},
 _doChord$2: function(x, y) {
  var t1 = this._states;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._doChord$2$bailout(1, x, y, t1, 0, 0, 0);
  t1.get$2(x, y);
  var flagged = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(flagged, {E: 'int'});
  var hidden = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(hidden, {E: 'int'});
  var t3 = this.field;
  if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
    return this._doChord$2$bailout(2, x, y, t1, t3, flagged, hidden);
  t3.getAdjacentCount$2(x, y);
  for (var t2 = $.iterator(t3.getAdjacentIndices$2(x, y)), failed = false; t2.hasNext$0() === true;) {
    var t4 = t2.next$0();
    if (t4 !== (t4 | 0))
      throw $.iae(t4);
    var t5 = t1.length;
    if (t4 < 0 || t4 >= t5)
      throw $.ioore(t4);
    if ($.eqB(t1[t4], $.CTC12)) {
      hidden.push(t4);
      t5 = t3.length;
      if (t4 < 0 || t4 >= t5)
        throw $.ioore(t4);
      if (t3[t4] === true)
        failed = true;
    } else {
      t5 = t1.length;
      if (t4 < 0 || t4 >= t5)
        throw $.ioore(t4);
      if ($.eqB(t1[t4], $.CTC13))
        flagged.push(t4);
    }
  }
  if (failed) {
    this._setLost$0();
    var reveals = 0;
  } else
    for (t1 = $.iterator(hidden), reveals = 0; t1.hasNext$0() === true;) {
      var c = t3.getCoordinate$1(t1.next$0());
      t2 = this.reveal$2(c.get$Item1(), c.get$Item2());
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      reveals += t2;
    }
  return reveals;
},
 _doChord$2$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var x = env0;
      var y = env1;
      t1 = env2;
      break;
    case 2:
      x = env0;
      y = env1;
      t1 = env2;
      t3 = env3;
      flagged = env4;
      hidden = env5;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._states;
    case 1:
      state = 0;
      t1.get$2(x, y);
      var flagged = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(flagged, {E: 'int'});
      var hidden = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(hidden, {E: 'int'});
      var t3 = this.field;
    case 2:
      state = 0;
      t3.getAdjacentCount$2(x, y);
      for (var t2 = $.iterator(t3.getAdjacentIndices$2(x, y)), failed = false; t2.hasNext$0() === true;) {
        var t4 = t2.next$0();
        if ($.eqB($.index(t1, t4), $.CTC12)) {
          hidden.push(t4);
          if ($.index(t3, t4) === true)
            failed = true;
        } else if ($.eqB($.index(t1, t4), $.CTC13))
          flagged.push(t4);
      }
      if (failed) {
        this._setLost$0();
        var reveals = 0;
      } else
        for (t1 = $.iterator(hidden), reveals = 0; t1.hasNext$0() === true;) {
          var c = t3.getCoordinate$1(t1.next$0());
          t2 = this.reveal$2(c.get$Item1(), c.get$Item2());
          if (typeof t2 !== 'number')
            throw $.iae(t2);
          reveals += t2;
        }
      return reveals;
  }
},
 reveal$2: function(x, y) {
  this._ensureStarted$0();
  var currentSS = this._states.get$2(x, y);
  $.require(!$.eqB(currentSS, $.CTC13), 'Cannot reveal a flagged square');
  if ($.eqB(currentSS, $.CTC12))
    if (this.field.get$2(x, y) === true) {
      this._setLost$0();
      var reveals = 0;
    } else
      reveals = this._doReveal$2(x, y);
  else if ($.eqB(currentSS, $.CTC14))
    reveals = $.eqB(this._getAdjacentFlagCount$2(x, y), this.field.getAdjacentCount$2(x, y)) ? this._doChord$2(x, y) : 0;
  else
    reveals = 0;
  this._update$0();
  return reveals;
},
 setFlag$3: function(x, y, value) {
  this._ensureStarted$0();
  var t1 = this._states;
  var currentSS = t1.get$2(x, y);
  if (value) {
    $.require($.eq(currentSS, $.CTC12), '');
    t1.set$3(x, y, $.CTC13);
    this._minesLeft = $.sub(this._minesLeft, 1);
  } else {
    $.require($.eq(currentSS, $.CTC13), '');
    t1.set$3(x, y, $.CTC12);
    this._minesLeft = $.add(this._minesLeft, 1);
  }
  this._update$0();
},
 get$duration: function() {
  if (this._startTime == null)
    return;
  else {
    var end = this._endTime;
    if (end == null)
      end = $.DateImplementation$now();
    return end.difference$1(this._startTime);
  }
},
 get$gameEnded: function() {
  return $.eqB(this._state, $.CTC29) || $.eqB(this._state, $.CTC30);
},
 getSquareState$2: function(x, y) {
  return this._states.get$2(x, y);
},
 get$updated: function() {
  return this._updatedEvent;
},
 get$state: function() {
  return this._state;
},
 get$minesLeft: function() {
  return this._minesLeft;
},
 Game$1: function(field) {
  this._minesLeft = field.get$mineCount();
  this._revealsLeft = $.sub($.get$length(field), field.get$mineCount());
}
};

$$.GameState = {"":
 ["name?"],
 super: "Object",
 toString$0: function() {
  return 'GameState: ' + $.S(this.name);
}
};

$$.SquareState = {"":
 ["name?"],
 super: "Object",
 toString$0: function() {
  return 'SquareState: ' + $.S(this.name);
}
};

$$._Random = {"":
 [],
 super: "Object",
 nextInt$1: function(max) {
  if (max < 0)
    throw $.captureStackTrace($.IllegalArgumentException$('negative max: ' + $.S(max)));
  if (max > 4294967295)
    max = 4294967295;
  return (Math.random() * max) >>> 0;
}
};

$$.DisposableImpl = {"":
 [],
 super: "Object"
};

$$.GlobalId = {"":
 ["_hashCode", "id?"],
 super: "Object",
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(other.get$id(), this.id);
},
 hashCode$0: function() {
  return this._hashCode;
}
};

$$.Tuple = {"":
 ["Item2?", "Item1?"],
 super: "Object",
 toString$0: function() {
  return 'Tuple: Item1: ' + $.S(this.Item1) + ', Item2: ' + $.S(this.Item2);
},
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(this.Item1, other.get$Item1()) && $.eqB(this.Item2, other.get$Item2());
}
};

$$.NullArgumentException = {"":
 ["theArg", "_arg"],
 super: "IllegalArgumentException",
 toString$0: function() {
  return 'Null argument(s): ' + $.S(this.theArg);
}
};

$$.InvalidOperationException = {"":
 ["message?"],
 super: "Object",
 is$Exception: true
};

$$.DetailedIllegalArgumentException = {"":
 ["message?", "argument", "_arg"],
 super: "IllegalArgumentException",
 toString$0: function() {
  var t1 = this.message;
  var t2 = t1 == null || $.eqB($.get$length(t1), 0);
  var t3 = this.argument;
  if (t2)
    return 'Illegal argument: ' + $.S(t3);
  else
    return 'Illegal argument: ' + $.S(t3) + ' -- ' + $.S(t1);
}
};

$$.Enumerable = {"":
 [],
 super: "Object",
 toString$0: function() {
  return '[' + $.S(this.join$0()) + ']';
},
 toList$0: function() {
  var t1 = $.ListFactory_List$from(this);
  $.setRuntimeTypeInfo(t1, {E: 'T'});
  return t1;
},
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 firstOrDefault$2: function(f, defaultValue) {
  if (f == null)
    f = new $.Enumerable_firstOrDefault_anon();
  var iter = $._WhereIterator$(this.iterator$0(), f);
  $.setRuntimeTypeInfo(iter, {T: 'T'});
  if (iter.hasNext$0() !== true)
    return defaultValue;
  return iter.next$0();
},
 firstOrDefault$1: function(f) {
  return this.firstOrDefault$2(f,null)
},
 first$1: function(f) {
  if (f == null)
    f = new $.Enumerable_first_anon();
  var iter = $._WhereIterator$(this.iterator$0(), f);
  $.setRuntimeTypeInfo(iter, {T: 'T'});
  if (iter.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC23);
  return iter.next$0();
},
 first$0: function() {
  return this.first$1(null)
},
 get$first: function() { return new $.BoundClosure1(this, 'first$1'); },
 select$1: function(f) {
  $.requireArgumentNotNull(f, 'f');
  return $._FuncEnumerable$(this, new $.Enumerable_select_anon(f));
},
 join$1: function(separator) {
  var sb = $.StringBufferImpl$('');
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if ($.gtB($.get$length(sb), 0))
      sb.add$1(separator);
    sb.add$1(t2);
  }
  return sb.toString$0();
},
 join$0: function() {
  return this.join$1(', ')
},
 contains$1: function(item) {
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;)
    if ($.eqB(t1.next$0(), item))
      return true;
  return false;
},
 iterator$0: function() {
  throw $.captureStackTrace($.CTC9);
},
 is$Enumerable: true
};

$$._SimpleEnumerable = {"":
 ["_source"],
 super: "Enumerable",
 iterator$0: function() {
  return $.iterator(this._source);
}
};

$$._FuncEnumerable = {"":
 ["_func", "_source"],
 super: "Enumerable",
 iterator$0: function() {
  return this._func$1($.iterator(this._source));
},
 _func$1: function(arg0) { return this._func.call$1(arg0); }
};

$$._SelectIterator = {"":
 ["_func", "_source"],
 super: "Object",
 next$0: function() {
  return this._func$1(this._source.next$0());
},
 hasNext$0: function() {
  return this._source.hasNext$0();
},
 _func$1: function(arg0) { return this._func.call$1(arg0); }
};

$$._WhereIterator = {"":
 ["_current", "_lib0_next=", "_func", "_source"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  this._lib0_next = null;
  return this._current;
},
 hasNext$0: function() {
  if (this._lib0_next == null) {
    this._lib0_next = false;
    for (var t1 = this._source; t1.hasNext$0() === true;) {
      this._current = t1.next$0();
      if (this._func$1(this._current) === true) {
        this._lib0_next = true;
        break;
      }
    }
  }
  return this._lib0_next;
},
 _func$1: function(arg0) { return this._func.call$1(arg0); }
};

$$.IndexIterator = {"":
 ["_lib0_pos", "_lib0_length", "_indexer"],
 super: "Object",
 _indexer$1: function(arg0) { return this._indexer.call$1(arg0); },
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._lib0_pos;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1);
  this._lib0_pos = t1 + 1;
  return this._indexer$1(t1);
},
 next$0$bailout: function(state, t1) {
  this._lib0_pos = $.add(t1, 1);
  return this._indexer$1(t1);
},
 hasNext$0: function() {
  var t1 = this._lib0_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._lib0_pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib0_length;
    case 1:
      state = 0;
      var t3 = this._lib0_pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
},
 IndexIterator$2: function(length$, indexer) {
  $.requireArgumentNotNull(this._indexer, '_indexer');
}
};

$$.ListBase = {"":
 [],
 super: "Enumerable",
 insertRange$3: function(start, length$, initialValue) {
  throw $.captureStackTrace($.CTC19);
},
 removeRange$2: function(start, length$) {
  throw $.captureStackTrace($.CTC19);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC19);
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC19);
},
 addAll$1: function(value) {
  throw $.captureStackTrace($.CTC19);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC19);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC19);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC19);
},
 getRange$2: function(start, itemCount) {
  if (typeof start !== 'number')
    return this.getRange$2$bailout(1, start, itemCount);
  $.requireArgument($.ge(itemCount, 0), 'count', null);
  if (typeof itemCount !== 'number')
    throw $.iae(itemCount);
  var lastIndex = start + itemCount - 1;
  if (itemCount > 0)
    if (start < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(start));
    else if ($.geB(lastIndex, $.get$length(this)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(lastIndex));
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, {E: 'T'});
  for (var i = start; i <= lastIndex; ++i)
    list.push(this.operator$index$1(i));
  return list;
},
 getRange$2$bailout: function(state, start, itemCount) {
  $.requireArgument($.ge(itemCount, 0), 'count', null);
  var lastIndex = $.sub($.add(start, itemCount), 1);
  if ($.gtB(itemCount, 0))
    if ($.ltB(start, 0))
      throw $.captureStackTrace($.IndexOutOfRangeException$(start));
    else if ($.geB(lastIndex, $.get$length(this)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(lastIndex));
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, {E: 'T'});
  for (var i = start; $.leB(i, lastIndex); i = $.add(i, 1))
    list.push(this.operator$index$1(i));
  return list;
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  if (typeof start !== 'number')
    return this.indexOf$2$bailout(1, element, start);
  for (var i = start; $.ltB(i, $.get$length(this)); ++i)
    if ($.eqB(this.operator$index$1(i), element))
      return i;
  return -1;
},
 indexOf$2$bailout: function(state, element, start) {
  for (var i = start; $.ltB(i, $.get$length(this)); i = $.add(i, 1))
    if ($.eqB(this.operator$index$1(i), element))
      return i;
  return -1;
},
 operator$index$1: function(index) {
  throw $.captureStackTrace($.CTC18);
},
 get$length: function() {
  throw $.captureStackTrace($.CTC18);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, {E: 'T'});
  for (var i = 0; $.ltB(i, $.get$length(this)); ++i) {
    var e = this.operator$index$1(i);
    if (f.call$1(e) === true)
      list.push(e);
  }
  return list;
},
 forEach$1: function(f) {
  for (var i = 0; $.ltB(i, $.get$length(this)); ++i)
    f.call$1(this.operator$index$1(i));
},
 iterator$0: function() {
  var t1 = $.IndexIterator$($.get$length(this), new $.ListBase_iterator_anon(this));
  $.setRuntimeTypeInfo(t1, {T: 'T'});
  return t1;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$.ReadOnlyCollection = {"":
 ["_items"],
 super: "ListBase",
 operator$index$1: function(index) {
  var t1 = this._items;
  if (index !== (index | 0))
    throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2)
    throw $.ioore(index);
  return t1[index];
},
 get$length: function() {
  return this._items.length;
}
};

$$.NoneHashMap = {"":
 ["_values"],
 super: "Object",
 isEmpty$0: function() {
  throw $.captureStackTrace('not impled');
},
 clear$0: function() {
  throw $.captureStackTrace('not impled');
},
 remove$1: function(key) {
  for (var t1 = this._values, i = 0; i < t1.length; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    if ($.eqB(t1[i].get$Item1(), key)) {
      t2 = t1.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      var t = t1[i];
      $.removeRange(t1, i, 1);
      return t.get$Item2();
    }
  }
  return;
},
 operator$indexSet$2: function(key, value) {
  var newT = $.Tuple$(key, value);
  for (var t1 = this._values, i = 0; i < t1.length; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    if ($.eqB(t1[i].get$Item1(), key)) {
      t2 = t1.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      t1[i] = newT;
      return;
    }
  }
  t1.push(newT);
},
 operator$index$1: function(key) {
  for (var t1 = $.iterator(this._values); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if ($.eqB(t2.get$Item1(), key))
      return t2.get$Item2();
  }
  return;
},
 containsKey$1: function(key) {
  for (var t1 = $.iterator(this._values); t1.hasNext$0() === true;)
    if ($.eqB(t1.next$0().get$Item1(), key))
      return true;
  return false;
},
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._values); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    f.call$2(t2.get$Item1(), t2.get$Item2());
  }
},
 get$length: function() {
  return this._values.length;
},
 getValues$0: function() {
  return $.$$(this._values).select$1(new $.NoneHashMap_getValues_anon()).toList$0();
},
 getKeys$0: function() {
  return $.$$(this._values).select$1(new $.NoneHashMap_getKeys_anon()).toList$0();
},
 putIfAbsent$2: function(key, ifAbsent) {
  for (var t1 = this._values, t2 = $.iterator(t1); t2.hasNext$0() === true;) {
    var t3 = t2.next$0();
    if ($.eqB(t3.get$Item1(), key))
      return t3.get$Item2();
  }
  var t = $.Tuple$(key, ifAbsent.call$0());
  t1.push(t);
  return t.Item2;
},
 is$Map: function() { return true; }
};

$$.Array2d = {"":
 ["_source", "height?", "width?"],
 super: "ListBase",
 _getIndex$2: function(x, y) {
  return $.add(x, $.mul(y, this.width));
},
 getCoordinate$1: function(index) {
  if (typeof index !== 'number')
    return this.getCoordinate$1$bailout(1, index, 0);
  var t1 = this.width;
  if (typeof t1 !== 'number')
    return this.getCoordinate$1$bailout(2, index, t1);
  return $.Tuple$($.mod(index, t1), $.tdiv(index, t1));
},
 getCoordinate$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var index = env0;
      break;
    case 2:
      index = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.width;
    case 2:
      state = 0;
      return $.Tuple$($.mod(index, t1), $.tdiv(index, t1));
  }
},
 getAdjacentIndices$2: function(x, y) {
  if (typeof x !== 'number')
    return this.getAdjacentIndices$2$bailout(1, x, y);
  if (typeof y !== 'number')
    return this.getAdjacentIndices$2$bailout(1, x, y);
  var adj = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(adj, {E: 'int'});
  for (var k = $.max(0, y - 1), t1 = this.height, t2 = this.width, t3 = y + 2, t4 = x - 1, t5 = x + 2; k < $.min(t1, t3); ++k)
    for (var j = $.max(0, t4), t6 = !(k === y); j < $.min(t2, t5); ++j)
      if (!(j === x) || t6)
        adj.push(this._getIndex$2(j, k));
  return adj;
},
 getAdjacentIndices$2$bailout: function(state, x, y) {
  var adj = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(adj, {E: 'int'});
  for (var k = $.max(0, $.sub(y, 1)), t1 = this.height, t2 = this.width; k < $.min(t1, $.add(y, 2)); ++k)
    for (var j = $.max(0, $.sub(x, 1)), t3 = !(k === y); j < $.min(t2, $.add(x, 2)); ++j)
      if (!(j === x) || t3)
        adj.push(this._getIndex$2(j, k));
  return adj;
},
 set$3: function(x, y, value) {
  this.operator$indexSet$2(this._getIndex$2(x, y), value);
},
 get$set: function() { return new $.BoundClosure2(this, 'set$3'); },
 get$2: function(x, y) {
  return this.operator$index$1(this._getIndex$2(x, y));
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._source, index, value);
},
 operator$index$1: function(index) {
  var t1 = this._source;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$index$1$bailout(1, t1, index);
  if (index !== (index | 0))
    throw $.iae(index);
  var t3 = t1.length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  return t1[index];
},
 operator$index$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
},
 get$length: function() {
  return $.get$length(this._source);
},
 Array2d$wrap$2: function(width, source) {
  $.requireArgumentNotNull(width, 'width');
  $.requireArgumentNotNull(source, 'source');
  $.requireArgument($.ge(width, 0), 'width', 'width must be non-zero');
  var t1 = $.eqB(width, 0);
  var t2 = this._source;
  if (t1)
    $.requireArgument($.eq($.get$length(t2), 0), 'width', 'width must be greater than zero if the source is non-empty');
  else {
    $.requireArgument($.gt($.get$length(t2), 0), 'source', 'if width is non-zero, source must be non-empty');
    $.requireArgument($.eq($.mod($.get$length(t2), width), 0), 'width', 'width must evenly divide the source');
  }
}
};

$$.EventHandle = {"":
 ["_handlers?", "_disposed"],
 super: "DisposableImpl",
 remove$1: function(id) {
  var t1 = this._handlers;
  if (!(t1 == null))
    return !(t1.remove$1(id) == null);
  else
    return false;
},
 add$1: function(handler) {
  var id = $.GlobalId_GlobalId();
  if (this._handlers == null)
    this._handlers = $.HashMapImplementation$();
  $.indexSet(this._handlers, id, handler);
  return id;
},
 fireEvent$1: function(args) {
  var t1 = this._handlers;
  if (!(t1 == null))
    $.forEach(t1, new $.EventHandle_fireEvent_anon(args));
}
};

$$.EventArgs = {"":
 [],
 super: "Object"
};

$$.Size = {"":
 ["height?", "width?"],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.width) + ' x ' + $.S(this.height) + ')';
},
 get$isValid: function() {
  var t1 = this.width;
  if ($.isValidNumber(t1)) {
    var t2 = this.height;
    t1 = $.isValidNumber(t2) && $.geB(t1, 0) && $.geB(t2, 0);
  } else
    t1 = false;
  return t1;
},
 isEmpty$0: function() {
  return $.eq(this.get$area(), 0);
},
 get$area: function() {
  return $.mul(this.width, this.height);
},
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
}
};

$$.Coordinate = {"":
 ["y?", "x?"],
 super: "Object",
 toString$0: function() {
  return '{x:' + $.S(this.x) + ', y:' + $.S(this.y) + '}';
},
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(this.x, other.get$x()) && $.eqB(this.y, other.get$y());
},
 operator$add$1: function(other) {
  return $.Coordinate$($.add(this.x, other.get$x()), $.add(this.y, other.get$y()));
},
 operator$sub$1: function(other) {
  return $.Coordinate_difference(this, other);
},
 get$isValid: function() {
  return $.isValidNumber(this.x) && $.isValidNumber(this.y);
}
};

$$.Vector = {"":
 ["y", "x"],
 super: "Coordinate",
 scale$1: function(magnitude) {
  return $.Vector$($.mul(this.x, magnitude), $.mul(this.y, magnitude));
},
 operator$mul$1: function(magnitude) {
  return this.scale$1(magnitude);
},
 operator$add$1: function(other) {
  return $.Vector$($.add(this.x, other.get$x()), $.add(this.y, other.get$y()));
},
 get$length: function() {
  var t1 = this.x;
  t1 = $.mul(t1, t1);
  var t2 = this.y;
  return $.Math_sqrt($.add(t1, $.mul(t2, t2)));
}
};

$$.Rect = {"":
 ["height?", "width?", "top?", "left?"],
 super: "Object",
 hashCode$0: function() {
  return $.Util_getHashCode([this.left, this.top, this.width, this.height]);
},
 toString$0: function() {
  return 'Location: ' + $.S(this.get$topLeft()) + ', Size: ' + $.S(this.get$size());
},
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(other.get$left(), this.left) && $.eqB(other.get$top(), this.top) && $.eqB(other.get$width(), this.width) && $.eqB(other.get$height(), this.height);
},
 contains$1: function(point) {
  var t1 = point.get$x();
  var t2 = this.left;
  if ($.geB(t1, t2))
    if ($.leB(point.get$x(), $.add(t2, this.width))) {
      t1 = point.get$y();
      t2 = this.top;
      t1 = $.geB(t1, t2) && $.leB(point.get$y(), $.add(t2, this.height));
    } else
      t1 = false;
  else
    t1 = false;
  return t1;
},
 get$isValid: function() {
  return this.get$topLeft().get$isValid() === true && this.get$size().get$isValid() === true;
},
 get$size: function() {
  return $.Size$(this.width, this.height);
},
 get$topLeft: function() {
  return $.Coordinate$(this.left, this.top);
}
};

$$.AffineTransform = {"":
 ["_m12?", "_m02?", "_m11?", "_m01?", "_m10?", "_m00?"],
 super: "Object",
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(this._m00, other.get$_m00()) && $.eqB(this._m01, other.get$_m01()) && $.eqB(this._m02, other.get$_m02()) && $.eqB(this._m10, other.get$_m10()) && $.eqB(this._m11, other.get$_m11()) && $.eqB(this._m12, other.get$_m12());
},
 createInverse$0: function() {
  var det = this.get$determinant();
  return $.AffineTransform$($.div(this._m11, det), $.div($.neg(this._m10), det), $.div($.neg(this._m01), det), $.div(this._m00, det), $.div($.sub($.mul(this._m01, this._m12), $.mul(this._m11, this._m02)), det), $.div($.sub($.mul(this._m10, this._m02), $.mul(this._m00, this._m12)), det));
},
 transformCoordinate$1: function(point) {
  return $.Coordinate$($.add($.add($.mul(point.get$x(), this._m00), $.mul(point.get$y(), this._m01)), this._m02), $.add($.add($.mul(point.get$x(), this._m10), $.mul(point.get$y(), this._m11)), this._m12));
},
 setTransform$6: function(m00, m10, m01, m11, m02, m12) {
  this._m00 = m00;
  this._m10 = m10;
  this._m01 = m01;
  this._m11 = m11;
  this._m02 = m02;
  this._m12 = m12;
  return this;
},
 setToTranslation$2: function(dx, dy) {
  return this.setTransform$6(1, 0, 0, 1, dx, dy);
},
 concatenate$1: function(tx) {
  var m0 = this._m00;
  var m1 = this._m01;
  this._m00 = $.add($.mul(tx.get$_m00(), m0), $.mul(tx.get$_m10(), m1));
  this._m01 = $.add($.mul(tx.get$_m01(), m0), $.mul(tx.get$_m11(), m1));
  this._m02 = $.add(this._m02, $.add($.mul(tx.get$_m02(), m0), $.mul(tx.get$_m12(), m1)));
  var m00 = this._m10;
  var m10 = this._m11;
  this._m10 = $.add($.mul(tx.get$_m00(), m00), $.mul(tx.get$_m10(), m10));
  this._m11 = $.add($.mul(tx.get$_m01(), m00), $.mul(tx.get$_m11(), m10));
  this._m12 = $.add(this._m12, $.add($.mul(tx.get$_m02(), m00), $.mul(tx.get$_m12(), m10)));
  return this;
},
 get$concatenate: function() { return new $.BoundClosure0(this, 'concatenate$1'); },
 get$determinant: function() {
  return $.sub($.mul(this._m00, this._m11), $.mul(this._m01, this._m10));
},
 get$shearY: function() {
  return this._m10;
},
 get$shearX: function() {
  return this._m01;
},
 get$translateY: function() {
  return this._m12;
},
 get$translateX: function() {
  return this._m02;
},
 get$scaleY: function() {
  return this._m11;
},
 get$scaleX: function() {
  return this._m00;
}
};

$$.Attachable = {"":
 ["name?"],
 super: "Object"
};

$$.AttachableObjectImpl = {"":
 ["propertyValues?"],
 super: "DisposableImpl"
};

$$.PropertyValues = {"":
 ["_changeHandle", "_propertyValues", "_disposed"],
 super: "DisposableImpl",
 _getValueOrUndefined$3: function(key, obj, ifAbsent) {
  if (this._isSet$1(key) === true)
    return $.index(this._propertyValues, key);
  else if (!(ifAbsent == null)) {
    var value = ifAbsent.call$1(obj);
    this._set$2(key, value);
    return value;
  } else
    return $.CTC6;
},
 get$propertyChanged: function() {
  return this._changeHandle;
},
 _remove$1: function(key) {
  if (this._isSet$1(key) === true) {
    this._propertyValues.remove$1(key);
    this._changeHandle.fireEvent$1(key);
  }
},
 _isSet$1: function(key) {
  return this._propertyValues.containsKey$1(key);
},
 _set$2: function(key, value) {
  $.indexSet(this._propertyValues, key, value);
  this._changeHandle.fireEvent$1(key);
}
};

$$.Property = {"":
 ["defaultValue", "name"],
 super: "Attachable",
 toString$0: function() {
  return 'Property \'' + $.S(this.name) + '\'';
},
 clear$1: function(obj) {
  obj.get$propertyValues()._remove$1(this);
},
 set$2: function(obj, value) {
  obj.get$propertyValues()._set$2(this, value);
},
 get$set: function() { return new $.BoundClosure3(this, 'set$2'); },
 getCore$2: function(obj, ifAbsent) {
  return obj.get$propertyValues()._getValueOrUndefined$3(this, obj, ifAbsent);
},
 get$2: function(obj, ifAbsent) {
  var coreValue = this.getCore$2(obj, ifAbsent);
  if (!(coreValue === $.CTC6))
    return coreValue;
  else
    return this.defaultValue;
},
 get$1: function(obj) {
  return this.get$2(obj,null)
}
};

$$._UndefinedValue = {"":
 [],
 super: "Object"
};

$$.AttachedEvent = {"":
 ["name"],
 super: "Attachable",
 fireEvent$2: function(obj, args) {
  $._AttachableEventHelper_fireEvent(obj, this, args);
},
 addHandler$2: function(obj, handler) {
  return $._AttachableEventHelper_addHandler(obj, this, handler);
}
};

$$._AttachableEventHelper = {"":
 ["_propertyChangeHandleId", "_handlers?"],
 super: "Object"
};

$$.GameRoot = {"":
 ["_setIntervalId", "_updatedEventId", "_frameRequested", "_clockDiv", "_gameStateDiv", "_leftCountDiv", "_clickMan", "_gameElement", "_lib1_canvas?", "_lib1_stage"],
 super: "Object",
 _stageInvalidated$1: function(args) {
  this._requestFrame$0();
},
 get$_stageInvalidated: function() { return new $.BoundClosure0(this, '_stageInvalidated$1'); },
 _gameUpdated$1: function(args) {
  this._requestFrame$0();
},
 get$_gameUpdated: function() { return new $.BoundClosure0(this, '_gameUpdated$1'); },
 _click$3: function(x, y, alt) {
  var ss = this.get$game().getSquareState$2(x, y);
  if (alt === true) {
    if ($.eqB(ss, $.CTC12))
      this.get$game().setFlag$3(x, y, true);
    else if ($.eqB(ss, $.CTC13))
      this.get$game().setFlag$3(x, y, false);
    else if ($.eqB(ss, $.CTC14))
      this.get$game().reveal$2(x, y);
  } else if ($.eqB(ss, $.CTC12))
    this.get$game().reveal$2(x, y);
},
 _updateClock$0: function() {
  var t1 = this.get$game().get$duration() == null;
  var t2 = this._clockDiv;
  if (t1)
    t2.set$innerHTML('');
  else
    t2.set$innerHTML($.toString(this.get$game().get$duration().get$inSeconds()));
  if (this._setIntervalId == null && $.eqB(this.get$game().get$state(), $.CTC26))
    this._setIntervalId = $.window().setInterval$2(this.get$_updateClock(), 1000);
  else if (!(this._setIntervalId == null) && !$.eqB(this.get$game().get$state(), $.CTC26)) {
    $.window().clearInterval$1(this._setIntervalId);
    this._setIntervalId = null;
  }
},
 get$_updateClock: function() { return new $.BoundClosure(this, '_updateClock$0'); },
 _onFrame$1: function(time) {
  this._updateClock$0();
  var t1 = this.get$game().get$state().get$name();
  this._gameStateDiv.set$innerHTML(t1);
  t1 = $.toString(this.get$game().get$minesLeft());
  this._leftCountDiv.set$innerHTML(t1);
  this._lib1_stage.draw$0();
  this._frameRequested = false;
},
 get$_onFrame: function() { return new $.BoundClosure0(this, '_onFrame$1'); },
 _requestFrame$0: function() {
  if (this._frameRequested !== true) {
    this._frameRequested = true;
    $.window().requestAnimationFrame$1(this.get$_onFrame());
  }
},
 newGame$0: function() {
  if (!(this._updatedEventId == null))
    this.get$game().get$updated().remove$1(this._updatedEventId);
  this.set$game($.Game$($.Field_Field(40, 16, 16, null)));
  this._updatedEventId = $.add$1(this.get$game().get$updated(), this.get$_gameUpdated());
  this._requestFrame$0();
},
 set$game: function(value) {
  this._gameElement.set$game(value);
},
 get$game: function() {
  return this._gameElement.get$game();
},
 GameRoot$_internal$7: function(_canvas, _stage, _gameElement, _clickMan, _leftCountDiv, _gameStateDiv, _clockDiv) {
  $.add$1(this._lib1_stage.get$invalidated(), this.get$_stageInvalidated());
  this.newGame$0();
  this._requestFrame$0();
}
};

$$.GameElement = {"":
 ["_elements", "_game?", "_lib3_parent", "clip", "_lastDrawSize", "_alpha", "_height", "_width", "_cacheCanvas", "_invalidatedEventHandle", "_updatedEventHandle", "cacheEnabled", "_transforms", "propertyValues", "_disposed"],
 super: "ElementParentImpl",
 get$_elementsNeedUpdate: function() {
  var t1 = this._elements;
  return t1 == null || !$.eqB(t1.get$width(), this._game.get$field().get$width()) || !$.eqB(this._elements.get$height(), this._game.get$field().get$height());
},
 _click$3: function(x, y, alt) {
  var ss = this.get$game().getSquareState$2(x, y);
  if (alt === true) {
    if ($.eqB(ss, $.CTC12))
      this.get$game().setFlag$3(x, y, true);
    else if ($.eqB(ss, $.CTC13))
      this.get$game().setFlag$3(x, y, false);
    else if ($.eqB(ss, $.CTC14))
      this.get$game().reveal$2(x, y);
  } else if ($.eqB(ss, $.CTC12))
    this.get$game().reveal$2(x, y);
},
 _squareClicked$1: function(args) {
  if (this._game.get$gameEnded() !== true) {
    var se = args.get$element();
    this._click$3(se.get$x(), se.get$y(), args.get$shiftKey());
  }
},
 get$_squareClicked: function() { return new $.BoundClosure0(this, '_squareClicked$1'); },
 _updateElements$0: function() {
  if (this._game == null)
    this._elements = null;
  else if (this.get$_elementsNeedUpdate() === true) {
    var t1 = $.Array2d_Array2d(this._game.get$field().get$width(), this._game.get$field().get$height(), null);
    $.setRuntimeTypeInfo(t1, {T: 'SquareElement'});
    this._elements = t1;
    for (var i = 0; $.ltB(i, $.get$length(this._elements)); ++i) {
      var coords = this._elements.getCoordinate$1(i);
      var se = $.SquareElement$(33, coords.get$Item1(), coords.get$Item2());
      se.registerParent$1(this);
      $.ClickManager_addHandler(se, this.get$_squareClicked());
      se.addTransform$0().setToTranslation$2($.mul(coords.get$Item1(), 33), $.mul(coords.get$Item2(), 33));
      $.indexSet(this._elements, i, se);
    }
  }
},
 drawOverride$1: function(ctx) {
  this._updateElements$0();
  $.ElementParentImpl.prototype.drawOverride$1.call(this, ctx);
},
 getVisualChild$1: function(index) {
  var t1 = this._elements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.getVisualChild$1$bailout(1, t1, index);
  if (index !== (index | 0))
    throw $.iae(index);
  var t3 = t1.length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  return t1[index];
},
 getVisualChild$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
},
 get$visualChildCount: function() {
  var t1 = this._elements;
  if (t1 == null)
    return 0;
  else
    return $.get$length(t1);
},
 set$game: function(value) {
  this._game = value;
  this.invalidateDraw$0();
},
 get$game: function() {
  return this._game;
}
};

$$.SquareElement = {"":
 ["y?", "x?", "_lib3_parent", "clip", "_lastDrawSize", "_alpha", "_height", "_width", "_cacheCanvas", "_invalidatedEventHandle", "_updatedEventHandle", "cacheEnabled", "_transforms", "propertyValues", "_disposed"],
 super: "PElement",
 get$_fillStyle: function() {
  switch (this.get$_squareState()) {
    case $.CTC13:
      return 'orange';
    case $.CTC14:
      return 'white';
    case $.CTC16:
      return 'red';
    case $.CTC17:
      return 'green';
    case $.CTC12:
      return '#6666CC';
    default:
      throw $.captureStackTrace('not supported');
  }
},
 get$_game: function() {
  return this.get$parent().get$game();
},
 get$_adjacentCount: function() {
  return this.get$_game().get$field().getAdjacentCount$2(this.x, this.y);
},
 get$_squareState: function() {
  return this.get$_game().getSquareState$2(this.x, this.y);
},
 toString$0: function() {
  return 'Square at [' + $.S(this.x) + ', ' + $.S(this.y) + ']';
},
 drawOverride$1: function(ctx) {
  ctx.set$fillStyle(this.get$_fillStyle());
  ctx.fillRect$4(0, 0, this.get$width(), this.get$height());
  ctx.set$strokeStyle('rgba(153, 153, 153, 0.5)');
  ctx.strokeRect$5(0, 0, this.get$width(), this.get$height(), 1);
  if ($.eqB(this.get$_squareState(), $.CTC14)) {
    var adjCount = this.get$_adjacentCount();
    if ($.gtB(adjCount, 0)) {
      ctx.set$font('15px Helvetica');
      ctx.set$fillStyle('black');
      ctx.set$textAlign('center');
      ctx.fillText$4($.toString(adjCount), $.div(this.get$width(), 2), 20, 30);
    }
  }
},
 SquareElement$3: function(size, x, y) {
  $.ClickManager_setClickable(this, true);
}
};

$$.PElement = {"":
 [],
 super: "AttachableObjectImpl",
 _invalidateParent$0: function() {
  this._invalidatedEventHandle.fireEvent$1($.CTC22);
  this._lib3_parent.childInvalidated$1(this);
},
 _isClipped$2: function(tx, ctx) {
  if (this.clip === true)
    ;
  return false;
},
 _drawNormal$1: function(ctx) {
  var tx = this.getTransform$0();
  if (this._isClipped$2(tx, ctx) === true)
    return;
  ctx.save$0();
  $.CanvasUtil_transform(ctx, tx);
  if (this.clip === true) {
    ctx.beginPath$0();
    ctx.rect$4(0, 0, this.get$width(), this.get$height());
    ctx.clip$0();
  }
  this.drawCore$1(ctx);
  ctx.restore$0();
},
 _drawCached$1: function(ctx) {
  var t1 = this._cacheCanvas;
  if (t1 == null || !$.eqB($.CanvasUtil_getCanvasSize(t1), this._lastDrawSize)) {
    if (this._cacheCanvas == null)
      this._cacheCanvas = $._Elements_CanvasElement(null, null);
    t1 = this.get$width();
    this._cacheCanvas.set$width(t1);
    t1 = this.get$height();
    this._cacheCanvas.set$height(t1);
    this.drawCore$1(this._cacheCanvas.get$context2d());
  }
  ctx.save$0();
  $.CanvasUtil_transform(ctx, this.getTransform$0());
  ctx.drawImage$3(this._cacheCanvas, 0, 0);
  ctx.restore$0();
},
 drawInternal$1: function(ctx) {
  if (this.cacheEnabled === true)
    this._drawCached$1(ctx);
  else
    this._drawNormal$1(ctx);
},
 registerParent$1: function(parent$) {
  this._lib3_parent = parent$;
},
 getVisualChild$1: function(index) {
  throw $.captureStackTrace('no children for this type');
},
 invalidateDraw$0: function() {
  if (!(this._lastDrawSize == null)) {
    this._lastDrawSize = null;
    this._invalidateParent$0();
  }
},
 drawCore$1: function(ctx) {
  var t1 = this._alpha;
  if (!(t1 == null))
    ctx.set$globalAlpha(t1);
  this.drawOverride$1(ctx);
  this._lastDrawSize = this.get$size();
},
 addTransform$0: function() {
  var tx = $.AffineTransform$(1, 0, 0, 1, 0, 0);
  this._transforms.push(tx);
  return tx;
},
 update$0: function() {
  this._updatedEventHandle.fireEvent$1($.CTC22);
},
 draw$1: function(ctx) {
  this.update$0();
  var dirty = this._lastDrawSize == null;
  this.drawInternal$1(ctx);
  return dirty;
},
 getTransform$0: function() {
  var tx = $.AffineTransform$(1, 0, 0, 1, 0, 0);
  $.forEach(this._transforms, tx.get$concatenate());
  return tx;
},
 get$invalidated: function() {
  return this._invalidatedEventHandle;
},
 get$updated: function() {
  return this._updatedEventHandle;
},
 get$parent: function() {
  return this._lib3_parent;
},
 get$visualChildCount: function() {
  return 0;
},
 get$size: function() {
  return $.Size$(this._width, this._height);
},
 get$height: function() {
  return this._height;
},
 get$width: function() {
  return this._width;
},
 clip$0: function() { return this.clip.call$0(); }
};

$$.ElementParentImpl = {"":
 [],
 super: "PElement",
 _forEach$1: function(f) {
  var length$ = this.get$visualChildCount();
  if (typeof length$ !== 'number')
    return this._forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i)
    f.call$1(this.getVisualChild$1(i));
},
 _forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i)
    f.call$1(this.getVisualChild$1(i));
},
 drawOverride$1: function(ctx) {
  this._forEach$1(new $.ElementParentImpl_drawOverride_anon(ctx));
},
 update$0: function() {
  this._forEach$1(new $.ElementParentImpl_update_anon());
  $.PElement.prototype.update$0.call(this);
},
 childInvalidated$1: function(child) {
  this.invalidateDraw$0();
}
};

$$.Stage = {"":
 ["_ctx", "_invalidatedEventHandle", "_element?", "_canvas?", "propertyValues", "_disposed"],
 super: "AttachableObjectImpl",
 childInvalidated$1: function(child) {
  this._invalidatedEventHandle.fireEvent$1($.CTC22);
},
 draw$0: function() {
  var t1 = this._ctx;
  var t2 = t1 == null;
  var t3 = this._canvas;
  if (t2)
    this._ctx = t3.get$context2d();
  else
    t1.clearRect$4(0, 0, t3.get$width(), t3.get$height());
  return this._element.draw$1(this._ctx);
},
 get$rootElement: function() {
  return this._element;
},
 get$invalidated: function() {
  return this._invalidatedEventHandle;
},
 Stage$2: function(_canvas, _element) {
  this._element.registerParent$1(this);
}
};

$$.ClickManager = {"":
 ["_mouseDownElement", "_stage"],
 super: "Object",
 _doClick$2: function(element, e) {
  $.CTC10.fireEvent$2(element, $.ElementMouseEventArgs_ElementMouseEventArgs(element, e));
},
 _updateMouseLocation$1: function(value) {
  return $.Mouse_markMouseOver(this._stage, value);
},
 _mouseDown$1: function(e) {
  this._mouseDownElement = $.$$(this._updateMouseLocation$1($.getMouseEventCoordinate(e))).firstOrDefault$1(new $.ClickManager__mouseDown_anon());
},
 get$_mouseDown: function() { return new $.BoundClosure0(this, '_mouseDown$1'); },
 _mouseUp$1: function(e) {
  if (!(this._mouseDownElement == null)) {
    var upElement = $.$$(this._updateMouseLocation$1($.getMouseEventCoordinate(e))).firstOrDefault$1(new $.ClickManager__mouseUp_anon());
    if ($.eqB(upElement, this._mouseDownElement))
      this._doClick$2(upElement, e);
    this._mouseDownElement = null;
  }
},
 get$_mouseUp: function() { return new $.BoundClosure0(this, '_mouseUp$1'); },
 _mouseOut$1: function(e) {
  this._updateMouseLocation$1(null);
},
 get$_mouseOut: function() { return new $.BoundClosure0(this, '_mouseOut$1'); },
 _mouseMove$1: function(e) {
  this._updateMouseLocation$1($.getMouseEventCoordinate(e));
},
 get$_mouseMove: function() { return new $.BoundClosure0(this, '_mouseMove$1'); },
 ClickManager$1: function(_stage) {
  var t1 = this._stage;
  $.add$1(t1.get$_canvas().get$on().get$mouseMove(), this.get$_mouseMove());
  $.add$1(t1.get$_canvas().get$on().get$mouseOut(), this.get$_mouseOut());
  $.add$1(t1.get$_canvas().get$on().get$mouseUp(), this.get$_mouseUp());
  $.add$1(t1.get$_canvas().get$on().get$mouseDown(), this.get$_mouseDown());
}
};

$$.ElementMouseEventArgs = {"":
 ["shiftKey?", "element?"],
 super: "EventArgs"
};

$$.main_anon = {"":
 ["gameRoot_0"],
 super: "Closure",
 call$1: function(args) {
  return this.gameRoot_0.newGame$0();
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 call$0: function() {
  return this.closure_0.call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 call$0: function() {
  return this.closure_2.call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 call$0: function() {
  return this.closure_5.call$2(this.arg1_4, this.arg2_3);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.ClickManager__mouseDown_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return $.CTC8.get$1(e);
}
};

$$.Mouse_markMouseOver_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  $.CTC7.clear$1(e);
  $.CTC4.clear$1(e);
}
};

$$.Mouse_markMouseOver_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  $.CTC7.set$2(e, true);
}
};

$$.Enumerable_firstOrDefault_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return true;
}
};

$$.ClickManager__mouseUp_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return $.CTC8.get$1(e);
}
};

$$.ElementParentImpl_drawOverride_anon = {"":
 ["ctx_0"],
 super: "Closure",
 call$1: function(e) {
  return e.drawInternal$1(this.ctx_0);
}
};

$$._AttachableEventHelper_addHandler_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  return $.EventHandle$();
}
};

$$._AttachableEventHelper_createInstance_anon = {"":
 ["obj_0"],
 super: "Closure",
 call$1: function(property) {
  $._AttachableEventHelper_fireEvent(this.obj_0, property, property);
}
};

$$.EventHandle_fireEvent_anon = {"":
 ["args_0"],
 super: "Closure",
 call$2: function(id, handler) {
  handler.call$1(this.args_0);
}
};

$$.ListBase_iterator_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(i) {
  return $.index(this.this_0, i);
}
};

$$._ElementImpl_rect_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  return $._ElementRectImpl$(this.this_0);
}
};

$$._maybeScheduleMeasurementFrame_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return $._completeMeasurementFutures();
}
};

$$._DocumentFragmentImpl_rect_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  return $.CTC21;
}
};

$$.ElementParentImpl_update_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return e.update$0();
}
};

$$.Enumerable_first_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return true;
}
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
}
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 super: "Closure",
 call$1: function(element) {
  if (this.f_1.call$1(element) === true)
    $.add$1(this.output_0, element);
}
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 super: "Closure",
 call$1: function(el) {
  return el.remove$0();
}
};

$$.DurationImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 100))
    return $.S(n);
  if ($.gtB(n, 10))
    return '0' + $.S(n);
  return '00' + $.S(n);
}
};

$$.DurationImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 10))
    return $.S(n);
  return '0' + $.S(n);
}
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  var absN = $.abs(n);
  var sign = $.ltB(n, 0) ? '-' : '';
  if ($.geB(absN, 1000))
    return $.S(n);
  if ($.geB(absN, 100))
    return sign + '0' + $.S(absN);
  if ($.geB(absN, 10))
    return sign + '00' + $.S(absN);
  return sign + '000' + $.S(absN);
}
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 100))
    return $.S(n);
  if ($.geB(n, 10))
    return '0' + $.S(n);
  return '00' + $.S(n);
}
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 10))
    return $.S(n);
  return '0' + $.S(n);
}
};

$$.HashSetImplementation_addAll__ = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(value) {
  this.this_0.add$1(value);
}
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.f_0.call$1(key);
}
};

$$.HashSetImplementation_filter__ = {"":
 ["f_1", "result_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.f_1.call$1(key) === true)
    $.add$1(this.result_0, key);
}
};

$$.startRootIsolate_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  return $._setTimerFactoryClosure($._timerFactory);
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(entry) {
  this.f_0.call$2(entry.get$key(), entry.get$value());
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1.close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2.completeException$1(value);
  else
    t2.complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["this_2", "message_1", "replyTo_0"],
 super: "Closure",
 call$0: function() {
  this.this_2._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_2, 'msg', this.message_1, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true)
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState().get$managers(), this.this_2.get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(_) {
  return this.callback_0.call$0();
}
};

$$.Futures_wait_anon = {"":
 ["completer_5", "pos_4", "box_0", "result_3", "values_2"],
 super: "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_3.get$isComplete() !== true)
    this.completer_5.complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["future_8", "completer_7", "result_6"],
 super: "Closure",
 call$1: function(exception) {
  if (this.result_6.get$isComplete() !== true)
    this.completer_7.completeException$2(exception, this.future_8.get$stackTrace());
  return true;
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.NoneHashMap_getValues_anon = {"":
 [],
 super: "Closure",
 call$1: function(t) {
  return t.get$Item2();
}
};

$$.Enumerable_select_anon = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(s) {
  return $._SelectIterator$(s, this.f_0);
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["this_5", "message_4", "replyTo_3"],
 super: "Closure",
 call$0: function() {
  var t1 = {};
  this.this_5._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_5.get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_5.get$_receivePort().get$_callback() == null)
    return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_5.get$_isolateId());
  t1.msg_1 = this.message_4;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_5, t1, shouldSerialize), 'receive ' + $.S(this.message_4));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._callback$2(t2.msg_1, t2.reply_2);
  }
}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
}
};

$$.NoneHashMap_getKeys_anon = {"":
 [],
 super: "Closure",
 call$1: function(t) {
  return t.get$Item1();
}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, key);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  if (this.this_0.runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
},
 is$Function: true
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); },
 call$0: function() {
  return this.call$1(null)
}
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); }
};
$$.BoundClosure3 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a / b;
  return a.operator$div$1(b);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.getMouseEventCoordinate = function(event$) {
  var element = event$.get$currentTarget();
  return $.Coordinate$(event$.get$clientX(), event$.get$clientY()).operator$sub$1($.getElementCoordinate(element));
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length))
    return false;
  return other == receiver.substring(0, length$);
};

$.getRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$._DOMWindowCrossFrameImpl__postMessage3 = function(win, message, targetOrigin, messagePorts) {
    win.postMessage(message, targetOrigin, messagePorts);

};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number')
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if (end > a.length)
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.IndexIterator$ = function(length$, indexer) {
  var t1 = new $.IndexIterator(0, length$, indexer);
  t1.IndexIterator$2(length$, indexer);
  return t1;
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.remainder = function(a, b) {
  if ($.checkNumbers(a, b))
    return a % b;
  else
    return a.remainder$1(b);
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.Size$ = function(width, height) {
  return new $.Size(height, width);
};

$._DOMWindowCrossFrameImpl__close = function(win) {
win.close()
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC32)[name$];
  if (!(dartMethod == null))
    methods['Object'] = dartMethod;
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, {E: 'E'});
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true;)
    result.push(iterator.next$0());
  return result;
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, false);
  t1._Timer$repeating$2(milliSeconds, callback);
  return t1;
};

$.max = function(a, b) {
  if (typeof b === 'number') {
    if (a > b)
      return a;
    if (a < b)
      return b;
    if (typeof b === 'number') {
      if (typeof a === 'number')
        if (a === 0.0)
          return a + b;
      if ($.isNaN(b) === true)
        return b;
      return a;
    }
    if (b === 0 && $.isNegative(a) === true)
      return b;
    return a;
  }
  throw $.captureStackTrace($.IllegalArgumentException$(b));
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC1;
  var jsError = new Error();
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$.ElementMouseEventArgs$_internal = function(element, shiftKey) {
  return new $.ElementMouseEventArgs(shiftKey, element);
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return Math.floor(receiver);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    a = a;
    b = b;
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains$1(userAgent, $.CTC31) === true)
    return $.typeNameInChrome;
  else if ($.contains$1(userAgent, 'Firefox') === true)
    return $.typeNameInFirefox;
  else if ($.contains$1(userAgent, 'MSIE') === true)
    return $.typeNameInIE;
  else if ($.contains$1(userAgent, 'Opera') === true)
    return $.typeNameInOpera;
  else if ($.contains$1(userAgent, 'Safari') === true)
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = receiver.length;
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + receiver.charCodeAt(i);
    var hash1 = 536870911 & hash0 + 524287 & hash0 << 10;
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + 67108863 & hash << 3;
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + 16383 & hash0 << 15;
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$._setTimerFactoryClosure = function(closure) {
  $._TimerFactory__factory = closure;
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$._SimpleEnumerable$ = function(_source) {
  return new $._SimpleEnumerable(_source);
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number'))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.removeRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.removeRange$2(start, length$);
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0))
    return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var receiverLength = receiver.length;
  if (start < 0 || start >= receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if (t1 > receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  var t2 = receiverLength - length$;
  $.Arrays_copy(receiver, t1, receiver, start, t2 - start);
  $.set$length(receiver, t2);
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$.isValidNumber = function(value) {
  return !(value == null) && $.isInfinite(value) !== true && $.isNaN(value) !== true;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.neg = function(a) {
  if (typeof a === "number")
    return -a;
  return a.operator$negate$0();
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, true);
  t1._Timer$2(milliSeconds, callback);
  return t1;
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = methods[entry.get$tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return isNaN(receiver);
  else
    return receiver.isNaN$0();
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.pattern;
  var multiLine = regExp.multiLine;
  var ignoreCase = regExp.ignoreCase;
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global)
    $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, String(e)));
  }

};

$.main = function() {
  var gameRoot = $.GameRoot_GameRoot($.query('#sweeperCanvas'), $.query('#minesLeft'), $.query('#gameState'), $.query('#clock'));
  $.add$1($.query('#newGame').get$on().get$click(), new $.main_anon(gameRoot));
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.toInt$0();
  if ($.isNaN(receiver) === true)
    throw $.captureStackTrace($.FormatException$('NaN'));
  if ($.isInfinite(receiver) === true)
    throw $.captureStackTrace($.FormatException$('Infinity'));
  var truncated = $.truncate(receiver);
  return truncated == -0.0 ? 0 : truncated;
};

$.PropertyValues$ = function() {
  var t1 = $.NoneHashMap$();
  var t2 = $.EventHandle$();
  $.setRuntimeTypeInfo(t2, {T: 'Property'});
  return new $.PropertyValues(t2, t1, false);
};

$.Primitives_getYear = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCFullYear() : $.Primitives_lazyAsJsDate(receiver).getFullYear();
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.Primitives_getHours = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCHours() : $.Primitives_lazyAsJsDate(receiver).getHours();
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.GlobalId$_internal = function(value) {
  return new $.GlobalId($.Util_getHashCode([value]), value);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  else if ($.eqB(numberOfArguments, 1))
    return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  else if ($.eqB(numberOfArguments, 2))
    return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.Field_Field = function(mineCount, cols, rows, seed) {
  var squares = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(squares, {E: 'bool'});
  $.insertRange$3(squares, 0, rows * cols, false);
  var rnd = $.Random_Random(seed);
  for (var i = 0; i < mineCount; ++i) {
    var index = null;
    do {
      index = rnd.nextInt$1(squares.length);
      if (index !== (index | 0))
        throw $.iae(index);
      var t1 = squares.length;
      if (index < 0 || index >= t1)
        throw $.ioore(index);
    } while (squares[index] === true);
    squares[index] = true;
  }
  t1 = $.ReadOnlyCollection$(squares);
  $.setRuntimeTypeInfo(t1, {T: 'bool'});
  return $.Field$_internal(mineCount, cols, t1);
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.addLast = function(receiver, value) {
  if (!$.isJsArray(receiver))
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.SquareElement$ = function(size, x, y) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'AffineTransform'});
  var t2 = $.EventHandle$();
  $.setRuntimeTypeInfo(t2, {T: 'EventArgs'});
  var t3 = $.EventHandle$();
  $.setRuntimeTypeInfo(t3, {T: 'EventArgs'});
  t1 = new $.SquareElement(y, x, null, false, null, null, size, size, null, t3, t2, false, t1, $.PropertyValues$(), false);
  t1.SquareElement$3(size, x, y);
  return t1;
};

$._ElementRectImpl$ = function(element) {
  var t1 = $._SimpleClientRect$(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight());
  var t2 = $._SimpleClientRect$(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight());
  var t3 = $._SimpleClientRect$(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight());
  var t4 = element.$dom_getBoundingClientRect$0();
  return new $._ElementRectImpl(element.$dom_getClientRects$0(), t4, t3, t2, t1);
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.Array2d$wrap = function(width, source) {
  var t1 = !(width == null) && $.gtB(width, 0) && !(source == null) ? $.tdiv($.get$length(source), width) : 0;
  t1 = new $.Array2d(source, t1, width);
  t1.Array2d$wrap$2(width, source);
  return t1;
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.getElementCoordinate = function(element) {
  var cr = element.$dom_getBoundingClientRect$0();
  return $.Coordinate$($.toInt(cr.get$left()), $.toInt(cr.get$top()));
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.ClickManager_setClickable = function(element, value) {
  if (value)
    $.CTC8.set$2(element, true);
  else
    $.CTC8.clear$1(element);
};

$.Primitives_getMilliseconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds() : $.Primitives_lazyAsJsDate(receiver).getMilliseconds();
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$._SelectIterator$ = function(_source, _func) {
  return new $._SelectIterator(_func, _source);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch, isUtc) {
  var t1 = new $.DateImplementation(isUtc, millisecondsSinceEpoch);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b)) {
    var result = a % b;
    if (result === 0)
      return 0;
    if (result > 0)
      return result;
    b = b;
    if (b < 0)
      return result - b;
    else
      return result + b;
  }
  return a.operator$mod$1(b);
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document'))
    return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument'))
    return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent'))
    return 'MessageEvent';
  return name$;
};

$._DOMWindowCrossFrameImpl$ = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.RetainedUtil_transformPointGlobalToLocal = function(element, point) {
  return element.getTransform$0().createInverse$0().transformCoordinate$1(point);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._maybeScheduleMeasurementFrame = function() {
  if ($._nextMeasurementFrameScheduled === true)
    return;
  $._nextMeasurementFrameScheduled = true;
  if ($._firstMeasurementRequest === true) {
    $.add$1($.window().get$on().get$message(), new $._maybeScheduleMeasurementFrame_anon());
    $._firstMeasurementRequest = false;
  }
  $.window().postMessage$2('DART-MEASURE', '*');
};

$.AffineTransform$ = function(scaleX, shearY, shearX, scaleY, translateX, translateY) {
  return new $.AffineTransform(translateY, translateX, scaleY, shearX, shearY, scaleX);
};

$.RetainedUtil_hitTest = function(stage, point) {
  return $.RetainedUtil__hitTest(stage.get$rootElement(), point);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'CanvasPixelArray'))
    return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLDDElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'HTMLDTElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'HTMLTableDataCellElement'))
    return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement'))
    return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLPhraseElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'MSStyleCSSProperties'))
    return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'MouseWheelEvent'))
    return 'WheelEvent';
  return name$;
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b);
};

$._globalState = function() {
return $globalState;
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.require = function(truth, message) {
  if (truth !== true)
    throw $.captureStackTrace($.ExceptionImplementation$(message));
};

$.window = function() {
return window;
};

$._globalState0 = function(val) {
$globalState = val;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMinutes() : $.Primitives_lazyAsJsDate(receiver).getMinutes();
};

$.Primitives_lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0))
    receiver.date = new Date(receiver.millisecondsSinceEpoch);
  return receiver.date;
};

$.Primitives_getDay = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCDate() : $.Primitives_lazyAsJsDate(receiver).getDate();
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.DetailedIllegalArgumentException$ = function(arg, message) {
  return new $.DetailedIllegalArgumentException(message, arg, '');
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.Coordinate$ = function(x, y) {
  return new $.Coordinate(y, x);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._createMeasurementFuture = function(computeValue, completer) {
  if ($._pendingRequests == null) {
    $._pendingRequests = [];
    $._maybeScheduleMeasurementFrame();
  }
  $.add$1($._pendingRequests, $._MeasurementRequest$(computeValue, completer));
  return completer.get$future();
};

$.Tuple$ = function(Item1, Item2) {
  return new $.Tuple(Item2, Item1);
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.isInfinite$0();
  return receiver == Infinity || receiver == -Infinity;
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.addAll = function(receiver, collection) {
  if (!$.isJsArray(receiver))
    return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true;)
    $.add$1(receiver, iterator.next$0());
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$.GameRoot_GameRoot = function(canvasElement, leftCountDiv, gameStateDiv, clockDiv) {
  var rootElement = $.GameElement$(540, 540);
  var stage = $.Stage$(canvasElement, rootElement);
  return $.GameRoot$_internal(canvasElement, stage, rootElement, $.ClickManager$(stage), leftCountDiv, gameStateDiv, clockDiv);
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.typeNameInChrome = function(obj) {
  var name$ = obj.constructor.name;
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$._document = function() {
return document;
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      t1 = array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.listInsertRange = function(receiver, start, length$, initialValue) {
  if (typeof receiver !== 'object' || receiver === null || (receiver.constructor !== Array || !!receiver.immutable$list) && !receiver.is$JavaScriptIndexingBehavior())
    return $.listInsertRange$bailout(1, receiver, start, length$, initialValue);
  if (length$ === 0)
    return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  var receiverLength = receiver.length;
  if (start < 0 || start > receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = receiverLength + length$;
  $.set$length(receiver, t1);
  var t2 = start + length$;
  $.Arrays_copy(receiver, start, receiver, t2, receiverLength - start);
  if (!(initialValue == null))
    for (var i = start; i < t2; ++i) {
      var t3 = receiver.length;
      if (i < 0 || i >= t3)
        throw $.ioore(i);
      receiver[i] = initialValue;
    }
  $.set$length(receiver, t1);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))
    return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, {E: 'String'});
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))
      return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1)
        throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$._DOMWindowCrossFrameImpl__top = function(win) {
return win.top;
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.Array2d_Array2d = function(width, height, initialValue) {
  $.requireArgumentNotNull(width, 'width');
  $.requireArgumentNotNull(height, 'height');
  $.requireArgument($.gt(width, 0), 'width', null);
  $.requireArgument($.gt(height, 0), 'height', null);
  var s = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(s, {E: 'T'});
  $.insertRange$3(s, 0, $.mul(width, height), initialValue);
  return $.Array2d$wrap(width, s);
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof(name$) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object') && !(name$ === 'Function.prototype'))
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return $.substring$2(string, 8, string.length - 1);
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$.GameElement$ = function(width, height) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'AffineTransform'});
  var t2 = $.EventHandle$();
  $.setRuntimeTypeInfo(t2, {T: 'EventArgs'});
  var t3 = $.EventHandle$();
  $.setRuntimeTypeInfo(t3, {T: 'EventArgs'});
  return new $.GameElement(null, null, null, false, null, null, height, width, null, t3, t2, false, t1, $.PropertyValues$(), false);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      $.add$1(destination, t2);
  }
  return destination;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex)
    return ex.dartException;
  var message = ex.message;
  if (ex instanceof TypeError) {
    var type = ex.type;
    var name$ = ex.arguments ? ex.arguments[0] : "";
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC0);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC0);
      else if ($.contains$1(message, ' is not a function') === true)
        return $.NoSuchMethodException$('', '<unknown>', [], null);
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError)
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.Vector$ = function(x, y) {
  return new $.Vector(y, x);
};

$.GlobalId_GlobalId = function() {
  var t1 = $.GlobalId__globalId;
  $.GlobalId__globalId = $.add(t1, 1);
  return $.GlobalId$_internal(t1);
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      $.add$1(destination, t2);
  }
  return destination;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(null, t1);
  t1._ReceivePortImpl$0();
  return t1;
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$._WhereIterator$ = function(_source, _func) {
  return new $._WhereIterator(null, null, _func, _source);
};

$.$$ = function(source) {
  if (typeof source === 'object' && source !== null && !!source.is$Enumerable)
    return source;
  else
    return $.Enumerable_Enumerable(source);
};

$.EventHandle$ = function() {
  return new $.EventHandle(null, false);
};

$._SimpleClientRect$ = function(left, top$, width, height) {
  return new $._SimpleClientRect(height, width, top$, left);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true)
    return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  if (!($._window() == null))
    rootContext.eval$1(new $.startRootIsolate_anon());
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._ElementFactoryProvider_Element$tag = function(tag) {
return document.createElement(tag)
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string')
    return receiver.split(pattern);
  else if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp)
    return receiver.split($.regExpGetNative(pattern));
  else
    throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.NoneHashMap$ = function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'Tuple<K, V>'});
  return new $.NoneHashMap(t1);
};

$.requireArgumentNotNull = function(argument, argName) {
  if (argument == null)
    throw $.captureStackTrace($.NullArgumentException$(argName));
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: '_IsolateEvent'});
  return new $._EventLoop(t1);
};

$.Field$_internal = function(mineCount, cols, source) {
  var t1 = $.Array2d_Array2d(cols, $.tdiv($.get$length(source), cols), null);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  var t2 = !(cols == null) && $.gtB(cols, 0) && !(source == null) ? $.tdiv($.get$length(source), cols) : 0;
  t2 = new $.Field(t1, mineCount, source, t2, cols);
  t2.Array2d$wrap$2(cols, source);
  t2.Field$_internal$3(mineCount, cols, source);
  return t2;
};

$.Stage$ = function(_canvas, _element) {
  var t1 = $.EventHandle$();
  $.setRuntimeTypeInfo(t1, {T: 'EventArgs'});
  t1 = new $.Stage(null, t1, _element, _canvas, $.PropertyValues$(), false);
  t1.Stage$2(_canvas, _element);
  return t1;
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$._FuncEnumerable$ = function(_source, _func) {
  return new $._FuncEnumerable(_func, _source);
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'CanvasPixelArray'))
    return 'Uint8ClampedArray';
  if ($.eqB(name$, 'WebKitMutationObserver'))
    return 'MutationObserver';
  return name$;
};

$.Random_Random = function(seed) {
  return $.CTC27;
};

$.regExpExec = function(regExp, str) {
  var result = $.regExpGetNative(regExp).exec(str);
  if (result === null)
    return;
  return result;
};

$._AttachableEventHelper$ = function(_propertyChangeHandleId) {
  return new $._AttachableEventHelper(_propertyChangeHandleId, $.NoneHashMap$());
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength))
    return false;
  if (typeof otherLength !== 'number')
    throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.contains$2 = function(receiver, other, startIndex) {
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.Primitives_getMonth = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMonth() + 1 : $.Primitives_lazyAsJsDate(receiver).getMonth() + 1;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, {E: 'Match'});
  var length$ = $.get$length(haystack);
  var patternLength = needle.length;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.Primitives_getSeconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCSeconds() : $.Primitives_lazyAsJsDate(receiver).getSeconds();
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number')
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  else
    return receiver.isNegative$0();
};

$.Util_getHashCode = function(source) {
  for (var t1 = $.iterator(source), hash = 0; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var next = t2 == null ? 0 : $.hashCode(t2);
    if (typeof next !== 'number')
      throw $.iae(next);
    var hash0 = 536870911 & hash + next;
    var hash1 = 536870911 & hash0 + ((524287 & hash0) << 10 >>> 0);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + ((67108863 & hash) << 3 >>> 0);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + ((16383 & hash0) << 15 >>> 0);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$._AttachableEventHelper_createInstance = function(obj) {
  return $._AttachableEventHelper$($.add$1(obj.get$propertyValues().get$propertyChanged(), new $._AttachableEventHelper_createInstance_anon(obj)));
};

$.Mouse_markMouseOver = function(stage, coordinate) {
  $.requireArgumentNotNull(stage, 'stage');
  var t1 = !(coordinate == null);
  $.requireArgument(coordinate == null || coordinate.get$isValid() === true, 'coordinate', null);
  var items = $.CTC3.get$1(stage);
  if (!(items == null)) {
    $.forEach(items, new $.Mouse_markMouseOver_anon());
    $.CTC3.clear$1(stage);
  }
  if (t1) {
    var hits = $.RetainedUtil_hitTest(stage, coordinate);
    $.CTC3.set$2(stage, hits);
    $.forEach(hits, new $.Mouse_markMouseOver_anon0());
    if ($.gtB($.get$length(hits), 0))
      $.CTC4.set$2($.index(hits, 0), true);
    return hits;
  }
  return;
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.Futures_wait = function(futures) {
  var t1 = {};
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC0);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
  var t2;
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC0));
  return object;
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || (dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0))
        throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0))
        throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3)
        throw $.ioore(j);
      dst[j] = t2;
    }
  else
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      t2 = src.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      t3 = src[i];
      var t4 = dst.length;
      if (j < 0 || j >= t4)
        throw $.ioore(j);
      dst[j] = t3;
    }
};

$.DateImplementation$now = function() {
  var t1 = new $.DateImplementation(false, $.Primitives_dateNow());
  t1.DateImplementation$now$0();
  return t1;
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a / b : $.div$slow(a, b);
};

$._MeasurementRequest$ = function(computeValue, completer) {
  return new $._MeasurementRequest(false, null, completer, computeValue);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$._Elements_CanvasElement = function(width, height) {
  var _e = $._document().$dom_createElement$1('canvas');
  if (!(width == null))
    _e.set$width(width);
  if (!(height == null))
    _e.set$height(height);
  return _e;
};

$.Game$ = function(field) {
  var t1 = $.Array2d_Array2d(field.get$width(), field.get$height(), $.CTC12);
  $.setRuntimeTypeInfo(t1, {T: 'SquareState'});
  var t2 = $.EventHandle$();
  $.setRuntimeTypeInfo(t2, {T: 'EventArgs'});
  t1 = new $.Game(null, null, null, null, $.CTC28, t2, t1, field);
  t1.Game$1(field);
  return t1;
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$.GameRoot$_internal = function(_canvas, _stage, _gameElement, _clickMan, _leftCountDiv, _gameStateDiv, _clockDiv) {
  var t1 = new $.GameRoot(null, null, false, _clockDiv, _gameStateDiv, _leftCountDiv, _clickMan, _gameElement, _canvas, _stage);
  t1.GameRoot$_internal$7(_canvas, _stage, _gameElement, _clickMan, _leftCountDiv, _gameStateDiv, _clockDiv);
  return t1;
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(exception.stack);
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.Enumerable_Enumerable = function(source) {
  $.requireArgumentNotNull(source, 'source');
  var t1 = $._SimpleEnumerable$(source);
  $.setRuntimeTypeInfo(t1, {T: 'T'});
  return t1;
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.CanvasUtil_transform = function(ctx, tx) {
  $.requireArgumentNotNull(ctx, 'ctx');
  $.requireArgumentNotNull(tx, 'tx');
  ctx.transform$6(tx.get$scaleX(), tx.get$shearY(), tx.get$shearX(), tx.get$scaleY(), tx.get$translateX(), tx.get$translateY());
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.ReadOnlyCollection$ = function(source) {
  var t1 = $.ListFactory_List$from(source);
  $.setRuntimeTypeInfo(t1, {E: 'T'});
  return new $.ReadOnlyCollection(t1);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.min = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return b;
      if (a < b)
        return a;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return (a + b) * a * b;
        if (a === 0 && $.isNegative(b) === true || $.isNaN(b) === true)
          return b;
        return a;
      }
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._AttachableEventHelper_fireEvent = function(obj, attachable, args) {
  var helper = $.CTC11.get$1(obj);
  if (!(helper == null)) {
    var handle = $.index(helper.get$_handlers(), attachable);
    if (!(handle == null))
      handle.fireEvent$1(args);
  }
};

$.Math_sqrt = function(x) {
  return $.MathNatives_sqrt(x);
};

$.MathNatives_sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$.Rect$ = function(left, top$, width, height) {
  return new $.Rect(height, width, top$, left);
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.RetainedUtil__hitTest = function(element, point) {
  point = $.RetainedUtil_transformPointGlobalToLocal(element, point);
  var bounds = $.Rect$(0, 0, element.get$width(), element.get$height());
  var hits = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(hits, {E: 'PElement'});
  if (bounds.contains$1(point) === true) {
    var length$ = element.get$visualChildCount();
    if (typeof length$ !== 'number')
      return $.RetainedUtil__hitTest$bailout(1, element, point, length$, hits);
    for (var t1 = length$ - 1, i = 0; i < length$; ++i) {
      hits = $.RetainedUtil__hitTest(element.getVisualChild$1(t1 - i), point);
      if (hits.length > 0)
        break;
    }
    $.add$1(hits, element);
    return hits;
  } else
    return [];
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.last = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  return name$;
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$._window = function() {
  return typeof window != "undefined" ? window : null;
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$.NullArgumentException$ = function(arg) {
  return new $.NullArgumentException(arg, arg);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.CanvasUtil_getCanvasSize = function(canvasElement) {
  return $.Size$(canvasElement.get$width(), canvasElement.get$height());
};

$.DurationImplementation$ = function(days, hours, minutes, seconds, milliseconds) {
  return new $.DurationImplementation($.add($.add($.add($.add($.mul(days, 86400000), $.mul(hours, 3600000)), $.mul(minutes, 60000)), $.mul(seconds, 1000)), milliseconds));
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.ClickManager$ = function(_stage) {
  var t1 = new $.ClickManager(null, _stage);
  t1.ClickManager$1(_stage);
  return t1;
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$._DOMWindowCrossFrameImpl__createSafe = function(w) {
  var t1 = $.window();
  if (w == null ? t1 == null : w === t1)
    return w;
  else
    return $._DOMWindowCrossFrameImpl$(w);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$.ElementMouseEventArgs_ElementMouseEventArgs = function(element, mouseEvent) {
  return $.ElementMouseEventArgs$_internal(element, mouseEvent.get$shiftKey());
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.requireArgument = function(truth, arg, message) {
  if (truth !== true)
    if (!(message == null))
      throw $.captureStackTrace($.DetailedIllegalArgumentException$(arg, message));
    else
      throw $.captureStackTrace($.IllegalArgumentException$(arg));
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b)) {
    a = a;
    b = b;
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.insertRange$3 = function(receiver, start, length$, initialValue) {
  if (!$.isJsArray(receiver))
    return receiver.insertRange$3(start, length$, initialValue);
  return $.listInsertRange(receiver, start, length$, initialValue);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$._completeMeasurementFutures = function() {
  if ($.eqB($._nextMeasurementFrameScheduled, false))
    return;
  $._nextMeasurementFrameScheduled = false;
  if (!($._pendingRequests == null))
    for (var t1 = $.iterator($._pendingRequests); t1.hasNext$0() === true;) {
      var request = t1.next$0();
      try {
        var t2 = request.computeValue$0();
        request.set$value(t2);
      } catch (exception) {
        t2 = $.unwrapException(exception);
        var e = t2;
        t2 = e;
        request.set$value(t2);
        request.set$exception(true);
      }

    }
  var completedRequests = $._pendingRequests;
  var readyMeasurementFrameCallbacks = $._pendingMeasurementFrameCallbacks;
  $._pendingRequests = null;
  $._pendingMeasurementFrameCallbacks = null;
  if (!(completedRequests == null))
    for (t1 = $.iterator(completedRequests); t1.hasNext$0() === true;) {
      t2 = t1.next$0();
      if (t2.get$exception() === true)
        t2.get$completer().completeException$1(t2.get$value());
      else
        t2.get$completer().complete$1(t2.get$value());
    }
  if (!(readyMeasurementFrameCallbacks == null))
    for (t1 = $.iterator(readyMeasurementFrameCallbacks); t1.hasNext$0() === true;)
      t1.next$0().call$0();
};

$._DOMWindowCrossFrameImpl__postMessage2 = function(win, message, targetOrigin) {
    win.postMessage(message, targetOrigin);

};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = regExp._re;
  return r == null ? regExp._re = $.regExpMakeNative(regExp, false) : r;
};

$.Coordinate_difference = function(a, b) {
  return $.Vector$($.sub(a.x, b.get$x()), $.sub(a.y, b.get$y()));
};

$._AttachableEventHelper_addHandler = function(obj, property, watcher) {
  return $.add$1($.CTC11.get$2(obj, $._AttachableEventHelper_createInstance).get$_handlers().putIfAbsent$2(property, new $._AttachableEventHelper_addHandler_anon()), watcher);
};

$.ClickManager_addHandler = function(element, handler) {
  return $.CTC10.addHandler$2(element, handler);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._Lists_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i)
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1))
    $.add$1(accumulator, $.index(a, i));
  return accumulator;
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, $.get$length(inputTable)))
                break L0;
              var tag = $.index($.index(inputTable, i), 0);
              var tags = $.index($.index(inputTable, i), 1);
              var set = $.HashSetImplementation$();
              $.setRuntimeTypeInfo(set, {E: 'String'});
              var tagNames = $.split(tags, '|');
            case 2:
              state = 0;
              for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j)
                set.add$1($.index(tagNames, j));
              $.add$1(result, $.MetaInfo$(tag, tags, set));
              ++i;
          }
      return result;
  }
};

$.RetainedUtil__hitTest$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var element = env0;
      point = env1;
      length$ = env2;
      hits = env3;
      break;
  }
  switch (state) {
    case 0:
      var point = $.RetainedUtil_transformPointGlobalToLocal(element, point);
      var bounds = $.Rect$(0, 0, element.get$width(), element.get$height());
      var hits = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(hits, {E: 'PElement'});
    case 1:
      if (state === 1 || state === 0 && bounds.contains$1(point) === true)
        switch (state) {
          case 0:
            var length$ = element.get$visualChildCount();
          case 1:
            state = 0;
            for (var i = 0; $.ltB(i, length$); ++i) {
              hits = $.RetainedUtil__hitTest(element.getVisualChild$1($.sub($.sub(length$, 1), i)), point);
              if (hits.length > 0)
                break;
            }
            $.add$1(hits, element);
            return hits;
        }
      else
        return [];
  }
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC0);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
};

$.Arrays_copy$bailout = function(state, src, srcStart, dst, dstStart, count) {
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j)
      $.indexSet(dst, j, $.index(src, i));
  else
    for (var t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j)
      $.indexSet(dst, j, $.index(src, i));
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.listInsertRange$bailout = function(state, receiver, start, length$, initialValue) {
  if (length$ === 0)
    return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  var receiverLength = receiver.length;
  if (start < 0 || start > receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = receiverLength + length$;
  $.set$length(receiver, t1);
  var t2 = start + length$;
  $.Arrays_copy(receiver, start, receiver, t2, receiverLength - start);
  if (!(initialValue == null))
    for (var i = start; i < t2; ++i)
      $.indexSet(receiver, i, initialValue);
  $.set$length(receiver, t1);
};

$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.throwNoSuchMethod.call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$._AttachableEventHelper_createInstance.call$1 = $._AttachableEventHelper_createInstance;
$._AttachableEventHelper_createInstance.$name = "_AttachableEventHelper_createInstance";
$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC0 = Isolate.makeConstantList([]);
$.CTC3 = new Isolate.$isolateProperties.Property(null, '_stageMouseCacheProperty');
$.CTC18 = new Isolate.$isolateProperties.NotImplementedException('must be implemented by subclass');
$.CTC28 = new Isolate.$isolateProperties.GameState('Not Started');
$.CTC12 = new Isolate.$isolateProperties.SquareState('hidden');
$.CTC15 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC22 = new Isolate.$isolateProperties.EventArgs();
$.CTC29 = new Isolate.$isolateProperties.GameState('Won');
$.CTC5 = new Isolate.$isolateProperties.Coordinate(0, 0);
$.CTC23 = new Isolate.$isolateProperties.InvalidOperationException('The input sequence is empty.');
$.CTC30 = new Isolate.$isolateProperties.GameState('Lost');
$.CTC6 = new Isolate.$isolateProperties._UndefinedValue();
$.CTC32 = new Isolate.$isolateProperties.Object();
$.CTC13 = new Isolate.$isolateProperties.SquareState('flagged');
$.CTC7 = new Isolate.$isolateProperties.Property(false, 'IsMouseOver');
$.CTC20 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC21 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC0, Isolate.$isolateProperties.CTC20, Isolate.$isolateProperties.CTC20, Isolate.$isolateProperties.CTC20, Isolate.$isolateProperties.CTC20);
$.CTC25 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC14 = new Isolate.$isolateProperties.SquareState('revealed');
$.CTC8 = new Isolate.$isolateProperties.Property(false, 'isClickable');
$.CTC11 = new Isolate.$isolateProperties.Property(null, '_attachableEventHelperProperty');
$.CTC27 = new Isolate.$isolateProperties._Random();
$.CTC19 = new Isolate.$isolateProperties.UnsupportedOperationException('Mutation operations are not supported');
$.CTC4 = new Isolate.$isolateProperties.Property(false, 'IsMouseDirectlyOver');
$.CTC1 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC0, null);
$.CTC31 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC33 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException(null);
$.CTC16 = new Isolate.$isolateProperties.SquareState('mine');
$.CTC10 = new Isolate.$isolateProperties.AttachedEvent('clickEvent');
$.CTC17 = new Isolate.$isolateProperties.SquareState('safe');
$.CTC24 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC26 = new Isolate.$isolateProperties.GameState('Started');
$.GlobalId__globalId = 0;
$._ReceivePortImpl__nextFreeId = 1;
$._getTypeNameOf = null;
$._pendingMeasurementFrameCallbacks = null;
$._nextMeasurementFrameScheduled = false;
$._pendingRequests = null;
$._TimerFactory__factory = null;
$._cachedBrowserPrefix = null;
$._firstMeasurementRequest = true;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$Element: function() { return false; },
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$Map: function() { return false; },
 is$Collection: function() { return false; },
 is$List: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); }
});

$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._AbstractWorkerEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

}
});

$.$defineNativeClass('HTMLAnchorElement', ["name?"], {
 toString$0: function() {
  return this.toString();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?", "duration?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width=", "name?", "height="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?", "duration?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$width: function(value) {
  this.setProperty$3('width', value, '');
},
 get$width: function() {
  return this.getPropertyValue$1('width');
},
 get$transform: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'transform');
},
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.get$transform().call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 get$top: function() {
  return this.getPropertyValue$1('top');
},
 set$textAlign: function(value) {
  this.setProperty$3('text-align', value, '');
},
 get$left: function() {
  return this.getPropertyValue$1('left');
},
 set$height: function(value) {
  this.setProperty$3('height', value, '');
},
 get$height: function() {
  return this.getPropertyValue$1('height');
},
 set$font: function(value) {
  this.setProperty$3('font', value, '');
},
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 get$clip: function() {
  return this.getPropertyValue$1('clip');
},
 clip$0: function() { return this.get$clip().call$0(); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
},
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
}
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width=", "height="], {
 get$context2d: function() {
  return this.getContext$1('2d');
},
 getContext$1: function(contextId) {
  return this.getContext(contextId);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["textAlign!", "strokeStyle!", "globalAlpha!", "font!", "fillStyle!"], {
 transform$6: function(m11, m12, m21, m22, dx, dy) {
  return this.transform(m11,m12,m21,m22,dx,dy);
},
 strokeRect$5: function(x, y, width, height, lineWidth) {
  return this.strokeRect(x,y,width,height,lineWidth);
},
 save$0: function() {
  return this.save();
},
 restore$0: function() {
  return this.restore();
},
 rect$4: function(x, y, width, height) {
  return this.rect(x,y,width,height);
},
 fillText$4: function(text, x, y, maxWidth) {
  return this.fillText(text,x,y,maxWidth);
},
 fillRect$4: function(x, y, width, height) {
  return this.fillRect(x,y,width,height);
},
 drawImage$9: function(canvas_OR_image_OR_video, sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh);
},
 drawImage$3: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y);
},
 clip$0: function() {
  return this.clip();
},
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
},
 beginPath$0: function() {
  return this.beginPath();
}
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "top?", "left?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('HTMLContentElement', [], {
 select$1: function(arg0) { return this.select.call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 update$0: function() {
  return this.update();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
}
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
},
 remove$1: function(token) {
  return this.remove(token);
},
 contains$1: function(token) {
  return this.contains(token);
},
 add$1: function(token) {
  return this.add(token);
}
});

$.$defineNativeClass('HTMLDataListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
},
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 query$1: function(selectors) {
  if ($.CTC.hasMatch$1(selectors) === true)
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
},
 $dom_createElement$1: function(tagName) {
  return this.createElement(tagName);
},
 get$on: function() {
  return $._DocumentEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 get$on: function() {
  return $._ElementEventsImpl$(this);
},
 click$0: function() {
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 get$parent: function() {
  return;
},
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
},
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
},
 get$id: function() {
  return '';
},
 get$rect: function() {
  var t1 = new $._DocumentFragmentImpl_rect_anon();
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, {T: 'ElementRect'});
  return $._createMeasurementFuture(t1, t2);
},
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().call$4(arg0, arg1, arg2, arg3); },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
  {
  $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListFactory_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
}
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }

},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$elements: function() {
  if (this._lib_elements == null)
    this._lib_elements = $.FilteredElementList$(this);
  return this._lib_elements;
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["innerHTML!", "id?"], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 $dom_getClientRects$0: function() {
  return this.getClientRects();
},
 $dom_getBoundingClientRect$0: function() {
  return this.getBoundingClientRect();
},
 get$$$dom_scrollWidth: function() {
return this.scrollWidth;
},
 get$$$dom_scrollTop: function() {
return this.scrollTop;
},
 get$$$dom_scrollLeft: function() {
return this.scrollLeft;
},
 get$$$dom_scrollHeight: function() {
return this.scrollHeight;
},
 get$$$dom_offsetWidth: function() {
return this.offsetWidth;
},
 get$$$dom_offsetTop: function() {
return this.offsetTop;
},
 get$$$dom_offsetLeft: function() {
return this.offsetLeft;
},
 get$$$dom_offsetHeight: function() {
return this.offsetHeight;
},
 get$$$dom_lastElementChild: function() {
return this.lastElementChild;
},
 get$$$dom_firstElementChild: function() {
return this.firstElementChild;
},
 get$$$dom_clientWidth: function() {
return this.clientWidth;
},
 get$$$dom_clientTop: function() {
return this.clientTop;
},
 get$$$dom_clientLeft: function() {
return this.clientLeft;
},
 get$$$dom_clientHeight: function() {
return this.clientHeight;
},
 click$0: function() {
  return this.click();
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 get$$$dom_children: function() {
return this.children;
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._ElementEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 get$rect: function() {
  var t1 = new $._ElementImpl_rect_anon(this);
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, {T: 'ElementRect'});
  return $._createMeasurementFuture(t1, t2);
},
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().call$4(arg0, arg1, arg2, arg3); },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
  {
  return $._ChildrenElementList$_wrap(this);
}
  } else {
    return Object.prototype.get$elements.call(this);
  }

},
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
  {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
}
  } else {
    return Object.prototype.set$elements.call(this, value);
  }

},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["width=", "name?", "height="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
}
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', ["currentTarget?"], {
});

$.$defineNativeClass('EventException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
}
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._EventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

}
});

$.$defineNativeClass('HTMLFieldSetElement', ["name?", "elements?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'File'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
}
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
}
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name?", "length?"], {
 reset$0: function() {
  return this.reset();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "name?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return this.remove(index);
},
 set$length: function(value) {
this.length = value;
},
 get$length: function() {
return this.length;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["state?", "length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
}
});

$.$defineNativeClass('IDBDatabaseException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return this.clear();
},
 add$2: function(value, key) {
  return this.add(value,key);
},
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._IDBRequestEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

}
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["width=", "name?", "height="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width=", "name?", "height="], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value=", "pattern?", "name?", "height="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
}
});

$.$defineNativeClass('KeyboardEvent', ["shiftKey?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', ["duration?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMediaElement', ["duration?"], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
}
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 remove$1: function(track) {
  return this.remove(track);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 add$1: function(track) {
  return this.add(track);
},
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["y?", "x?", "shiftKey?", "clientY?", "clientX?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 contains$1: function(other) {
  return this.contains(other);
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 set$text: function(value) {
this.textContent = value;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }

  return this;
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
}
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 get$first: function() {
  return this.operator$index$1(0);
},
 first$0: function() { return this.get$first().call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 clear$0: function() {
  this._parent.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._NotificationEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "name?", "height="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value=", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
}
});

$.$defineNativeClass('WebKitPoint', ["y?", "x?"], {
});

$.$defineNativeClass('PopStateEvent', ["state?"], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RTCPeerConnection', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('RangeException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('Rect', ["top?", "left?"], {
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', ["rootElement?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
return this.id;
},
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
},
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
},
 get$elements: function() {
  return $.FilteredElementList$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?", "width?", "height?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?", "width?", "height?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGLineElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y?"], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPoint', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRect', ["y?", "x?", "width=", "height="], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?", "width?", "height?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?", "width?", "height?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewSpec', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "name?", "length="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLSourceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
}
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
},
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_clear$0: function() {
  return this.clear();
},
 get$$$dom_length: function() {
return this.length;
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$length: function() {
  return this.get$$$dom_length();
},
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
},
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 putIfAbsent$2: function(key, ifAbsent) {
  if (this.containsKey$1(key) !== true)
    this.operator$indexSet$2(key, ifAbsent.call$0());
  return this.operator$index$1(key);
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'StyleSheet'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width=", "height="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
}
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
}
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Touch', ["clientY?", "clientX?"], {
});

$.$defineNativeClass('TouchEvent', ["shiftKey?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Touch'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width=", "height="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WebSocket', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$2: function(code, reason) {
  return this.close(code,reason);
},
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
}
});

$.$defineNativeClass('DOMWindow', ["navigator?", "name?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 postMessage$3: function(message, targetOrigin, messagePorts) {
  return this.postMessage(message,targetOrigin,messagePorts);
},
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage(message,targetOrigin);
},
 close$0: function() {
  return this.close();
},
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._WindowEventsImpl$(this);
},
 _ensureRequestAnimationFrame$0: function() {
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }

},
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
},
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
},
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe(this.get$_top());
},
 get$_top: function() {
return this.top;
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._WorkerContextEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
}
});

$.$defineNativeClass('XMLHttpRequestException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
}
});

$.$defineNativeClass('XPathException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
return this.postMessage(msg);
},
 get$id: function() {
return this.id;
}
});

$.$defineNativeClass('DOMWindow', [], {
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

// 336 dynamic classes.
// 381 classes
// 31 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v6/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v7/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v8/*class(_ElementImpl)*/ = [v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v12/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v13/*class(_NodeImpl)*/ = [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v14/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v15/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest';
  var v16/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['AbstractWorker', v16/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v12/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v5/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v6/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['MouseEvent', v7/*class(_MouseEventImpl)*/],
    ['Event', [v7/*class(_MouseEventImpl)*/,v7/*class(_MouseEventImpl)*/,v7/*class(_MouseEventImpl)*/,v7/*class(_MouseEventImpl)*/,'Event|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v13/*class(_NodeImpl)*/],
    ['MediaStream', v14/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v15/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
