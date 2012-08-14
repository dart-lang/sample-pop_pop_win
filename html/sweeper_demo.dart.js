function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
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
      for (var t1 = $.iterator(this._exceptionHandlers); t1 .hasNext$0() === true;) {
        var handler = t1 .next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1 .hasNext$0() === true;) {
        var listener = t1 .next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  }  finally {
    for (t1 = $.iterator(this._completionListeners); t1 .hasNext$0() === true;) {
      var listener0 = t1 .next$0();
      try {
        listener0 .call$1(this);
      }  catch (exception) {
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
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 getValues$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'V'})));
  t1 .i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'K'})));
  t1 .i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC4))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  ;
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC4))
      f.call$2(key, $.index(this._values, i));
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
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC4);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  var t3 = t1 .length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
      return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t3 = t1 .length;
    if (index < 0 || index >= t3)
      throw $.ioore(index);
    var t4 = t1[index] === $.CTC4;
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
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t3 = t1 .length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  var t5 = t1 .length;
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
            var t3 = $.index(t1, index) === $.CTC4;
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
      t1 = this._values;
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
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  ;
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
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
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, (({E: 'V'})));
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC4)
      continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
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
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, (({E: 'V'})));
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC4)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
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
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(2, key, hash, numberOfProbes, insertionIndex, t1);
    var t3 = t1 .length;
    if (hash < 0 || hash >= t3)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC4 === existingKey)
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
              else if ($.ltB(insertionIndex, 0) && $.CTC4 === existingKey)
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
  $.setRuntimeTypeInfo(t1, (({E: 'V'})));
  this._values = t1;
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
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
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
  $.setRuntimeTypeInfo(result, (({E: 'E'})));
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
  if (t1 .containsKey$1(value) !== true)
    return false;
  t1 .remove$1(value);
  return true;
},
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
},
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0))
    throw $.iae(value);
  var t3 = t1 .length;
  if (value < 0 || value >= t3)
    throw $.ioore(value);
  t1[value] = value;
},
 add$1$bailout: function(state, t1, value) {
  ;
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
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._advance$0$bailout(1, t1);
  var length$ = t1 .length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$)
      break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    var t3 = t1 .length;
    if (t2 < 0 || t2 >= t3)
      throw $.ioore(t2);
    entry = t1[t2];
  } while (entry == null || entry === $.CTC4);
},
 _advance$0$bailout: function(state, t1) {
  ;
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$))
      break;
    entry = $.index(t1, this._nextValidIndex);
  } while (entry == null || entry === $.CTC4);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t4 = t1 .length;
  if (t3 < 0 || t3 >= t4)
    throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
},
 next$0$bailout: function(state, t1) {
  ;
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
},
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2 .constructor !== Array && !t2 .is$JavaScriptIndexingBehavior()))
    return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2 .length;
  if (t1 >= t4)
    return false;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  if (t1 < 0 || t1 >= t4)
    throw $.ioore(t1);
  if (t2[t1] === $.CTC4)
    this._advance$0();
  return this._nextValidIndex < t2 .length;
},
 hasNext$0$bailout: function(state, t1, t2) {
  ;
  if ($.geB(t1, $.get$length(t2)))
    return false;
  if ($.index(t2, this._nextValidIndex) === $.CTC4)
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
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'V'})));
  t1 .index_1 = 0;
  $.forEach(this._lib2_list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'K'})));
  t1 .index_1 = 0;
  $.forEach(this._lib2_list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
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
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1 .containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    var t2 = t1 .length;
    if (key < 0 || key >= t2)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._lib2_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2 .lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    var t3 = t1 .length;
    if (key < 0 || key >= t3)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  ;
  if (t1 .containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._lib2_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2 .lastEntry$0());
  }
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, (({E: 'KeyValuePair<K, V>'})));
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
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  t1 ._link$2(this._previous, this);
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
  throw $.captureStackTrace($.CTC25);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 remove$0: function() {
  throw $.captureStackTrace($.CTC25);
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
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  return t1;
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, (({E: 'E'})));
  var t1 = this._sentinel;
  var entry = t1 .get$_next();
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
  var entry = t1 .get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_lib2_element());
    entry = nextEntry;
  }
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1 .set$_next(t1);
  t1 .set$_previous(t1);
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1 .get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 get$length: function() {
  var t1 = (({}));
  t1 .counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1 .counter_1;
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
  for (var t1 = $.iterator(collection); t1 .hasNext$0() === true;)
    this.add$1(t1 .next$0());
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
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
  $.setRuntimeTypeInfo(t1, (({E: 'String'})));
  this._buffer = t1;
  this._length = 0;
  return this;
},
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1 .hasNext$0() === true;)
    this.add$1(t1 .next$0());
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
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
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

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = ((this.list[this.i]));
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  ;
  this.i = $.add(t1, 1);
  return value;
},
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < ((this.list.length));
},
 hasNext$0$bailout: function(state, t1) {
  ;
  return $.lt(t1, ((this.list.length)));
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
}
};

$$.ConstantMap = {"":
 ["_lib0_keys?", "_jsObject", "length?"],
 super: "Object",
 clear$0: function() {
  return this._throwImmutable$0();
},
 remove$1: function(key) {
  return this._throwImmutable$0();
},
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
},
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC6);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 getValues$0: function() {
  var result = [];
  $.forEach(this._lib0_keys, new $.ConstantMap_getValues_anon(this, result));
  return result;
},
 getKeys$0: function() {
  return this._lib0_keys;
},
 forEach$1: function(f) {
  $.forEach(this._lib0_keys, new $.ConstantMap_forEach_anon(this, f));
},
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true)
    return;
  return $.jsPropertyAccess(this._jsObject, key);
},
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__'))
    return false;
  return $.jsHasOwnProperty(this._jsObject, key);
},
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object",
 set$3: function(arg0, arg1, arg2) { return this.set.call$3(arg0, arg1, arg2); }
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib0_start"],
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

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1 .length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    var t2 = t1 .length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1 .length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    t2 = t1 .length;
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
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
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
 ["message"],
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
 super: "_ElementEventsImpl"
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
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
  throw $.captureStackTrace($.CTC18);
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
    throw $.captureStackTrace($.CTC17);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
},
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
},
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
},
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (typeof t2 === 'object' && t2 !== null && t2 .is$Element())
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

$$._ChildrenElementList = {"":
 ["_childElements", "_element?"],
 super: "Object",
 last$0: function() {
  return this._element.get$$$dom_lastElementChild();
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._element.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._element.set$text('');
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.CTC18);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._element; t1 .hasNext$0() === true;)
    t2 .$dom_appendChild$1(t1 .next$0());
},
 iterator$0: function() {
  return $.iterator(this._toList$0());
},
 addLast$1: function(value) {
  return this.add$1(value);
},
 add$1: function(value) {
  this._element.$dom_appendChild$1(value);
  return value;
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC16);
},
 operator$indexSet$2: function(index, value) {
  this._element.$dom_replaceChild$2(value, $.index(this._childElements, index));
},
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
},
 get$length: function() {
  return $.get$length(this._childElements);
},
 isEmpty$0: function() {
  return this._element.get$$$dom_firstElementChild() == null;
},
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
},
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
},
 get$first: function() {
  return this._element.get$$$dom_firstElementChild();
},
 first$0: function() { return this.get$first().call$0(); },
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._toList$0$bailout(1, t1);
  var output = $.ListFactory_List(t1 .length);
  for (var len = t1 .length, i = 0; i < len; ++i) {
    var t2 = t1 .length;
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
  ;
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
  throw $.captureStackTrace($.CTC16);
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.CTC16);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC16);
},
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC16);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC16);
},
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC16);
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
  for (var t1 = $.iterator(this); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (f.call$1(t2) === true)
      out.add$1(t2);
  }
  return out;
},
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
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
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._index;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._index = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t5 = t1 .length;
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
  return $._ElementList$($._ListWrapper.prototype.getRange$2 .call(this, start, rangeLength));
},
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1 .call(this, f));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ElementAttributeMap = {"":
 ["_element?"],
 super: "Object",
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 get$length: function() {
  return $.get$length(this._element.get$$$dom_attributes());
},
 getValues$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.getValues$0$bailout(1, attributes);
  var values = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(values, (({E: 'String'})));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = attributes[i].get$value();
    var t3 = values.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    values[i] = t2;
  }
  return values;
},
 getValues$0$bailout: function(state, attributes) {
  ;
  var values = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(values, (({E: 'String'})));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$value();
    var t2 = values.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    values[i] = t1;
  }
  return values;
},
 getKeys$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.getKeys$0$bailout(1, attributes);
  var keys = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(keys, (({E: 'String'})));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = attributes[i].get$name();
    var t3 = keys.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    keys[i] = t2;
  }
  return keys;
},
 getKeys$0$bailout: function(state, attributes) {
  ;
  var keys = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(keys, (({E: 'String'})));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$name();
    var t2 = keys.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
},
 forEach$1: function(f) {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.forEach$1$bailout(1, f, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var item = attributes[i];
    f.call$2(item.get$name(), item.get$value());
  }
},
 forEach$1$bailout: function(state, f, attributes) {
  ;
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var item = $.index(attributes, i);
    f.call$2(item.get$name(), item.get$value());
  }
},
 clear$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
},
 clear$0$bailout: function(state, attributes) {
  ;
  for (var i = $.sub($.get$length(attributes), 1); $.geB(i, 0); i = $.sub(i, 1))
    this.remove$1($.index(attributes, i).get$name());
},
 remove$1: function(key) {
  var t1 = this._element;
  var value = t1 .$dom_getAttribute$1(key);
  t1 .$dom_removeAttribute$1(key);
  return value;
},
 operator$indexSet$2: function(key, value) {
  this._element.$dom_setAttribute$2(key, $.S(value));
},
 operator$index$1: function(key) {
  return this._element.$dom_getAttribute$1(key);
},
 containsKey$1: function(key) {
  return this._element.$dom_hasAttribute$1(key);
},
 is$Map: function() { return true; }
};

