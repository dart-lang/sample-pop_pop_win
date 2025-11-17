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
  // `loadDeferredWasm` is a JS function that takes a module name matching a
  //   wasm file produced by the dart2wasm compiler and returns the bytes to
  //   load the module. These bytes can be in either a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  // `loadDynamicModule` is a JS function that takes two string names matching,
  //   in order, a wasm file produced by the dart2wasm compiler during dynamic
  //   module compilation and a corresponding js file produced by the same
  //   compilation. It should return a JS Array containing 2 elements. The first
  //   should be the bytes for the wasm module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The second
  //   should be the result of using the JS 'import' API on the js file path.
  async instantiate(additionalImports, {loadDeferredWasm, loadDynamicModule} = {}) {
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
            _4: (o, c) => o instanceof c,
      _36: x0 => new Array(x0),
      _38: x0 => x0.length,
      _40: (x0,x1) => x0[x1],
      _41: (x0,x1,x2) => { x0[x1] = x2 },
      _45: (x0,x1,x2) => new DataView(x0,x1,x2),
      _47: x0 => new Int8Array(x0),
      _48: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _49: x0 => new Uint8Array(x0),
      _51: x0 => new Uint8ClampedArray(x0),
      _53: x0 => new Int16Array(x0),
      _55: x0 => new Uint16Array(x0),
      _57: x0 => new Int32Array(x0),
      _59: x0 => new Uint32Array(x0),
      _61: x0 => new Float32Array(x0),
      _63: x0 => new Float64Array(x0),
      _70: (decoder, codeUnits) => decoder.decode(codeUnits),
      _71: () => new TextDecoder("utf-8", {fatal: true}),
      _72: () => new TextDecoder("utf-8", {fatal: false}),
      _73: (s) => +s,
      _74: Date.now,
      _76: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _77: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _78: () => {
        let stackString = new Error().stack.toString();
        let frames = stackString.split('\n');
        let drop = 2;
        if (frames[0] === 'Error') {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _79: () => typeof dartUseDateNowForTicks !== "undefined",
      _80: () => 1000 * performance.now(),
      _81: () => Date.now(),
      _82: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      _83: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      _99: s => JSON.stringify(s),
      _100: s => printToConsole(s),
      _101: (o, p, r) => o.replaceAll(p, () => r),
      _102: (o, p, r) => o.replace(p, () => r),
      _103: Function.prototype.call.bind(String.prototype.toLowerCase),
      _104: s => s.toUpperCase(),
      _105: s => s.trim(),
      _108: (string, times) => string.repeat(times),
      _109: Function.prototype.call.bind(String.prototype.indexOf),
      _110: (s, p, i) => s.lastIndexOf(p, i),
      _111: (string, token) => string.split(token),
      _112: Object.is,
      _113: o => o instanceof Array,
      _123: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
      _124: a => a.length,
      _126: (a, i) => a[i],
      _127: (a, i, v) => a[i] = v,
      _129: o => {
        if (o instanceof ArrayBuffer) return 0;
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
          return 1;
        }
        return 2;
      },
      _132: o => o instanceof Uint8Array,
      _133: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _134: o => o instanceof Int8Array,
      _135: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _136: o => o instanceof Uint8ClampedArray,
      _137: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _138: o => o instanceof Uint16Array,
      _139: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _140: o => o instanceof Int16Array,
      _141: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _142: o => o instanceof Uint32Array,
      _143: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _144: o => o instanceof Int32Array,
      _145: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _148: o => o instanceof Float32Array,
      _149: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _150: o => o instanceof Float64Array,
      _151: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _152: (t, s) => t.set(s),
      _154: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _156: o => o.buffer,
      _157: o => o.byteOffset,
      _158: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _159: (b, o) => new DataView(b, o),
      _160: (b, o, l) => new DataView(b, o, l),
      _161: Function.prototype.call.bind(DataView.prototype.getUint8),
      _162: Function.prototype.call.bind(DataView.prototype.setUint8),
      _163: Function.prototype.call.bind(DataView.prototype.getInt8),
      _164: Function.prototype.call.bind(DataView.prototype.setInt8),
      _165: Function.prototype.call.bind(DataView.prototype.getUint16),
      _166: Function.prototype.call.bind(DataView.prototype.setUint16),
      _167: Function.prototype.call.bind(DataView.prototype.getInt16),
      _168: Function.prototype.call.bind(DataView.prototype.setInt16),
      _169: Function.prototype.call.bind(DataView.prototype.getUint32),
      _170: Function.prototype.call.bind(DataView.prototype.setUint32),
      _171: Function.prototype.call.bind(DataView.prototype.getInt32),
      _172: Function.prototype.call.bind(DataView.prototype.setInt32),
      _177: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _178: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _179: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _180: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _193: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _194: (handle) => clearTimeout(handle),
      _197: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _199: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _200: (x0,x1) => x0.exec(x1),
      _201: (x0,x1) => x0.test(x1),
      _202: x0 => x0.pop(),
      _204: o => o === undefined,
      _206: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _209: o => o instanceof RegExp,
      _210: (l, r) => l === r,
      _211: o => o,
      _212: o => o,
      _213: o => o,
      _214: b => !!b,
      _215: o => o.length,
      _217: (o, i) => o[i],
      _218: f => f.dartFunction,
      _219: () => ({}),
      _220: () => [],
      _222: () => globalThis,
      _225: (o, p) => o[p],
      _226: (o, p, v) => o[p] = v,
      _227: (o, m, a) => o[m].apply(o, a),
      _229: o => String(o),
      _230: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      _231: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._231(f,arguments.length,x0) }),
      _232: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._232(f,arguments.length,x0,x1) }),
      _233: o => {
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
      _234: o => [o],
      _235: (o0, o1) => [o0, o1],
      _236: (o0, o1, o2) => [o0, o1, o2],
      _237: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      _238: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _239: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _240: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI16ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _242: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _244: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _248: x0 => new ArrayBuffer(x0),
      _251: x0 => x0.index,
      _253: x0 => x0.flags,
      _254: x0 => x0.multiline,
      _255: x0 => x0.ignoreCase,
      _256: x0 => x0.unicode,
      _257: x0 => x0.dotAll,
      _258: (x0,x1) => { x0.lastIndex = x1 },
      _259: (o, p) => p in o,
      _260: (o, p) => o[p],
      _269: (x0,x1) => x0.createElement(x1),
      _271: (x0,x1) => x0.querySelector(x1),
      _272: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._272(f,arguments.length,x0) }),
      _273: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._273(f,arguments.length,x0) }),
      _274: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _275: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      _276: x0 => x0.preventDefault(),
      _281: () => new AbortController(),
      _282: x0 => x0.abort(),
      _283: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      _284: (x0,x1) => globalThis.fetch(x0,x1),
      _285: (x0,x1) => x0.get(x1),
      _286: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._286(f,arguments.length,x0,x1,x2) }),
      _287: (x0,x1) => x0.forEach(x1),
      _288: x0 => x0.getReader(),
      _289: x0 => x0.cancel(),
      _290: x0 => x0.read(),
      _291: x0 => x0.load(),
      _292: (x0,x1) => x0.canPlayType(x1),
      _293: (x0,x1) => x0.cloneNode(x1),
      _294: x0 => x0.pause(),
      _295: x0 => x0.play(),
      _296: x0 => x0.createGain(),
      _297: (x0,x1) => x0.connect(x1),
      _298: (x0,x1,x2) => x0.setValueAtTime(x1,x2),
      _299: () => new AudioContext(),
      _300: (x0,x1) => x0.decodeAudioData(x1),
      _302: x0 => x0.createBufferSource(),
      _303: (x0,x1,x2) => x0.start(x1,x2),
      _304: (x0,x1,x2,x3) => x0.start(x1,x2,x3),
      _307: (x0,x1,x2) => ({event_category: x0,event_label: x1,value: x2}),
      _308: x0 => new Blob(x0),
      _309: (x0,x1) => x0.createImageBitmap(x1),
      _310: (x0,x1,x2,x3,x4) => x0.clearRect(x1,x2,x3,x4),
      _311: (x0,x1,x2,x3,x4) => x0.fillRect(x1,x2,x3,x4),
      _312: (x0,x1,x2,x3,x4,x5,x6) => x0.setTransform(x1,x2,x3,x4,x5,x6),
      _314: (x0,x1,x2,x3,x4) => x0.rect(x1,x2,x3,x4),
      _315: x0 => x0.getBoundingClientRect(),
      _316: x0 => x0.focus(),
      _317: (x0,x1) => x0.item(x1),
      _318: (x0,x1,x2) => x0.uniform1i(x1,x2),
      _323: x0 => x0.save(),
      _324: x0 => x0.clip(),
      _325: x0 => x0.restore(),
      _326: (x0,x1) => x0.append(x1),
      _327: x0 => x0.remove(),
      _328: (x0,x1) => x0.measureText(x1),
      _329: x0 => x0.beginPath(),
      _330: (x0,x1,x2,x3) => x0.strokeText(x1,x2,x3),
      _331: (x0,x1,x2,x3) => x0.fillText(x1,x2,x3),
      _332: (x0,x1,x2) => x0.moveTo(x1,x2),
      _333: (x0,x1,x2) => x0.lineTo(x1,x2),
      _338: (x0,x1) => x0.appendChild(x1),
      _341: x0 => x0.closePath(),
      _349: x0 => x0.fill(),
      _350: (x0,x1,x2,x3,x4,x5,x6) => x0.transform(x1,x2,x3,x4,x5,x6),
      _353: (x0,x1,x2) => x0.blendFunc(x1,x2),
      _354: (x0,x1) => x0.blendEquation(x1),
      _356: x0 => x0.createBuffer(),
      _357: (x0,x1,x2) => x0.bindBuffer(x1,x2),
      _358: (x0,x1,x2,x3) => x0.bufferData(x1,x2,x3),
      _359: (x0,x1,x2,x3) => x0.bufferSubData(x1,x2,x3),
      _360: (x0,x1,x2,x3,x4,x5,x6) => x0.vertexAttribPointer(x1,x2,x3,x4,x5,x6),
      _361: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) => x0.drawImage(x1,x2,x3,x4,x5,x6,x7,x8,x9),
      _362: (x0,x1,x2,x3) => x0.drawImage(x1,x2,x3),
      _363: (x0,x1) => x0.enable(x1),
      _364: (x0,x1) => x0.disable(x1),
      _365: (x0,x1,x2) => x0.pixelStorei(x1,x2),
      _367: (x0,x1,x2) => x0.bindFramebuffer(x1,x2),
      _368: (x0,x1,x2,x3,x4) => x0.viewport(x1,x2,x3,x4),
      _369: (x0,x1,x2,x3,x4) => x0.colorMask(x1,x2,x3,x4),
      _370: (x0,x1,x2,x3,x4) => x0.clearColor(x1,x2,x3,x4),
      _371: (x0,x1) => x0.clear(x1),
      _373: (x0,x1,x2,x3) => x0.stencilFunc(x1,x2,x3),
      _374: (x0,x1) => x0.activeTexture(x1),
      _375: (x0,x1,x2) => x0.bindTexture(x1,x2),
      _378: x0 => x0.createFramebuffer(),
      _379: (x0,x1,x2,x3,x4,x5) => x0.framebufferTexture2D(x1,x2,x3,x4,x5),
      _380: (x0,x1,x2,x3,x4) => x0.framebufferRenderbuffer(x1,x2,x3,x4),
      _381: (x0,x1,x2,x3) => x0.uniformMatrix4fv(x1,x2,x3),
      _382: (x0,x1) => x0.useProgram(x1),
      _383: (x0,x1,x2,x3,x4) => x0.drawElements(x1,x2,x3,x4),
      _384: x0 => x0.createProgram(),
      _385: (x0,x1,x2) => x0.attachShader(x1,x2),
      _386: (x0,x1) => x0.linkProgram(x1),
      _387: (x0,x1,x2) => x0.getProgramParameter(x1,x2),
      _388: x0 => x0.isContextLost(),
      _389: (x0,x1) => x0.getProgramInfoLog(x1),
      _390: (x0,x1) => x0.createShader(x1),
      _391: (x0,x1,x2) => x0.shaderSource(x1,x2),
      _392: (x0,x1) => x0.compileShader(x1),
      _393: (x0,x1,x2) => x0.getShaderParameter(x1,x2),
      _394: (x0,x1) => x0.getShaderInfoLog(x1),
      _395: (x0,x1,x2) => x0.getActiveAttrib(x1,x2),
      _396: (x0,x1,x2) => x0.getAttribLocation(x1,x2),
      _397: (x0,x1) => x0.enableVertexAttribArray(x1),
      _398: (x0,x1,x2) => x0.getActiveUniform(x1,x2),
      _399: (x0,x1,x2) => x0.getUniformLocation(x1,x2),
      _401: (x0,x1,x2,x3,x4) => x0.renderbufferStorage(x1,x2,x3,x4),
      _402: x0 => x0.createRenderbuffer(),
      _403: (x0,x1,x2) => x0.bindRenderbuffer(x1,x2),
      _404: (x0,x1,x2,x3,x4,x5) => x0.drawImage(x1,x2,x3,x4,x5),
      _405: (x0,x1,x2,x3) => x0.texParameteri(x1,x2,x3),
      _408: (x0,x1,x2,x3,x4,x5,x6,x7,x8) => x0.texImage2D(x1,x2,x3,x4,x5,x6,x7,x8),
      _409: (x0,x1) => x0.isEnabled(x1),
      _410: (x0,x1,x2,x3,x4,x5,x6) => x0.texImage2D(x1,x2,x3,x4,x5,x6),
      _411: x0 => x0.createTexture(),
      _412: x0 => x0.getError(),
      _416: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._416(f,arguments.length,x0) }),
      _417: (x0,x1) => x0.requestAnimationFrame(x1),
      _418: x0 => new TouchEvent(x0),
      _419: x0 => x0.clear(),
      _421: (x0,x1,x2) => x0.setItem(x1,x2),
      _422: (x0,x1) => x0.getItem(x1),
      _423: (x0,x1) => x0.assign(x1),
      _424: (x0,x1) => x0.replace(x1),
      _425: x0 => x0.reload(),
      _426: (x0,x1,x2) => globalThis.gtag(x0,x1,x2),
      _427: (x0,x1) => x0.error(x1),
      _428: x0 => x0.now(),
      _429: (x0,x1,x2,x3) => ({event_category: x0,event_label: x1,value: x2,name: x3}),
      _434: x0 => x0.random(),
      _437: () => globalThis.Math,
      _440: (x0,x1) => x0.getContext(x1),
      _443: (x0,x1,x2) => x0.getContext(x1,x2),
      _445: Function.prototype.call.bind(Number.prototype.toString),
      _446: Function.prototype.call.bind(BigInt.prototype.toString),
      _447: Function.prototype.call.bind(Number.prototype.toString),
      _448: (d, digits) => d.toFixed(digits),
      _574: x0 => x0.offsetTop,
      _578: x0 => x0.style,
      _780: x0 => x0.tabIndex,
      _781: (x0,x1) => { x0.tabIndex = x1 },
      _1009: x0 => x0.src,
      _1010: (x0,x1) => { x0.src = x1 },
      _1021: x0 => x0.width,
      _1023: x0 => x0.height,
      _1180: x0 => x0.error,
      _1181: x0 => x0.src,
      _1182: (x0,x1) => { x0.src = x1 },
      _1190: (x0,x1) => { x0.preload = x1 },
      _1192: x0 => x0.readyState,
      _1194: x0 => x0.currentTime,
      _1195: (x0,x1) => { x0.currentTime = x1 },
      _1214: (x0,x1) => { x0.volume = x1 },
      _1856: x0 => x0.width,
      _1857: (x0,x1) => { x0.width = x1 },
      _1858: x0 => x0.height,
      _1859: (x0,x1) => { x0.height = x1 },
      _1892: (x0,x1) => { x0.globalAlpha = x1 },
      _1894: (x0,x1) => { x0.globalCompositeOperation = x1 },
      _1900: (x0,x1) => { x0.strokeStyle = x1 },
      _1902: (x0,x1) => { x0.fillStyle = x1 },
      _1914: (x0,x1) => { x0.lineWidth = x1 },
      _1916: (x0,x1) => { x0.lineCap = x1 },
      _1918: (x0,x1) => { x0.lineJoin = x1 },
      _1924: (x0,x1) => { x0.font = x1 },
      _1926: (x0,x1) => { x0.textAlign = x1 },
      _1928: (x0,x1) => { x0.textBaseline = x1 },
      _1944: x0 => x0.width,
      _2251: x0 => x0.dataTransfer,
      _2255: () => globalThis.window,
      _2298: x0 => x0.location,
      _2317: x0 => x0.navigator,
      _2333: x0 => x0.devicePixelRatio,
      _2576: x0 => x0.performance,
      _2581: x0 => x0.localStorage,
      _2586: x0 => x0.href,
      _2601: x0 => x0.hash,
      _2703: x0 => x0.userAgent,
      _2736: x0 => x0.width,
      _2737: x0 => x0.height,
      _3895: x0 => x0.name,
      _4236: x0 => x0.destination,
      _4238: x0 => x0.currentTime,
      _4367: (x0,x1) => { x0.buffer = x1 },
      _4371: (x0,x1) => { x0.loop = x1 },
      _4373: (x0,x1) => { x0.loopStart = x1 },
      _4375: (x0,x1) => { x0.loopEnd = x1 },
      _4480: x0 => x0.gain,
      _4748: x0 => x0.type,
      _4749: x0 => x0.target,
      _4756: x0 => x0.cancelable,
      _4789: x0 => x0.signal,
      _4859: (x0,x1) => { x0.textContent = x1 },
      _4863: () => globalThis.document,
      _4945: x0 => x0.body,
      _5295: x0 => x0.clientTop,
      _5296: x0 => x0.clientLeft,
      _5297: x0 => x0.clientWidth,
      _5298: x0 => x0.clientHeight,
      _5613: x0 => x0.clientX,
      _5614: x0 => x0.clientY,
      _5615: x0 => x0.ctrlKey,
      _5616: x0 => x0.shiftKey,
      _5617: x0 => x0.altKey,
      _5619: x0 => x0.button,
      _5679: x0 => x0.deltaX,
      _5680: x0 => x0.deltaY,
      _5712: x0 => x0.key,
      _5722: x0 => x0.keyCode,
      _5784: x0 => x0.identifier,
      _5788: x0 => x0.clientX,
      _5789: x0 => x0.clientY,
      _5799: x0 => x0.length,
      _5810: x0 => x0.changedTouches,
      _5811: x0 => x0.altKey,
      _5813: x0 => x0.ctrlKey,
      _5814: x0 => x0.shiftKey,
      _6625: x0 => x0.value,
      _6627: x0 => x0.done,
      _7329: x0 => x0.url,
      _7331: x0 => x0.status,
      _7333: x0 => x0.statusText,
      _7334: x0 => x0.headers,
      _7335: x0 => x0.body,
      _9730: (x0,x1) => { x0.cursor = x1 },
      _9740: (x0,x1) => { x0.display = x1 },
      _9802: (x0,x1) => { x0.font = x1 },
      _9904: (x0,x1) => { x0.height = x1 },
      _10121: x0 => x0.outline,
      _10122: (x0,x1) => { x0.outline = x1 },
      _10554: (x0,x1) => { x0.verticalAlign = x1 },
      _10594: (x0,x1) => { x0.width = x1 },
      _10962: x0 => x0.name,
      _11299: x0 => x0.top,
      _11302: x0 => x0.left,
      _11682: () => globalThis.console,

    };

    const baseImports = {
      dart2wasm: dart2wasm,
      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
      S: new Proxy({}, { get(_, prop) { return prop; } }),

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
