// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredModules` is a JS function that takes an array of module names
  //   matching wasm files produced by the dart2wasm compiler. It also takes a
  //   callback that should be invoked for each loaded module with 2 arugments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDeferredId` is a JS function that takes load ID produced by the
  //   compiler when the `load-ids` option is passed. Each load ID maps to one
  //   or more wasm files as specified in the emitted JSON file. It also takes a
  //   callback that should be invoked for each loaded module with 2 arugments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDynamicModule` is a JS function that takes two string names matching,
  //   in order, a wasm file produced by the dart2wasm compiler during dynamic
  //   module compilation and a corresponding js file produced by the same
  //   compilation. It also takes a callback that should be invoked with the
  //   loaded module in a format supported by `WebAssembly.compile` or
  //   `WebAssembly.compileStreaming` and the result of using the JS 'import'
  //   API on the js file path. It should return a Promise that resolves when
  //   all the modules have been loaded and the callback promises have resolved.
  async instantiate(additionalImports,
      {loadDeferredModules, loadDynamicModule, loadDeferredId} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + value;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {
            _1: (decoder, codeUnits) => decoder.decode(codeUnits),
      _2: () => new TextDecoder("utf-8", {fatal: true}),
      _3: () => new TextDecoder("utf-8", {fatal: false}),
      _4: (s) => +s,
      _5: Date.now,
      _7: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _8: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _9: () => new Error().stack,
      _10: () => typeof dartUseDateNowForTicks !== "undefined",
      _11: () => 1000 * performance.now(),
      _12: () => Date.now(),
      _13: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      _14: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      _18: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      _19: (exn) => {
        let stackString = exn.toString();
        let frames = stackString.split('\n');
        let drop = 2;
        if (frames[0].startsWith('Error')) {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _32: s => JSON.stringify(s),
      _33: s => printToConsole(s),
      _34: o => {
        if (o === null || o === undefined) return 0;
        if (typeof(o) === 'string') return 1;
        return 2;
      },
      _35: (o, p, r) => o.replaceAll(p, () => r),
      _36: (o, p, r) => o.replace(p, () => r),
      _37: Function.prototype.call.bind(String.prototype.toLowerCase),
      _38: s => s.toUpperCase(),
      _39: s => s.trim(),
      _42: (string, times) => string.repeat(times),
      _43: Function.prototype.call.bind(String.prototype.indexOf),
      _44: (s, p, i) => s.lastIndexOf(p, i),
      _45: (string, token) => string.split(token),
      _46: Object.is,
      _50: (o, c) => o instanceof c,
      _82: x0 => new Array(x0),
      _84: x0 => x0.length,
      _86: (x0,x1) => x0[x1],
      _87: (x0,x1,x2) => { x0[x1] = x2 },
      _91: (x0,x1,x2) => new DataView(x0,x1,x2),
      _93: x0 => new Int8Array(x0),
      _94: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _95: x0 => new Uint8Array(x0),
      _97: x0 => new Uint8ClampedArray(x0),
      _99: x0 => new Int16Array(x0),
      _101: x0 => new Uint16Array(x0),
      _103: x0 => new Int32Array(x0),
      _105: x0 => new Uint32Array(x0),
      _107: x0 => new Float32Array(x0),
      _109: x0 => new Float64Array(x0),
      _134: x0 => x0.random(),
      _137: () => globalThis.Math,
      _150: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _151: (handle) => clearTimeout(handle),
      _154: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _156: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _157: (x0,x1) => x0.exec(x1),
      _158: (x0,x1) => x0.test(x1),
      _159: x0 => x0.pop(),
      _161: o => o === undefined,
      _163: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _166: o => o instanceof RegExp,
      _167: (l, r) => l === r,
      _168: o => o,
      _169: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      _170: o => o,
      _171: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      _172: o => o,
      _173: b => !!b,
      _174: o => o.length,
      _176: (o, i) => o[i],
      _177: f => f.dartFunction,
      _178: () => ({}),
      _179: () => [],
      _181: () => globalThis,
      _184: (o, p) => o[p],
      _185: (o, p, v) => o[p] = v,
      _188: o => String(o),
      _189: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      _190: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._190(f,arguments.length,x0) }),
      _191: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports._191(f,arguments.length,x0,x1) }),
      _192: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        // Feature check for `SharedArrayBuffer` before doing a type-check.
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
            return 17;
        }
        if (o instanceof Promise) return 18;
        return 19;
      },
      _193: o => [o],
      _194: (o0, o1) => [o0, o1],
      _195: (o0, o1, o2) => [o0, o1, o2],
      _196: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      _197: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _198: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _199: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI16ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _201: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _203: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _207: x0 => new ArrayBuffer(x0),
      _210: x0 => x0.index,
      _212: x0 => x0.flags,
      _213: x0 => x0.multiline,
      _214: x0 => x0.ignoreCase,
      _215: x0 => x0.unicode,
      _216: x0 => x0.dotAll,
      _217: (x0,x1) => { x0.lastIndex = x1 },
      _218: (o, p) => p in o,
      _219: (o, p) => o[p],
      _228: (x0,x1) => x0.createElement(x1),
      _230: (x0,x1) => x0.querySelector(x1),
      _231: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._231(f,arguments.length,x0) }),
      _232: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._232(f,arguments.length,x0) }),
      _233: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _234: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      _235: x0 => x0.preventDefault(),
      _240: () => new AbortController(),
      _241: x0 => x0.abort(),
      _242: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      _243: (x0,x1) => globalThis.fetch(x0,x1),
      _244: (x0,x1) => x0.get(x1),
      _245: (module,f) => finalizeWrapper(f, function(x0,x1,x2) { return module.exports._245(f,arguments.length,x0,x1,x2) }),
      _246: (x0,x1) => x0.forEach(x1),
      _247: x0 => x0.getReader(),
      _248: x0 => x0.cancel(),
      _249: x0 => x0.read(),
      _250: x0 => x0.load(),
      _251: (x0,x1) => x0.canPlayType(x1),
      _252: (x0,x1) => x0.cloneNode(x1),
      _253: x0 => x0.pause(),
      _254: x0 => x0.play(),
      _255: x0 => x0.createGain(),
      _256: (x0,x1) => x0.connect(x1),
      _257: (x0,x1,x2) => x0.setValueAtTime(x1,x2),
      _258: () => new AudioContext(),
      _259: (x0,x1) => x0.decodeAudioData(x1),
      _261: x0 => x0.createBufferSource(),
      _262: (x0,x1,x2) => x0.start(x1,x2),
      _263: (x0,x1,x2,x3) => x0.start(x1,x2,x3),
      _266: (x0,x1,x2) => ({event_category: x0,event_label: x1,value: x2}),
      _267: x0 => new Blob(x0),
      _268: (x0,x1) => x0.createImageBitmap(x1),
      _269: (x0,x1,x2,x3,x4) => x0.clearRect(x1,x2,x3,x4),
      _270: (x0,x1,x2,x3,x4) => x0.fillRect(x1,x2,x3,x4),
      _271: (x0,x1,x2,x3,x4,x5,x6) => x0.setTransform(x1,x2,x3,x4,x5,x6),
      _273: (x0,x1,x2,x3,x4) => x0.rect(x1,x2,x3,x4),
      _274: x0 => x0.getBoundingClientRect(),
      _275: x0 => x0.focus(),
      _276: (x0,x1) => x0.item(x1),
      _277: (x0,x1,x2) => x0.uniform1i(x1,x2),
      _282: x0 => x0.save(),
      _283: x0 => x0.clip(),
      _284: x0 => x0.restore(),
      _285: (x0,x1) => x0.append(x1),
      _286: x0 => x0.remove(),
      _287: (x0,x1) => x0.measureText(x1),
      _288: x0 => x0.beginPath(),
      _289: (x0,x1,x2,x3) => x0.strokeText(x1,x2,x3),
      _290: (x0,x1,x2,x3) => x0.fillText(x1,x2,x3),
      _291: (x0,x1,x2) => x0.moveTo(x1,x2),
      _292: (x0,x1,x2) => x0.lineTo(x1,x2),
      _297: (x0,x1) => x0.appendChild(x1),
      _300: x0 => x0.closePath(),
      _308: x0 => x0.fill(),
      _309: (x0,x1,x2,x3,x4,x5,x6) => x0.transform(x1,x2,x3,x4,x5,x6),
      _312: (x0,x1,x2) => x0.blendFunc(x1,x2),
      _313: (x0,x1) => x0.blendEquation(x1),
      _315: x0 => x0.createBuffer(),
      _316: (x0,x1,x2) => x0.bindBuffer(x1,x2),
      _317: (x0,x1,x2,x3) => x0.bufferData(x1,x2,x3),
      _318: (x0,x1,x2,x3) => x0.bufferSubData(x1,x2,x3),
      _319: (x0,x1,x2,x3,x4,x5,x6) => x0.vertexAttribPointer(x1,x2,x3,x4,x5,x6),
      _320: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) => x0.drawImage(x1,x2,x3,x4,x5,x6,x7,x8,x9),
      _321: (x0,x1,x2,x3) => x0.drawImage(x1,x2,x3),
      _322: (x0,x1) => x0.enable(x1),
      _323: (x0,x1) => x0.disable(x1),
      _324: (x0,x1,x2) => x0.pixelStorei(x1,x2),
      _326: (x0,x1,x2) => x0.bindFramebuffer(x1,x2),
      _327: (x0,x1,x2,x3,x4) => x0.viewport(x1,x2,x3,x4),
      _328: (x0,x1,x2,x3,x4) => x0.colorMask(x1,x2,x3,x4),
      _329: (x0,x1,x2,x3,x4) => x0.clearColor(x1,x2,x3,x4),
      _330: (x0,x1) => x0.clear(x1),
      _332: (x0,x1,x2,x3) => x0.stencilFunc(x1,x2,x3),
      _333: (x0,x1) => x0.activeTexture(x1),
      _334: (x0,x1,x2) => x0.bindTexture(x1,x2),
      _337: x0 => x0.createFramebuffer(),
      _338: (x0,x1,x2,x3,x4,x5) => x0.framebufferTexture2D(x1,x2,x3,x4,x5),
      _339: (x0,x1,x2,x3,x4) => x0.framebufferRenderbuffer(x1,x2,x3,x4),
      _340: (x0,x1,x2,x3) => x0.uniformMatrix4fv(x1,x2,x3),
      _341: (x0,x1) => x0.useProgram(x1),
      _342: (x0,x1,x2,x3,x4) => x0.drawElements(x1,x2,x3,x4),
      _343: x0 => x0.createProgram(),
      _344: (x0,x1,x2) => x0.attachShader(x1,x2),
      _345: (x0,x1) => x0.linkProgram(x1),
      _346: (x0,x1,x2) => x0.getProgramParameter(x1,x2),
      _347: x0 => x0.isContextLost(),
      _348: (x0,x1) => x0.getProgramInfoLog(x1),
      _349: (x0,x1) => x0.createShader(x1),
      _350: (x0,x1,x2) => x0.shaderSource(x1,x2),
      _351: (x0,x1) => x0.compileShader(x1),
      _352: (x0,x1,x2) => x0.getShaderParameter(x1,x2),
      _353: (x0,x1) => x0.getShaderInfoLog(x1),
      _354: (x0,x1,x2) => x0.getActiveAttrib(x1,x2),
      _355: (x0,x1,x2) => x0.getAttribLocation(x1,x2),
      _356: (x0,x1) => x0.enableVertexAttribArray(x1),
      _357: (x0,x1,x2) => x0.getActiveUniform(x1,x2),
      _358: (x0,x1,x2) => x0.getUniformLocation(x1,x2),
      _360: (x0,x1,x2,x3,x4) => x0.renderbufferStorage(x1,x2,x3,x4),
      _361: x0 => x0.createRenderbuffer(),
      _362: (x0,x1,x2) => x0.bindRenderbuffer(x1,x2),
      _363: (x0,x1,x2,x3,x4,x5) => x0.drawImage(x1,x2,x3,x4,x5),
      _364: (x0,x1,x2,x3) => x0.texParameteri(x1,x2,x3),
      _367: (x0,x1,x2,x3,x4,x5,x6,x7,x8) => x0.texImage2D(x1,x2,x3,x4,x5,x6,x7,x8),
      _368: (x0,x1) => x0.isEnabled(x1),
      _369: (x0,x1,x2,x3,x4,x5,x6) => x0.texImage2D(x1,x2,x3,x4,x5,x6),
      _370: x0 => x0.createTexture(),
      _371: x0 => x0.getError(),
      _375: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._375(f,arguments.length,x0) }),
      _376: (x0,x1) => x0.requestAnimationFrame(x1),
      _377: x0 => new TouchEvent(x0),
      _378: x0 => x0.clear(),
      _380: (x0,x1,x2) => x0.setItem(x1,x2),
      _381: (x0,x1) => x0.getItem(x1),
      _382: (x0,x1) => x0.assign(x1),
      _383: (x0,x1) => x0.replace(x1),
      _384: x0 => x0.reload(),
      _385: (x0,x1,x2) => globalThis.gtag(x0,x1,x2),
      _386: (x0,x1) => x0.error(x1),
      _387: x0 => x0.now(),
      _388: (x0,x1,x2,x3) => ({event_category: x0,event_label: x1,value: x2,name: x3}),
      _393: o => o instanceof Array,
      _402: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
      _403: a => a.length,
      _405: (a, i) => a[i],
      _406: (a, i, v) => a[i] = v,
      _408: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof ArrayBuffer) return 1;
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
          return 2;
        }
        return 3;
      },
      _411: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      _412: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _413: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      _414: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _415: o => o instanceof Uint8ClampedArray,
      _416: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _417: o => o instanceof Uint16Array,
      _418: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _419: o => o instanceof Int16Array,
      _420: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _421: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      _422: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _423: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      _424: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _427: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      _428: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _429: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      _430: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _431: (a, i) => a.push(i),
      _432: (t, s) => t.set(s),
      _434: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _436: o => o.buffer,
      _437: o => o.byteOffset,
      _438: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _439: (b, o) => new DataView(b, o),
      _440: (b, o, l) => new DataView(b, o, l),
      _441: Function.prototype.call.bind(DataView.prototype.getUint8),
      _442: Function.prototype.call.bind(DataView.prototype.setUint8),
      _443: Function.prototype.call.bind(DataView.prototype.getInt8),
      _444: Function.prototype.call.bind(DataView.prototype.setInt8),
      _445: Function.prototype.call.bind(DataView.prototype.getUint16),
      _446: Function.prototype.call.bind(DataView.prototype.setUint16),
      _447: Function.prototype.call.bind(DataView.prototype.getInt16),
      _448: Function.prototype.call.bind(DataView.prototype.setInt16),
      _449: Function.prototype.call.bind(DataView.prototype.getUint32),
      _450: Function.prototype.call.bind(DataView.prototype.setUint32),
      _451: Function.prototype.call.bind(DataView.prototype.getInt32),
      _452: Function.prototype.call.bind(DataView.prototype.setInt32),
      _457: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _458: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _459: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _460: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _461: Function.prototype.call.bind(Number.prototype.toString),
      _462: Function.prototype.call.bind(BigInt.prototype.toString),
      _463: Function.prototype.call.bind(Number.prototype.toString),
      _464: (d, digits) => d.toFixed(digits),
      _470: (x0,x1) => x0.getContext(x1),
      _473: (x0,x1,x2) => x0.getContext(x1,x2),
      _597: x0 => x0.offsetTop,
      _601: x0 => x0.style,
      _803: x0 => x0.tabIndex,
      _804: (x0,x1) => { x0.tabIndex = x1 },
      _1032: x0 => x0.src,
      _1033: (x0,x1) => { x0.src = x1 },
      _1044: x0 => x0.width,
      _1046: x0 => x0.height,
      _1203: x0 => x0.error,
      _1204: x0 => x0.src,
      _1205: (x0,x1) => { x0.src = x1 },
      _1213: (x0,x1) => { x0.preload = x1 },
      _1215: x0 => x0.readyState,
      _1217: x0 => x0.currentTime,
      _1218: (x0,x1) => { x0.currentTime = x1 },
      _1237: (x0,x1) => { x0.volume = x1 },
      _1879: x0 => x0.width,
      _1880: (x0,x1) => { x0.width = x1 },
      _1881: x0 => x0.height,
      _1882: (x0,x1) => { x0.height = x1 },
      _1915: (x0,x1) => { x0.globalAlpha = x1 },
      _1917: (x0,x1) => { x0.globalCompositeOperation = x1 },
      _1923: (x0,x1) => { x0.strokeStyle = x1 },
      _1925: (x0,x1) => { x0.fillStyle = x1 },
      _1937: (x0,x1) => { x0.lineWidth = x1 },
      _1939: (x0,x1) => { x0.lineCap = x1 },
      _1941: (x0,x1) => { x0.lineJoin = x1 },
      _1947: (x0,x1) => { x0.font = x1 },
      _1949: (x0,x1) => { x0.textAlign = x1 },
      _1951: (x0,x1) => { x0.textBaseline = x1 },
      _1967: x0 => x0.width,
      _2274: x0 => x0.dataTransfer,
      _2278: () => globalThis.window,
      _2321: x0 => x0.location,
      _2340: x0 => x0.navigator,
      _2356: x0 => x0.devicePixelRatio,
      _2599: x0 => x0.performance,
      _2604: x0 => x0.localStorage,
      _2609: x0 => x0.href,
      _2624: x0 => x0.hash,
      _2726: x0 => x0.userAgent,
      _2759: x0 => x0.width,
      _2760: x0 => x0.height,
      _3918: x0 => x0.name,
      _4259: x0 => x0.destination,
      _4261: x0 => x0.currentTime,
      _4390: (x0,x1) => { x0.buffer = x1 },
      _4394: (x0,x1) => { x0.loop = x1 },
      _4396: (x0,x1) => { x0.loopStart = x1 },
      _4398: (x0,x1) => { x0.loopEnd = x1 },
      _4503: x0 => x0.gain,
      _4771: x0 => x0.type,
      _4772: x0 => x0.target,
      _4779: x0 => x0.cancelable,
      _4812: x0 => x0.signal,
      _4882: (x0,x1) => { x0.textContent = x1 },
      _4886: () => globalThis.document,
      _4968: x0 => x0.body,
      _5318: x0 => x0.clientTop,
      _5319: x0 => x0.clientLeft,
      _5320: x0 => x0.clientWidth,
      _5321: x0 => x0.clientHeight,
      _5636: x0 => x0.clientX,
      _5637: x0 => x0.clientY,
      _5638: x0 => x0.ctrlKey,
      _5639: x0 => x0.shiftKey,
      _5640: x0 => x0.altKey,
      _5642: x0 => x0.button,
      _5702: x0 => x0.deltaX,
      _5703: x0 => x0.deltaY,
      _5735: x0 => x0.key,
      _5745: x0 => x0.keyCode,
      _5807: x0 => x0.identifier,
      _5811: x0 => x0.clientX,
      _5812: x0 => x0.clientY,
      _5822: x0 => x0.length,
      _5833: x0 => x0.changedTouches,
      _5834: x0 => x0.altKey,
      _5836: x0 => x0.ctrlKey,
      _5837: x0 => x0.shiftKey,
      _6648: x0 => x0.value,
      _6650: x0 => x0.done,
      _7352: x0 => x0.url,
      _7354: x0 => x0.status,
      _7356: x0 => x0.statusText,
      _7357: x0 => x0.headers,
      _7358: x0 => x0.body,
      _9753: (x0,x1) => { x0.cursor = x1 },
      _9763: (x0,x1) => { x0.display = x1 },
      _9825: (x0,x1) => { x0.font = x1 },
      _9927: (x0,x1) => { x0.height = x1 },
      _10144: x0 => x0.outline,
      _10145: (x0,x1) => { x0.outline = x1 },
      _10577: (x0,x1) => { x0.verticalAlign = x1 },
      _10617: (x0,x1) => { x0.width = x1 },
      _10985: x0 => x0.name,
      _11322: x0 => x0.top,
      _11325: x0 => x0.left,
      _11705: () => globalThis.console,

    };

    const baseImports = {
      dart2wasm: dart2wasm,
      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
      WebAssembly: {
        JSTag: WebAssembly.JSTag,
      },
      "": new Proxy({}, { get(_, prop) { return prop; } }),

    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
      "intoCharCodeArray": (s, a, start) => {
        if (s === '') return 0;

        const write = dartInstance.exports.$wasmI16ArraySet;
        for (var i = 0; i < s.length; ++i) {
          write(a, start++, s.charCodeAt(i));
        }
        return s.length;
      },
      "test": (s) => typeof s == "string",
    };


    

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      
      "wasm:js-string": jsStringPolyfill,
    });
    dartInstance.exports.$setThisModule(dartInstance);

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}