$$._DataAttributeMap = {"":
 ["$$dom_attributes?"],
 super: "Object",
 _strip$1: function(key) {
  return $.substring$1(key, 5);
},
 _matches$1: function(key) {
  return $.startsWith(key, 'data-');
},
 _attr$1: function(key) {
  return 'data-' + $.S(key);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 get$length: function() {
  return $.get$length(this.getKeys$0());
},
 getValues$0: function() {
  var values = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(values, (({E: 'String'})));
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_getValues_anon(this, values));
  return values;
},
 getKeys$0: function() {
  var keys = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(keys, (({E: 'String'})));
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_getKeys_anon(this, keys));
  return keys;
},
 forEach$1: function(f) {
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_forEach_anon(this, f));
},
 clear$0: function() {
  for (var t1 = $.iterator(this.getKeys$0()); t1 .hasNext$0() === true;)
    this.remove$1(t1 .next$0());
},
 remove$1: function(key) {
  return this.$$dom_attributes.remove$1(this._attr$1(key));
},
 operator$indexSet$2: function(key, value) {
  $.indexSet(this.$$dom_attributes, this._attr$1(key), $.S(value));
},
 operator$index$1: function(key) {
  return $.index(this.$$dom_attributes, this._attr$1(key));
},
 containsKey$1: function(key) {
  return this.$$dom_attributes.containsKey$1(this._attr$1(key));
},
 is$Map: function() { return true; }
};

$$._CssClassSet = {"":
 ["_element?"],
 super: "Object",
 _formatSet$1: function(s) {
  return $.Strings_join($.ListFactory_List$from(s), ' ');
},
 _write$1: function(s) {
  var t1 = this._formatSet$1(s);
  this._element.set$$$dom_className(t1);
},
 _classname$0: function() {
  return this._element.get$$$dom_className();
},
 _read$0: function() {
  var s = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(s, (({E: 'String'})));
  for (var t1 = $.iterator($.split(this._classname$0(), ' ')); t1 .hasNext$0() === true;) {
    var trimmed = $.trim(t1 .next$0());
    if ($.isEmpty(trimmed) !== true)
      s.add$1(trimmed);
  }
  return s;
},
 _modify$1: function(f) {
  var s = this._read$0();
  f.call$1(s);
  this._write$1(s);
},
 clear$0: function() {
  this._modify$1(new $._CssClassSet_clear_anon());
},
 addAll$1: function(collection) {
  this._modify$1(new $._CssClassSet_addAll_anon(collection));
},
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
},
 add$1: function(value) {
  this._modify$1(new $._CssClassSet_add_anon(value));
},
 contains$1: function(value) {
  return $.contains$1(this._read$0(), value);
},
 get$length: function() {
  return $.get$length(this._read$0());
},
 isEmpty$0: function() {
  return $.isEmpty(this._read$0());
},
 filter$1: function(f) {
  return $.filter(this._read$0(), f);
},
 forEach$1: function(f) {
  $.forEach(this._read$0(), f);
},
 iterator$0: function() {
  return $.iterator(this._read$0());
},
 toString$0: function() {
  return this._formatSet$1(this._read$0());
},
 is$Collection: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._EventsImpl = {"":
 ["_ptr?"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
}
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr?"],
 super: "Object",
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
},
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
},
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
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
 super: "_ElementEventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
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
 super: "_EventsImpl"
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
  for (var t1 = $.iterator(collection), t2 = this._this; t1 .hasNext$0() === true;)
    t2 .$dom_appendChild$1(t1 .next$0());
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

$$._AttributeClassSet = {"":
 ["_element"],
 super: "_CssClassSet",
 _write$1: function(s) {
  $.indexSet(this._element.get$attributes(), 'class', this._formatSet$1(s));
},
 $dom_className$0: function() {
  return $.index(this._element.get$attributes(), 'class');
},
 get$$$dom_className: function() { return new $.BoundClosure(this, '$dom_className$0'); }
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
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
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
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

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
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
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t5 = t1 .length;
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
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true)
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
},
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true)
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1 .reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  }  finally {
    t1 .cleanup$0();
  }
  return result;
}
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = (({}));
  var t2 = this._visited;
  t1 .copy_1 = $.index(t2, map);
  var t3 = t1 .copy_1;
  if (!(t3 == null))
    return t3;
  t1 .copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1 .copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1 .copy_1;
},
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
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
  ;
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
  ;
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
  ;
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
  if ($._Deserializer_isPrimitive(x) === true)
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
  if ($._Deserializer_isPrimitive(x) === true)
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
  t1 .remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState().get$isolates().remove$1(this.id);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1 .containsKey$1(portId) === true)
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
  }  finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1 ._setGlobals$0();
  }
  return result;
},
 initGlobals$0: function() {
$initGlobals(this);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1 .get$nextIsolateId();
  t1 .set$nextIsolateId($.add(t2, 1));
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
    }  catch (exception) {
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
  return t1 .removeFirst$0();
},
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
}
};

$$._IsolateEvent = {"":
 ["message", "fn", "isolate"],
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
  if (!(port.get$_port() == null))
    return this.visitSendPort$1(port.get$_port());
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
},
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
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
  if (!(port.get$_port() == null))
    return this.visitSendPort$1(port.get$_port());
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
},
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
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
  ;
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
 ["_receivePortId?", "_workerId?", "_isolateId"],
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
  if (typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort && port.get$_port() == null)
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
  var val = t1 .get$2(x, y);
  if (typeof val !== 'number')
    return this.getAdjacentCount$2$bailout(1, x, y, val, t1);
  return val;
},
 getAdjacentCount$2$bailout: function(state, x, y, val, t1) {
  ;
  if (val == null) {
    for (var t2 = $.iterator(this.getAdjacentIndices$2(x, y)), val = 0; t2 .hasNext$0() === true;)
      if (this.operator$index$1(t2 .next$0()) === true)
        ++val;
    t1 .set$3(x, y, val);
  }
  return val;
},
 Field$_internal$3: function(mineCount, cols, source) {
  for (var t1 = $.iterator(this), count = 0; t1 .hasNext$0() === true;)
    if (t1 .next$0() === true)
      ++count;
}
};

$$.Game = {"":
 ["_revealsLeft", "_minesLeft", "_state", "_updatedEvent", "_states", "field?"],
 super: "Object",
 _getCoordFromIndex$1: function(i) {
  if (typeof i !== 'number')
    return this._getCoordFromIndex$1$bailout(1, i, 0, 0);
  var t1 = this.field;
  var t2 = t1 .get$width();
  if (typeof t2 !== 'number')
    return this._getCoordFromIndex$1$bailout(2, i, t2, t1);
  t2 = $.mod(i, t2);
  t1 = t1 .get$width();
  if (typeof t1 !== 'number')
    return this._getCoordFromIndex$1$bailout(3, i, t1, t2);
  return [t2, $.tdiv(i, t1)];
},
 _getCoordFromIndex$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var i = env0;
      break;
    case 2:
      i = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 3:
      i = env0;
      t1 = env1;
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.field;
      var t2 = t1 .get$width();
    case 2:
      state = 0;
      t2 = $.mod(i, t2);
      t1 = t1 .get$width();
    case 3:
      state = 0;
      return [t2, $.tdiv(i, t1)];
  }
},
 _getAdjacentFlagCount$2: function(x, y) {
  var t1 = $.iterator(this.field.getAdjacentIndices$2(x, y));
  var t2 = this._states;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2 .constructor !== Array && !t2 .is$JavaScriptIndexingBehavior()))
    return this._getAdjacentFlagCount$2$bailout(1, t1, t2);
  var val = 0;
  for (; t1 .hasNext$0() === true;) {
    var t3 = t1 .next$0();
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    var t4 = t2 .length;
    if (t3 < 0 || t3 >= t4)
      throw $.ioore(t3);
    if ($.eqB(t2[t3], $.CTC8))
      ++val;
  }
  return val;
},
 _getAdjacentFlagCount$2$bailout: function(state, t1, t2) {
  ;
  var val = 0;
  for (; t1 .hasNext$0() === true;)
    if ($.eqB($.index(t2, t1 .next$0()), $.CTC8))
      ++val;
  return val;
},
 _ensureStarted$0: function() {
  if ($.eqB(this.get$state(), $.CTC14))
    this._state = $.CTC15;
},
 _update$0: function() {
  return this._updatedEvent.fireEvent$1($.CTC9);
},
 _setLost$0: function() {
  var t1 = this.field;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._setLost$0$bailout(1, t1, 0);
  var t3 = this._states;
  if (typeof t3 !== 'object' || t3 === null || (t3 .constructor !== Array || !!t3 .immutable$list) && !t3 .is$JavaScriptIndexingBehavior())
    return this._setLost$0$bailout(2, t1, t3);
  var i = 0;
  for (; t2 = t1 .length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    if (t1[i] === true) {
      var t2 = t3 .length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      t3[i] = $.CTC12;
    }
  }
  this._state = $.CTC13;
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
          $.indexSet(t3, i, $.CTC12);
      this._state = $.CTC13;
  }
},
 _setWon$0: function() {
  var t1 = this.field;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._setWon$0$bailout(1, t1, 0);
  var t3 = this._states;
  if (typeof t3 !== 'object' || t3 === null || (t3 .constructor !== Array || !!t3 .immutable$list) && !t3 .is$JavaScriptIndexingBehavior())
    return this._setWon$0$bailout(2, t1, t3);
  var i = 0;
  for (; t2 = t1 .length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    if (t1[i] === true) {
      var t2 = t3 .length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      t3[i] = $.CTC10;
    }
  }
  this._state = $.CTC11;
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
          $.indexSet(t3, i, $.CTC10);
      this._state = $.CTC11;
  }
},
 _doReveal$2: function(x, y) {
  var t1 = this._states;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._doReveal$2$bailout(1, x, y, t1, 0, 0);
  t1 .set$3(x, y, $.CTC3);
  var t3 = this._revealsLeft;
  if (typeof t3 !== 'number')
    return this._doReveal$2$bailout(2, x, y, t1, t3, 0);
  this._revealsLeft = t3 - 1;
  var t2 = this._revealsLeft;
  if (typeof t2 !== 'number')
    return this._doReveal$2$bailout(3, x, y, t2, t1, 0);
  if (t2 === 0) {
    this._setWon$0();
    var revealCount = 1;
  } else {
    t2 = this.field;
    t3 = t2 .getAdjacentCount$2(x, y);
    if (typeof t3 !== 'number')
      return this._doReveal$2$bailout(4, x, y, t2, t3, t1);
    if (t3 === 0)
      for (t3 = $.iterator(t2 .getAdjacentIndices$2(x, y)), revealCount = 1; t3 .hasNext$0() === true;) {
        t2 = t3 .next$0();
        if (t2 !== (t2 | 0))
          throw $.iae(t2);
        var t4 = t1 .length;
        if (t2 < 0 || t2 >= t4)
          throw $.ioore(t2);
        if ($.eqB(t1[t2], $.CTC7)) {
          var c = this._getCoordFromIndex$1(t2);
          if (typeof c !== 'string' && (typeof c !== 'object' || c === null || c.constructor !== Array && !c.is$JavaScriptIndexingBehavior()))
            return this._doReveal$2$bailout(5, t3, revealCount, t1, c, 0);
          t4 = c.length;
          if (0 >= t4)
            throw $.ioore(0);
          var t5 = c[0];
          if (1 >= t4)
            throw $.ioore(1);
          t5 = this._doReveal$2(t5, c[1]);
          if (typeof t5 !== 'number')
            throw $.iae(t5);
          revealCount += t5;
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
      var y = env1;
      t1 = env2;
      break;
    case 2:
      x = env0;
      y = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 3:
      x = env0;
      y = env1;
      t2 = env2;
      t1 = env3;
      break;
    case 4:
      x = env0;
      y = env1;
      t2 = env2;
      t3 = env3;
      t1 = env4;
      break;
    case 5:
      t3 = env0;
      revealCount = env1;
      t1 = env2;
      c = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._states;
    case 1:
      state = 0;
      t1 .set$3(x, y, $.CTC3);
      var t3 = this._revealsLeft;
    case 2:
      state = 0;
      this._revealsLeft = $.sub(t3, 1);
      var t2 = this._revealsLeft;
    case 3:
      state = 0;
    default:
      if (state === 0 && $.eqB(t2, 0)) {
        this._setWon$0();
        var revealCount = 1;
      } else
        switch (state) {
          case 0:
            t2 = this.field;
            t3 = t2 .getAdjacentCount$2(x, y);
          case 4:
            state = 0;
          case 5:
            if (state === 5 || state === 0 && $.eqB(t3, 0))
              switch (state) {
                case 0:
                  t3 = $.iterator(t2 .getAdjacentIndices$2(x, y));
                  revealCount = 1;
                case 5:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          if (!(t3 .hasNext$0() === true))
                            break L0;
                          t2 = t3 .next$0();
                        case 5:
                          if (state === 5 || state === 0 && $.eqB($.index(t1, t2), $.CTC7))
                            switch (state) {
                              case 0:
                                var c = this._getCoordFromIndex$1(t2);
                              case 5:
                                state = 0;
                                var t4 = this._doReveal$2($.index(c, 0), $.index(c, 1));
                                if (typeof t4 !== 'number')
                                  throw $.iae(t4);
                                revealCount += t4;
                            }
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
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._doChord$2$bailout(1, x, y, t1, 0, 0, 0);
  t1 .get$2(x, y);
  var flagged = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(flagged, (({E: 'int'})));
  var hidden = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(hidden, (({E: 'int'})));
  var t3 = this.field;
  if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3 .constructor !== Array && !t3 .is$JavaScriptIndexingBehavior()))
    return this._doChord$2$bailout(2, x, y, t1, t3, flagged, hidden);
  t3 .getAdjacentCount$2(x, y);
  for (var t2 = $.iterator(t3 .getAdjacentIndices$2(x, y)), failed = false; t2 .hasNext$0() === true;) {
    var t4 = t2 .next$0();
    if (t4 !== (t4 | 0))
      throw $.iae(t4);
    var t5 = t1 .length;
    if (t4 < 0 || t4 >= t5)
      throw $.ioore(t4);
    if ($.eqB(t1[t4], $.CTC7)) {
      hidden.push(t4);
      t5 = t3 .length;
      if (t4 < 0 || t4 >= t5)
        throw $.ioore(t4);
      if (t3[t4] === true)
        failed = true;
    } else {
      t5 = t1 .length;
      if (t4 < 0 || t4 >= t5)
        throw $.ioore(t4);
      if ($.eqB(t1[t4], $.CTC8))
        flagged.push(t4);
    }
  }
  if (failed) {
    this._setLost$0();
    var reveals = 0;
  } else
    for (t1 = $.iterator(hidden), reveals = 0; t1 .hasNext$0() === true;) {
      var c = this._getCoordFromIndex$1(t1 .next$0());
      t2 = this.reveal$2($.index(c, 0), $.index(c, 1));
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
      t1 .get$2(x, y);
      var flagged = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(flagged, (({E: 'int'})));
      var hidden = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(hidden, (({E: 'int'})));
      var t3 = this.field;
    case 2:
      state = 0;
      t3 .getAdjacentCount$2(x, y);
      for (var t2 = $.iterator(t3 .getAdjacentIndices$2(x, y)), failed = false; t2 .hasNext$0() === true;) {
        var t4 = t2 .next$0();
        if ($.eqB($.index(t1, t4), $.CTC7)) {
          hidden.push(t4);
          if ($.index(t3, t4) === true)
            failed = true;
        } else if ($.eqB($.index(t1, t4), $.CTC8))
          flagged.push(t4);
      }
      if (failed) {
        this._setLost$0();
        var reveals = 0;
      } else
        for (t1 = $.iterator(hidden), reveals = 0; t1 .hasNext$0() === true;) {
          var c = this._getCoordFromIndex$1(t1 .next$0());
          t2 = this.reveal$2($.index(c, 0), $.index(c, 1));
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
  $.require(!$.eqB(currentSS, $.CTC8), 'Cannot reveal a flagged square');
  if ($.eqB(currentSS, $.CTC7))
    if (this.field.get$2(x, y) === true) {
      this._setLost$0();
      var reveals = 0;
    } else {
      reveals = this._doReveal$2(x, y);
      if (typeof reveals !== 'number')
        return this.reveal$2$bailout(1, reveals);
    }
  else if ($.eqB(currentSS, $.CTC3))
    if ($.eqB(this._getAdjacentFlagCount$2(x, y), this.field.getAdjacentCount$2(x, y))) {
      reveals = this._doChord$2(x, y);
      if (typeof reveals !== 'number')
        return this.reveal$2$bailout(2, reveals);
    } else
      reveals = 0;
  else
    reveals = 0;
  this._update$0();
  return reveals;
},
 reveal$2$bailout: function(state, env0) {
  switch (state) {
    case 1:
      reveals = env0;
      break;
    case 2:
      reveals = env0;
      break;
  }
  switch (state) {
    case 0:
      this._ensureStarted$0();
      var currentSS = this._states.get$2(x, y);
      $.require(!$.eqB(currentSS, $.CTC8), 'Cannot reveal a flagged square');
    default:
      if (state === 1 || state === 0 && $.eqB(currentSS, $.CTC7))
        switch (state) {
          case 0:
          case 1:
            if (state === 0 && this.field.get$2(x, y) === true) {
              this._setLost$0();
              var reveals = 0;
            } else
              switch (state) {
                case 0:
                  reveals = this._doReveal$2(x, y);
                case 1:
                  state = 0;
              }
        }
      else
        switch (state) {
          case 0:
          case 2:
            if (state === 2 || state === 0 && $.eqB(currentSS, $.CTC3))
              switch (state) {
                case 0:
                case 2:
                  if (state === 2 || state === 0 && $.eqB(this._getAdjacentFlagCount$2(x, y), this.field.getAdjacentCount$2(x, y)))
                    switch (state) {
                      case 0:
                        reveals = this._doChord$2(x, y);
                      case 2:
                        state = 0;
                    }
                  else
                    reveals = 0;
              }
            else
              reveals = 0;
        }
      this._update$0();
      return reveals;
  }
},
 setFlag$3: function(x, y, value) {
  this._ensureStarted$0();
  var t1 = this._states;
  var currentSS = t1 .get$2(x, y);
  if (value) {
    $.require($.eq(currentSS, $.CTC7), '');
    t1 .set$3(x, y, $.CTC8);
    this._minesLeft = $.sub(this._minesLeft, 1);
  } else {
    $.require($.eq(currentSS, $.CTC8), '');
    t1 .set$3(x, y, $.CTC7);
    this._minesLeft = $.add(this._minesLeft, 1);
  }
  this._update$0();
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
  return ((Math.random() * max) >>> 0);
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

$$.NullArgumentException = {"":
 ["_arg"],
 super: "IllegalArgumentException"
};

$$.InvalidOperationException = {"":
 ["message"],
 super: "Object",
 is$Exception: true
};

$$.DetailedIllegalArgumentException = {"":
 ["message", "argument", "_arg"],
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
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
},
 first$1: function(f) {
  if (f == null)
    f = new $.Enumerable_first_anon();
  var iter = $._WhereIterator$(this.iterator$0(), f);
  $.setRuntimeTypeInfo(iter, (({T: 'T'})));
  if (iter.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC21);
  return iter.next$0();
},
 first$0: function() {
  return this.first$1(null)
},
 get$first: function() { return new $.BoundClosure1(this, 'first$1'); },
 join$1: function(separator) {
  var sb = $.StringBufferImpl$('');
  for (var t1 = $.iterator(this); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
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
  for (var t1 = $.iterator(this); t1 .hasNext$0() === true;)
    if ($.eqB(t1 .next$0(), item))
      return true;
  return false;
},
 iterator$0: function() {
  throw $.captureStackTrace($.CTC18);
}
};

$$._WhereIterator = {"":
 ["_current", "_lib1_next=", "_func", "_source"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  this._lib1_next = null;
  return this._current;
},
 hasNext$0: function() {
  if (this._lib1_next == null) {
    this._lib1_next = false;
    for (var t1 = this._source; t1 .hasNext$0() === true;) {
      this._current = t1 .next$0();
      if (this._func$1(this._current) === true) {
        this._lib1_next = true;
        break;
      }
    }
  }
  return this._lib1_next;
},
 _func$1: function(arg0) { return this._func.call$1(arg0); }
};

$$.IndexIterator = {"":
 ["_lib1_pos", "_lib1_length", "_indexer"],
 super: "Object",
 _indexer$1: function(arg0) { return this._indexer.call$1(arg0); },
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._lib1_pos;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1);
  this._lib1_pos = t1 + 1;
  return this._indexer$1(t1);
},
 next$0$bailout: function(state, t1) {
  ;
  this._lib1_pos = $.add(t1, 1);
  return this._indexer$1(t1);
},
 hasNext$0: function() {
  var t1 = this._lib1_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._lib1_pos;
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
      var t1 = this._lib1_length;
    case 1:
      state = 0;
      var t3 = this._lib1_pos;
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
  $.setRuntimeTypeInfo(list, (({E: 'T'})));
  for (var i = start; i <= lastIndex; ++i)
    list.push(this.operator$index$1(i));
  return list;
},
 getRange$2$bailout: function(state, start, itemCount) {
  ;
  $.requireArgument($.ge(itemCount, 0), 'count', null);
  var lastIndex = $.sub($.add(start, itemCount), 1);
  if ($.gtB(itemCount, 0))
    if ($.ltB(start, 0))
      throw $.captureStackTrace($.IndexOutOfRangeException$(start));
    else if ($.geB(lastIndex, $.get$length(this)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(lastIndex));
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, (({E: 'T'})));
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
  ;
  for (var i = start; $.ltB(i, $.get$length(this)); i = $.add(i, 1))
    if ($.eqB(this.operator$index$1(i), element))
      return i;
  return -1;
},
 operator$index$1: function(index) {
  throw $.captureStackTrace($.CTC22);
},
 get$length: function() {
  throw $.captureStackTrace($.CTC22);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, (({E: 'T'})));
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
  $.setRuntimeTypeInfo(t1, (({T: 'T'})));
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
  var t2 = t1 .length;
  if (index < 0 || index >= t2)
    throw $.ioore(index);
  return t1[index];
},
 get$length: function() {
  return this._items.length;
}
};

$$.Array2d = {"":
 ["_source", "height?", "width?"],
 super: "ListBase",
 _getIndex$2: function(x, y) {
  return $.add(x, $.mul(y, this.width));
},
 getAdjacentIndices$2: function(x, y) {
  if (typeof x !== 'number')
    return this.getAdjacentIndices$2$bailout(1, x, y, 0, 0, 0, 0, 0);
  if (typeof y !== 'number')
    return this.getAdjacentIndices$2$bailout(1, x, y, 0, 0, 0, 0, 0);
  var adj = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(adj, (({E: 'int'})));
  var k = $.max(0, y - 1);
  if (typeof k !== 'number')
    return this.getAdjacentIndices$2$bailout(2, x, y, k, adj, 0, 0, 0);
  var t2 = this.height;
  var t3 = this.width;
  var t4 = y + 2;
  var t5 = x - 1;
  var t6 = x + 2;
  for (; $.ltB(k, $.min(t2, t4)); ++k) {
    var j = $.max(0, t5);
    if (typeof j !== 'number')
      return this.getAdjacentIndices$2$bailout(3, x, y, k, adj, j, t2, t3);
    var t7 = !(k === y);
    for (; $.ltB(j, $.min(t3, t6)); ++j)
      if (!(j === x) || t7)
        adj.push(this._getIndex$2(j, k));
  }
  return adj;
},
 getAdjacentIndices$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var x = env0;
      var y = env1;
      break;
    case 2:
      x = env0;
      y = env1;
      k = env2;
      adj = env3;
      break;
    case 3:
      x = env0;
      y = env1;
      k = env2;
      adj = env3;
      j = env4;
      t2 = env5;
      t3 = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var adj = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(adj, (({E: 'int'})));
      var k = $.max(0, $.sub(y, 1));
    case 2:
      state = 0;
      var t2 = this.height;
      var t3 = this.width;
    case 3:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(k, $.min(t2, $.add(y, 2))))
                break L0;
              var j = $.max(0, $.sub(x, 1));
            case 3:
              state = 0;
              for (; $.ltB(j, $.min(t3, $.add(x, 2))); j = $.add(j, 1))
                if (!$.eqB(j, x) || !$.eqB(k, y))
                  adj.push(this._getIndex$2(j, k));
              k = $.add(k, 1);
          }
      return adj;
  }
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
  return $.index(this._source, index);
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
 ["_handlers", "_disposed"],
 super: "DisposableImpl",
 remove$1: function(id) {
  var t1 = this._handlers;
  if (!(t1 == null))
    return !(t1 .remove$1(id) == null);
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

$$.GameView = {"":
 ["_updatedEventId", "game", "_gameStateDiv", "_leftCountDiv", "_table"],
 super: "Object",
 _gameUpdated$1: function(args) {
  this.updateElement$0();
},
 get$_gameUpdated: function() { return new $.BoundClosure0(this, '_gameUpdated$1'); },
 _click$3: function(x, y, alt) {
  var ss = this.game.getSquareState$2(x, y);
  if (alt === true) {
    if ($.eqB(ss, $.CTC7))
      this.game.setFlag$3(x, y, true);
    else if ($.eqB(ss, $.CTC8))
      this.game.setFlag$3(x, y, false);
    else if ($.eqB(ss, $.CTC3))
      this.game.reveal$2(x, y);
  } else if ($.eqB(ss, $.CTC7))
    this.game.reveal$2(x, y);
},
 _cellClick$1: function(args) {
  if ($.eqB(args.get$button(), 0) && this.get$_canClick() === true) {
    var cell = args.get$toElement();
    var xStr = $.index(cell.get$dataAttributes(), 'x');
    var yStr = $.index(cell.get$dataAttributes(), 'y');
    this._click$3($.parseInt(xStr), $.parseInt(yStr), args.get$shiftKey());
  }
},
 get$_cellClick: function() { return new $.BoundClosure0(this, '_cellClick$1'); },
 get$_canClick: function() {
  return $.eqB(this.game.get$state(), $.CTC14) || $.eqB(this.game.get$state(), $.CTC15);
},
 newGame$0: function() {
  if (!(this._updatedEventId == null))
    this.game.get$updated().remove$1(this._updatedEventId);
  this.game = $.Game$($.Field_Field(40, 16, 16, null));
  this._updatedEventId = $.add$1(this.game.get$updated(), this.get$_gameUpdated());
  $.clear(this._table.get$elements());
  this.updateElement$0();
},
 updateElement$0: function() {
  var t1 = this.game.get$state().get$name();
  this._gameStateDiv.set$innerHTML(t1);
  t1 = $.toString(this.game.get$minesLeft());
  this._leftCountDiv.set$innerHTML(t1);
  t1 = this._table;
  if ($.eqB($.get$length(t1 .get$elements()), 0))
    for (var r = 0; $.ltB(r, this.game.get$field().get$height()); ++r) {
      var row = t1 .insertRow$1(-1);
      for (var c = 0; $.ltB(c, this.game.get$field().get$width()); ++c) {
        var cell = row.insertCell$1(-1);
        $.add$1(cell.get$on().get$mouseDown(), this.get$_cellClick());
        $.indexSet(cell.get$dataAttributes(), 'x', $.toString(c));
        $.indexSet(cell.get$dataAttributes(), 'y', $.toString(r));
      }
    }
  for (r = 0; $.ltB(r, this.game.get$field().get$height()); ++r)
    for (c = 0; $.ltB(c, this.game.get$field().get$width()); ++c) {
      cell = $.index($.index(t1 .get$rows(), r).get$cells(), c);
      $.clear(cell.get$classes());
      $.add$1(cell.get$classes(), 'game-square');
      var ss = this.game.getSquareState$2(c, r);
      $.add$1(cell.get$classes(), ss.get$name());
      if ($.eqB(ss, $.CTC3)) {
        var adj = this.game.get$field().getAdjacentCount$2(c, r);
        if ($.gtB(adj, 0))
          cell.set$innerHTML($.toString(adj));
      }
    }
},
 GameView$3: function(_table, _leftCountDiv, _gameStateDiv) {
  this.newGame$0();
}
};

$$.main_anon = {"":
 ["gameView_0"],
 super: "Closure",
 call$1: function(args) {
  return this.gameView_0 .newGame$0();
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 call$0: function() {
  return this.closure_0 .call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 call$0: function() {
  return this.closure_2 .call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 call$0: function() {
  return this.closure_5 .call$2(this.arg1_4, this.arg2_3);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 call$2: function(k, v) {
  if (this.box_0 .first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0 .first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.f_0 .call$1(key);
}
};

$$._CssClassSet_add_anon = {"":
 ["value_0"],
 super: "Closure",
 call$1: function(s) {
  return $.add$1(s, this.value_0);
}
};

$$._CssClassSet_clear_anon = {"":
 [],
 super: "Closure",
 call$1: function(s) {
  return $.clear(s);
}
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 call$1: function(key) {
  return this.f_0 .call$2(key, $.index(this.this_1, key));
}
};

$$._DataAttributeMap_getKeys_anon = {"":
 ["this_1", "keys_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.this_1 ._matches$1(key) === true)
    $.add$1(this.keys_0, this.this_1 ._strip$1(key));
}
};

$$._DataAttributeMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.this_1 ._matches$1(key) === true)
    this.f_0 .call$2(this.this_1 ._strip$1(key), value);
}
};

$$._CssClassSet_addAll_anon = {"":
 ["collection_0"],
 super: "Closure",
 call$1: function(s) {
  return $.addAll(s, this.collection_0);
}
};

$$.HashSetImplementation_addAll__ = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(value) {
  this.this_0 .add$1(value);
}
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
}
};

$$.HashSetImplementation_filter__ = {"":
 ["f_1", "result_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.f_1 .call$1(key) === true)
    $.add$1(this.result_0, key);
}
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 super: "Closure",
 call$1: function(element) {
  if (this.f_1 .call$1(element) === true)
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

$$.Enumerable_first_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return true;
}
};

$$.ListBase_iterator_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(i) {
  return $.index(this.this_0, i);
}
};

$$.EventHandle_fireEvent_anon = {"":
 ["args_0"],
 super: "Closure",
 call$2: function(id, handler) {
  handler.call$1(this.args_0);
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
  var counter = $.add(this.box_0 .counter_1, 1);
  this.box_0 .counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(entry) {
  this.f_0 .call$2(entry.get$key(), entry.get$value());
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1 .close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2 .completeException$1(value);
  else
    t2 .complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["this_2", "message_1", "replyTo_0"],
 super: "Closure",
 call$0: function() {
  this.this_2 ._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_2, 'msg', this.message_1, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true)
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState().get$managers(), this.this_2 .get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(_) {
  return this.callback_0 .call$0();
}
};

$$.Futures_wait_anon = {"":
 ["completer_5", "pos_4", "box_0", "result_3", "values_2"],
 super: "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0 .remaining_1, 1);
  this.box_0 .remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_3 .get$isComplete() !== true)
    this.completer_5 .complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["future_8", "completer_7", "result_6"],
 super: "Closure",
 call$1: function(exception) {
  if (this.result_6 .get$isComplete() !== true)
    this.completer_7 .completeException$2(exception, this.future_8 .get$stackTrace());
  return true;
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0 ._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0 ._dispatch$1(e);
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0 .i_1;
  var i = $.add(t2, 1);
  this.box_0 .i_1 = i;
  $.indexSet(t1, t2, value);
}
};

$$.ConstantMap_getValues_anon = {"":
 ["this_1", "result_0"],
 super: "Closure",
 call$1: function(key) {
  return $.add$1(this.result_0, $.index(this.this_1, key));
}
};

$$._DataAttributeMap_getValues_anon = {"":
 ["this_1", "values_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.this_1 ._matches$1(key) === true)
    $.add$1(this.values_0, value);
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0 .index_1;
  var index = $.add(t2, 1);
  this.box_0 .index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["this_5", "message_4", "replyTo_3"],
 super: "Closure",
 call$0: function() {
  var t1 = (({}));
  this.this_5 ._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_5 .get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_5 .get$_receivePort().get$_callback() == null)
    return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_5 .get$_isolateId());
  t1 .msg_1 = this.message_4;
  t1 .reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1 .msg_1 = $._serializeMessage(t1 .msg_1);
    t1 .reply_2 = $._serializeMessage(t1 .reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_5, t1, shouldSerialize), 'receive ' + $.S(this.message_4));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 call$0: function() {
  if (!(this.this_7 .get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0 .msg_1);
      this.box_0 .msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0 .reply_2);
      this.box_0 .reply_2 = reply;
    }
    var t1 = this.this_7 .get$_receivePort();
    var t2 = this.box_0;
    t1 ._callback$2(t2 .msg_1, t2 .reply_2);
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

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0 .i_1;
  var i = $.add(t2, 1);
  this.box_0 .i_1 = i;
  $.indexSet(t1, t2, key);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0 .index_1;
  var index = $.add(t2, 1);
  this.box_0 .index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0 .copy_1, this.this_2 ._dispatch$1(key), this.this_2 ._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  if (this.this_0 .runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0 .call$1(this.this_1);
}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0 .call$1(this.this_1);
}
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
$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$._CssClassSet$ = function(_element) {
  return new $._CssClassSet(_element);
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
  return (other == (receiver.substring(0, length$)));
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true)
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
  return (receiver.slice(start, end));
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

$.eqB = function(a, b) {
  if ((a == null))
    return (b == null);
  if ((b == null))
    return false;
  if ((typeof a === "object"))
    if ((!!a.operator$eq$1))
      return a.operator$eq$1(b) === true;
  return (a === b);
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    (receiver.length = newLength);
  } else
    receiver.set$length(newLength);
  return newLength;
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
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
  var function$ = ((closure.$identity));
  if ((!!function$))
    return function$;
  function$ = ((function() {
    return ($.invokeClosure.call$5)(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  }));
  (closure.$identity = function$);
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
  return !(value == null) && ((value.constructor === Array));
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true)
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (((String(object.constructor)).match(/^\s*function\s*(\S*)\s*\(/)[1]));
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.IndexIterator$ = function(length$, indexer) {
  var t1 = new $.IndexIterator(0, length$, indexer);
  t1 .IndexIterator$2(length$, indexer);
  return t1;
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1 .HashSetIterator$1(set_);
  return t1;
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true)
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true)
    return (receiver.length === 0);
  return receiver.isEmpty$0();
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$.dynamicFunction = function(name$) {
  var f = ((Object.prototype[name$]));
  if (!(f == null) && ((!!f.methods)))
    return (f.methods);
  var methods = (({}));
  var dartMethod = ((Object.getPrototypeOf($.CTC24)[name$]));
  if (!(dartMethod == null))
    (methods['Object'] = dartMethod);
  var bind = ((function() {return ($.dynamicBind.call$4)(this, name$, methods, Array.prototype.slice.call(arguments));}));
  (bind.methods = methods);
  $.defineProperty(((Object.prototype)), name$, bind);
  return methods;
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, (({E: 'E'})));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true;)
    result.push(iterator.next$0());
  return result;
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, false);
  t1 ._Timer$repeating$2(milliSeconds, callback);
  return t1;
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.max = function(a, b) {
  if (typeof a === 'number') {
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
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC1;
  var jsError = ((new Error()));
  (jsError.dartException = ex);
  (jsError.toString = ($.toStringWrapper.call$0));
  return jsError;
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a >= b);
  return a.operator$ge$1(b);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return (Math.floor(receiver));
};

$.getFunctionForTypeNameOf = function() {
  if (!(((typeof(navigator))) === 'object'))
    return $.typeNameInChrome;
  var userAgent = ((navigator.userAgent));
  if ($.contains$1(userAgent, $.CTC23) === true)
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

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = ((a));
    b = ((b));
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return (a >>> b);
    }
    if (b > 31)
      b = 31;
    return ((a >> b) >>> 0);
  }
  return a.operator$shr$1(b);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1 ._JsCopier$0();
  return t1;
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    (a[index] = value);
    return;
  }
  a.operator$indexSet$2(index, value);
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return ((a & b) >>> 0);
  return a.operator$and$1(b);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    (target.builtin$typeInfo = typeInfo);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return (receiver & 0x1FFFFFFF);
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = ((receiver.length));
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + ((receiver.charCodeAt(i)));
    var hash1 = 536870911 & hash0 + ((524287 & hash0 << 10));
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + ((67108863 & hash << 3));
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + ((16383 & hash0 << 15));
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a * b);
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
  return typeof a === 'number' && typeof b === 'number' ? ((a > b)) : $.gt$slow(a, b);
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1 ._IsolateContext$0();
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
    return (receiver.charCodeAt(index));
  } else
    return receiver.charCodeAt$1(index);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a * b)) : $.mul$slow(a, b);
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

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.parseInt = function(str) {
  $.checkString(str);
  if (!((/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))))
    throw $.captureStackTrace($.FormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2))
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  else
    t1 = false;
  if (!t1)
    if ($.gtB($.get$length(trimmed), 3))
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    else
      t1 = false;
  else
    t1 = true;
  var base = t1 ? 16 : 10;
  var ret = ((parseInt(trimmed, base)));
  if ($.isNaN(ret) === true)
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$.Strings_join = function(strings, separator) {
  return $.StringBase_join(strings, separator);
};

$.StringBase_join = function(strings, separator) {
  $.checkNull(strings);
  $.checkNull(separator);
  if (!(typeof separator === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(separator));
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), separator);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    (receiver.push(value));
    return;
  }
  return receiver.add$1(value);
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, true);
  t1 ._Timer$2(milliSeconds, callback);
  return t1;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true)
    return (receiver.length);
  else
    return receiver.get$length();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = ((methods[tag]));
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = ((methods[entry.get$tag()]));
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = ((methods['Object']));
  var proto = ((Object.getPrototypeOf(obj)));
  if (method == null)
    method = ((function () {if (Object.getPrototypeOf(this) === proto) {($.throwNoSuchMethod.call$3)(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}}));
  if ((!proto.hasOwnProperty(name$)))
    $.defineProperty(proto, name$, method);
  return (method.apply(obj, arguments$));
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return (isNaN(receiver));
  else
    return receiver.isNaN$0();
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global === true)
    $.add$1(sb, 'g');
  try {
    return (new RegExp(pattern, $.toString(sb)));
  }  catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, ((String(e)))));
  }

};

$.main = function() {
  var gameView = $.GameView$($.query('#sweeperTable'), $.query('#minesLeft'), $.query('#gameState'));
  $.add$1($.query('#newGame').get$on().get$click(), new $.main_anon(gameView));
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.ceil$0();
  return (Math.ceil(receiver));
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true)
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
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
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return (receiver.pop());
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
  if (typeof mineCount !== 'number')
    return $.Field_Field$bailout(1, mineCount, cols, rows, seed);
  var squares = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(squares, (({E: 'bool'})));
  $.insertRange$3(squares, 0, $.mul(rows, cols), false);
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
  $.setRuntimeTypeInfo(t1, (({T: 'bool'})));
  return $.Field$_internal(mineCount, cols, t1);
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true)
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  (receiver.push(value));
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a >= b)) : $.ge$slow(a, b) === true;
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
  t1 .Array2d$wrap$2(width, source);
  return t1;
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a <= b)) : $.le$slow(a, b) === true;
};

$.regExpAttachGlobalNative = function(regExp) {
  (regExp._re = $.regExpMakeNative(regExp, true));
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = ((a % b));
    if (result === 0)
      return 0;
    if (result > 0)
      return result;
    b = ((b));
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

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
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

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a - b);
  return a.operator$sub$1(b);
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
  if ($.isJsArray(receiver) === true) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, ((receiver.length)));
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return (receiver.indexOf(element, start));
  }
  return receiver.indexOf$2(element, start);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if ((!!obj.xmlVersion))
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

$.trim = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.trim$0();
  return (receiver.trim());
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1 .DoubleLinkedQueue$0();
  return t1;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return (new Array());
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = ((new Array(length$)));
  (result.fixed$length = true);
  return result;
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a >= b)) : $.ge$slow(a, b);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1 .HashSetImplementation$0();
  return t1;
};

$._globalState = function() {
return $globalState;
};

$._globalState0 = function(val) {
$globalState = val;
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$2(startIndex, endIndex);
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
  t1 .StringBufferImpl$1(content$);
  return t1;
};

$.require = function(truth, message) {
  if (truth !== true)
    throw $.captureStackTrace($.ExceptionImplementation$(message));
};

$.window = function() {
return window;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1 .HashMapImplementation$0();
  return t1;
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1 .JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.DetailedIllegalArgumentException$ = function(arg, message) {
  return new $.DetailedIllegalArgumentException(message, arg, '');
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a + b)) : $.add$slow(a, b);
};

$.regExpTest = function(regExp, str) {
  return ($.regExpGetNative(regExp).test(str));
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
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

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a > b);
  return a.operator$gt$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.typeNameInChrome = function(obj) {
  var name$ = ((obj.constructor.name));
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
  for (var t1 = $.iterator(c), first = true; t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
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

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
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
  var receiverLength = ((receiver.length));
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

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
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
  $.setRuntimeTypeInfo(s, (({E: 'T'})));
  $.insertRange$3(s, 0, $.mul(width, height), initialValue);
  return $.Array2d$wrap(width, s);
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = ((obj.constructor));
  if (((typeof(constructor$))) === 'function') {
    var name$ = ((constructor$.name));
    if (((typeof(name$))) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object') && !(name$ === 'Function.prototype'))
      return name$;
  }
  var string = ((Object.prototype.toString.call(obj)));
  return $.substring$2(string, 8, string.length - 1);
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a < b)) : $.lt$slow(a, b) === true;
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true)
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return $.truncate(((a)) / ((b)));
  return a.operator$tdiv$1(b);
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (f.call$1(t2) === true)
      $.add$1(destination, t2);
  }
  return destination;
};

$.unwrapException = function(ex) {
  if (("dartException" in ex))
    return (ex.dartException);
  var message = ((ex.message));
  if ((ex instanceof TypeError)) {
    var type = ((ex.type));
    var name$ = ((ex.arguments ? ex.arguments[0] : ""));
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
      else if ($.endsWith(message, 'is not a function') === true)
        return $.NoSuchMethodException$('', '<unknown>', [], null);
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if ((ex instanceof RangeError)) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if ((typeof InternalError == 'function' && ex instanceof InternalError))
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.GlobalId_GlobalId = function() {
  var t1 = $.GlobalId__globalId;
  $.GlobalId__globalId = $.add(t1, 1);
  return $.GlobalId$_internal(t1);
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

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (f.call$1(t2) === true)
      $.add$1(destination, t2);
  }
  return destination;
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(null, t1);
  t1 ._ReceivePortImpl$0();
  return t1;
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.stringJoinUnchecked = function(array, separator) {
  return (array.join(separator));
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

$._DataAttributeMap$ = function($$dom_attributes) {
  return new $._DataAttributeMap($$dom_attributes);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1 ._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
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

$.EventHandle$ = function() {
  return new $.EventHandle(null, false);
};

$._ElementFactoryProvider_Element$tag = function(tag) {
return document.createElement(tag)
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

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string')
    return (receiver.split(pattern));
  else if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp)
    return (receiver.split($.regExpGetNative(pattern)));
  else
    throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a < b);
  return a.operator$lt$1(b);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o) === true)
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o) === true)
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

$._AttributeClassSet$ = function(element) {
  return new $._AttributeClassSet(element);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.requireArgumentNotNull = function(argument, argName) {
  if (argument == null)
    throw $.captureStackTrace($.NullArgumentException$(argName));
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, (({E: '_IsolateEvent'})));
  return new $._EventLoop(t1);
};

$.Field$_internal = function(mineCount, cols, source) {
  var t1 = $.Array2d_Array2d(cols, $.tdiv($.get$length(source), cols), null);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  var t2 = !(cols == null) && $.gtB(cols, 0) && !(source == null) ? $.tdiv($.get$length(source), cols) : 0;
  t2 = new $.Field(t1, mineCount, source, t2, cols);
  t2 .Array2d$wrap$2(cols, source);
  t2 .Field$_internal$3(mineCount, cols, source);
  return t2;
};

$.toString = function(value) {
  if ((typeof value == "object" && value !== null))
    if ($.isJsArray(value) === true)
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if ((value === 0 && (1 / value) < 0))
    return '-0.0';
  if (value == null)
    return 'null';
  if ((typeof value == "function"))
    return 'Closure';
  return (String(value));
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return (receiver.substring(startIndex, endIndex));
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
  return $.CTC20;
};

$.regExpExec = function(regExp, str) {
  var result = (($.regExpGetNative(regExp).exec(str)));
  if ((result === null))
    return;
  return result;
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
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.regExpMatchStart = function(m) {
  return (m.index);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.GameView$ = function(_table, _leftCountDiv, _gameStateDiv) {
  var t1 = new $.GameView(null, null, _gameStateDiv, _leftCountDiv, _table);
  t1 .GameView$3(_table, _leftCountDiv, _gameStateDiv);
  return t1;
};

$._dynamicMetadata = function(table) {
  ($dynamicMetadata = table);
};

$._dynamicMetadata0 = function() {
  if (((typeof($dynamicMetadata))) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return ($dynamicMetadata);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, (({E: 'Match'})));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0))
    return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
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

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a + b);
  return a.operator$add$1(b);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return (jsObject.hasOwnProperty(property));
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true)
    return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true;)
    $.add$1(receiver, iterator.next$0());
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number')
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  else
    return receiver.isNegative$0();
};

$.Util_getHashCode = function(source) {
  for (var t1 = $.iterator(source), hash = 0; t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
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

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  if (typeof startIndex !== 'number')
    return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
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

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1 ._PendingSendPortFinder$0();
  return t1;
};

$.Futures_wait = function(futures) {
  var t1 = (({}));
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC0);
    $.setRuntimeTypeInfo(t1, (({T: 'List'})));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, (({T: 'List'})));
  var result = completer.get$future();
  t1 .remaining_1 = futures.length;
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
  if (typeof count !== 'number')
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart == null)
    srcStart = 0;
  if (typeof srcStart !== 'number')
    return $.Arrays_copy$bailout(2, src, dst, dstStart, count, srcStart);
  if (dstStart == null)
    dstStart = 0;
  if (typeof dstStart !== 'number')
    return $.Arrays_copy$bailout(3, src, dst, count, srcStart, dstStart);
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
      if (i !== (i | 0))
        throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0))
        throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4)
        throw $.ioore(j);
      dst[j] = t3;
    }
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.indexSet = function(a, index, value) {
  if ((a.constructor === Array && !a.immutable$list)) {
    var key = ((index >>> 0));
    if (key === index && key < ((a.length))) {
      (a[key] = value);
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return (a[index]);
  }
  return a.operator$index$1(index);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$.Game$ = function(field) {
  var t1 = $.Array2d_Array2d(field.get$width(), field.get$height(), $.CTC7);
  $.setRuntimeTypeInfo(t1, (({T: 'SquareState'})));
  var t2 = $.EventHandle$();
  $.setRuntimeTypeInfo(t2, (({T: 'EventArgs'})));
  t1 = new $.Game(null, null, $.CTC14, t2, t1, field);
  t1 .Game$1(field);
  return t1;
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(((exception.stack)));
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.jsPropertyAccess = function(jsObject, property) {
  return (jsObject[property]);
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = (({}));
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1 .first_1 = true;
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

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.ReadOnlyCollection$ = function(source) {
  var t1 = $.ListFactory_List$from(source);
  $.setRuntimeTypeInfo(t1, (({E: 'T'})));
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
  if ((!!(list.immutable$list)))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.checkGrowable = function(list, reason) {
  if ((!!(list.fixed$length)))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$.index = function(a, index) {
  if ((typeof a == "string" || a.constructor === Array)) {
    var key = ((index >>> 0));
    if (key === index && key < ((a.length)))
      return (a[key]);
  }
  return $.index$slow(a, index);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a <= b);
  return a.operator$le$1(b);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  return name$;
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return ((a ^ b) >>> 0);
  return a.operator$xor$1(b);
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$._window = function() {
  return ((typeof window != "undefined")) ? ((window)) : null;
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.NullArgumentException$ = function(arg) {
  return new $.NullArgumentException(arg);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true)
    return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1 ._JsSerializer$0();
  return t1;
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
    $.setRuntimeTypeInfo(set, (({E: 'String'})));
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

$.eq = function(a, b) {
  if ((a == null))
    return (b == null);
  if ((b == null))
    return false;
  if ((typeof a === "object"))
    if ((!!a.operator$eq$1))
      return a.operator$eq$1(b);
  return (a === b);
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1 .LinkedHashMapImplementation$0();
  return t1;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1 .DoubleLinkedQueueEntry$1(null);
  t1 ._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$.toStringWrapper = function() {
  return $.toString(((this.dartException)));
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a > b)) : $.gt$slow(a, b) === true;
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
  (Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true}));
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = ((a));
    b = ((b));
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return ((a << b) >>> 0);
  }
  return a.operator$shl$1(b);
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.insertRange$3 = function(receiver, start, length$, initialValue) {
  if ($.isJsArray(receiver) !== true)
    return receiver.insertRange$3(start, length$, initialValue);
  return $.listInsertRange(receiver, start, length$, initialValue);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a < b)) : $.lt$slow(a, b);
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1 ._Manager$0();
  return t1;
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = ((regExp._re));
  return r == null ? ((regExp._re = $.regExpMakeNative(regExp, false))) : r;
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a - b)) : $.sub$slow(a, b);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1 .DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a)))
        return -1;
      if ($.ltB(startIndex, 0))
        startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
        if ($.eqB($.index(a, i), element))
          return i;
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a)))
        return -1;
      if ($.ltB(startIndex, 0))
        startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
        if ($.eqB($.index(a, i), element))
          return i;
      return -1;
  }
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  ;
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
              $.setRuntimeTypeInfo(set, (({E: 'String'})));
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

$.Futures_wait$bailout = function(state, futures, t1) {
  ;
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC0);
    $.setRuntimeTypeInfo(t1, (({T: 'List'})));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, (({T: 'List'})));
  var result = completer.get$future();
  t1 .remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
};

$.Arrays_copy$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var src = env0;
      var srcStart = env1;
      var dst = env2;
      var dstStart = env3;
      var count = env4;
      break;
    case 2:
      src = env0;
      dst = env1;
      dstStart = env2;
      count = env3;
      srcStart = env4;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      srcStart = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (srcStart == null)
        srcStart = 0;
    case 2:
      state = 0;
      if (dstStart == null)
        dstStart = 0;
    case 3:
      state = 0;
      if ($.ltB(srcStart, dstStart))
        for (var i = $.sub($.add(srcStart, count), 1), j = $.sub($.add(dstStart, count), 1); $.geB(i, srcStart); i = $.sub(i, 1), j = $.sub(j, 1))
          $.indexSet(dst, j, $.index(src, i));
      else
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), j = $.add(j, 1))
          $.indexSet(dst, j, $.index(src, i));
  }
};

$.Field_Field$bailout = function(state, mineCount, cols, rows, seed) {
  ;
  var squares = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(squares, (({E: 'bool'})));
  $.insertRange$3(squares, 0, $.mul(rows, cols), false);
  var rnd = $.Random_Random(seed);
  for (var i = 0; $.ltB(i, mineCount); ++i) {
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
  $.setRuntimeTypeInfo(t1, (({T: 'bool'})));
  return $.Field$_internal(mineCount, cols, t1);
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  ;
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
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
  ;
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
  var receiverLength = ((receiver.length));
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

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  ;
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

$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.throwNoSuchMethod.call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC0 = Isolate.makeConstantList([]);
$.CTC5 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC0, {}, 0);
$.CTC15 = new Isolate.$isolateProperties.GameState('Started');
$.CTC9 = new Isolate.$isolateProperties.EventArgs();
$.CTC16 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC7 = new Isolate.$isolateProperties.SquareState('hidden');
$.CTC12 = new Isolate.$isolateProperties.SquareState('mine');
$.CTC19 = new Isolate.$isolateProperties.UnsupportedOperationException('Mutation operations are not supported');
$.CTC25 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC4 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC21 = new Isolate.$isolateProperties.InvalidOperationException('The input sequence is empty.');
$.CTC10 = new Isolate.$isolateProperties.SquareState('safe');
$.CTC18 = new Isolate.$isolateProperties.NotImplementedException(null);
$.CTC8 = new Isolate.$isolateProperties.SquareState('flagged');
$.CTC3 = new Isolate.$isolateProperties.SquareState('revealed');
$.CTC13 = new Isolate.$isolateProperties.GameState('Lost');
$.CTC20 = new Isolate.$isolateProperties._Random();
$.CTC24 = new Isolate.$isolateProperties.Object();
$.CTC17 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC23 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC6 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC14 = new Isolate.$isolateProperties.GameState('Not Started');
$.CTC22 = new Isolate.$isolateProperties.NotImplementedException('must be implemented by subclass');
$.CTC1 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC0, null);
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC11 = new Isolate.$isolateProperties.GameState('Won');
$.GlobalId__globalId = 0;
$._ReceivePortImpl__nextFreeId = 1;
$._TimerFactory__factory = null;
$._cachedBrowserPrefix = null;
$._getTypeNameOf = null;
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
 is$List: function() { return false; },
 is$Map: function() { return false; },
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$Collection: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); }
});

$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
  return (this.toString());
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width?", "name?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
  return (this.toString());
}
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$width: function() {
  return this.getPropertyValue$1('width');
},
 get$height: function() {
  return this.getPropertyValue$1('height');
},
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 getPropertyValue$1: function(propertyName) {
  return (this.getPropertyValue(propertyName));
}
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
}
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?"], {
 toString$0: function() {
  return (this.toString());
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
  return (this.toString());
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return (this.contains(string));
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
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
  $.setRuntimeTypeInfo(t1, (({T: 'String'})));
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
  return (this.toString());
},
 remove$1: function(token) {
  return (this.remove(token));
},
 contains$1: function(token) {
  return (this.contains(token));
},
 add$1: function(token) {
  return (this.add(token));
}
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return (this.clear());
},
 add$2: function(data_OR_file, type) {
  return (this.add(data_OR_file,type));
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
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
  return (this.querySelector(selectors));
},
 $dom_getElementById$1: function(elementId) {
  return (this.getElementById(elementId));
},
 get$on: function() {
  return $._DocumentEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return (this.querySelector(selectors));
},
 get$on: function() {
  return $._ElementEventsImpl$(this);
},
 click$0: function() {
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 get$dataAttributes: function() {
  return $.CTC5;
},
 get$classes: function() {
  var t1 = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(t1, (({E: 'String'})));
  return t1;
},
 get$attributes: function() {
  return $.CTC5;
},
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
  if (this._elements == null)
    this._elements = $.FilteredElementList$(this);
  return this._elements;
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["innerHTML!", "id?"], {
 $dom_setAttribute$2: function(name, value) {
  return (this.setAttribute(name,value));
},
 $dom_removeAttribute$1: function(name) {
  return (this.removeAttribute(name));
},
 $dom_querySelector$1: function(selectors) {
  return (this.querySelector(selectors));
},
 $dom_hasAttribute$1: function(name) {
  return (this.hasAttribute(name));
},
 $dom_getAttribute$1: function(name) {
  return (this.getAttribute(name));
},
 get$$$dom_lastElementChild: function() {
return this.lastElementChild;
},
 get$$$dom_firstElementChild: function() {
return this.firstElementChild;
},
 click$0: function() {
  return (this.click());
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 set$$$dom_className: function(value) {
this.className = value;
},
 get$$$dom_className: function() {
return this.className;
},
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
 get$dataAttributes: function() {
  return $._DataAttributeMap$(this.get$attributes());
},
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
  {
  return $._CssClassSet$(this);
}
  } else {
    return Object.prototype.get$classes.call(this);
  }

},
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
 get$attributes: function() {
  return $._ElementAttributeMap$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["width?", "name?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return (this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1)));
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
  return (this.remove());
}
});

$.$defineNativeClass('EventException', ["name?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
}
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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

$.$defineNativeClass('FileException', ["name?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
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
  $.setRuntimeTypeInfo(t1, (({T: 'File'})));
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
}
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
  $.setRuntimeTypeInfo(t1, (({T: 'num'})));
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
  $.setRuntimeTypeInfo(t1, (({T: 'num'})));
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
  return (this.reset());
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "name?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', ["rows?"], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["width?"], {
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
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
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
  return (this.remove(index));
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
}
});

$.$defineNativeClass('IDBDatabaseException', ["name?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return (this.clear());
},
 add$2: function(value, key) {
  return (this.add(value,key));
},
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["width?", "name?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["width?", "name?", "height?"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["width?", "value=", "pattern?", "name?", "height?"], {
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
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
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
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
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
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
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
  $.setRuntimeTypeInfo(t1, (({T: 'String'})));
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

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 remove$1: function(track) {
  return (this.remove(track));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 add$1: function(track) {
  return (this.add(track));
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return (this.close());
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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

$.$defineNativeClass('MouseEvent', ["toElement?", "shiftKey?", "button?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
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
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
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
  return (this.replaceChild(newChild,oldChild));
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_removeChild$1: function(oldChild) {
  return (this.removeChild(oldChild));
},
 contains$1: function(other) {
  return (this.contains(other));
},
 $dom_appendChild$1: function(newChild) {
  return (this.appendChild(newChild));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
 get$$$dom_attributes: function() {
return this.attributes;
},
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  }  catch (exception) {
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
  for (var t1 = $.iterator(collection), t2 = this._parent; t1 .hasNext$0() === true;)
    t2 .$dom_appendChild$1(t1 .next$0());
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
  return t1;
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._NotificationEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["width?", "name?", "height?"], {
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
}
});

$.$defineNativeClass('PopStateEvent', ["state?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('RangeException', ["name?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('SQLResultSet', ["rows?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
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
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
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
 get$classes: function() {
  if (this.get$_cssClassSet() == null)
    this.set$_cssClassSet($._AttributeClassSet$(this.get$_ptr()));
  return this.get$_cssClassSet();
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
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('SVGFEBlendElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["width?", "height?"], {
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

$.$defineNativeClass('SVGFEGaussianBlurElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["width?", "height?"], {
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

$.$defineNativeClass('SVGForeignObjectElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGLineElement', [], {
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

$.$defineNativeClass('SVGMaskElement', ["width?", "height?"], {
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
  return (this.clear());
}
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGPatternElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRect', ["width?", "height?"], {
});

$.$defineNativeClass('SVGRectElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["width?", "height?"], {
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
  return (this.clear());
}
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
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
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGUseElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
}
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return (this.setItem(key,data));
},
 $dom_removeItem$1: function(key) {
  return (this.removeItem(key));
},
 $dom_key$1: function(index) {
  return (this.key(index));
},
 $dom_getItem$1: function(key) {
  return (this.getItem(key));
},
 $dom_clear$0: function() {
  return (this.clear());
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
  $.setRuntimeTypeInfo(t1, (({T: 'StyleSheet'})));
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

$.$defineNativeClass('HTMLTableCellElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', ["width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', ["width?", "rows?"], {
 insertRow$1: function(index) {
  return (this.insertRow(index));
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', ["cells?"], {
 insertCell$1: function(index) {
  return (this.insertCell(index));
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', ["rows?"], {
 insertRow$1: function(index) {
  return (this.insertRow(index));
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "rows?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
}
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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

$.$defineNativeClass('TouchEvent', ["shiftKey?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
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
  $.setRuntimeTypeInfo(t1, (({T: 'Touch'})));
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
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
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
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
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
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
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

$.$defineNativeClass('HTMLVideoElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WebSocket', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$2: function(code, reason) {
  return (this.close(code,reason));
},
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
}
});

$.$defineNativeClass('DOMWindow', ["navigator?", "name?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
},
 setInterval$2: function(handler, timeout) {
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._WindowEventsImpl$(this);
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
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
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
},
 setInterval$2: function(handler, timeout) {
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
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
  return (this.toString());
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
}
});

$.$defineNativeClass('XMLHttpRequestException', ["name?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
}
});

$.$defineNativeClass('XPathException', ["name?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return (this.reset());
}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
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
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 setTimeout$2: function(handler, timeout) {
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
}
});

// 303 dynamic classes.
// 321 classes
// 28 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v6/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v7/*class(_ElementImpl)*/ = [v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v8/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v9/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v10/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v11/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v12/*class(_NodeImpl)*/ = [v7/*class(_ElementImpl)*/,v8/*class(_DocumentFragmentImpl)*/,v9/*class(_DocumentImpl)*/,v10/*class(_CharacterDataImpl)*/,v7/*class(_ElementImpl)*/,v8/*class(_DocumentFragmentImpl)*/,v9/*class(_DocumentImpl)*/,v10/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v13/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v14/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v15/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['AbstractWorker', v15/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v11/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v10/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v9/*class(_DocumentImpl)*/],
    ['DocumentFragment', v8/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v5/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v6/*class(_MediaElementImpl)*/],
    ['Element', v7/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Node', v12/*class(_NodeImpl)*/],
    ['MediaStream', v13/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v14/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v11/*class(_WorkerContextImpl)*/,v12/*class(_NodeImpl)*/,v13/*class(_MediaStreamImpl)*/,v14/*class(_IDBRequestImpl)*/,v15/*class(_AbstractWorkerImpl)*/,v11/*class(_WorkerContextImpl)*/,v12/*class(_NodeImpl)*/,v13/*class(_MediaStreamImpl)*/,v14/*class(_IDBRequestImpl)*/,v15/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['MouseEvent', 'MouseEvent|WheelEvent|WheelEvent'],
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
