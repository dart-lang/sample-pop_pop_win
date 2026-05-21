// Compiles a dart2wasm-generated main module from `source` which can then
// be instantiated via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm module from `bytes` which is then
// instantiable via the `instantiate` method.
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
  //   callback that should be invoked for each loaded module with 2 arguments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDeferredId` is a JS function that takes load ID produced by the
  //   compiler when the `use-load-ids` option is passed. Each load ID maps to
  //   one or more wasm files as specified in the emitted JSON file. It also
  //   takes a callback that should be invoked for each loaded module with 2
  //   arguments: (1) the module name, (2) the loaded module in a format
  //   supported by `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  //   The callback returns a Promise that resolves when the module is
  //   instantiated.
  //   loadDeferredId should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  async instantiate(additionalImports, {loadDeferredModules, loadDeferredId} = {}) {
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
            AB: x0 => x0.width,
      AC: Function.prototype.call.bind(DataView.prototype.getInt16),
      AD: Function.prototype.call.bind(DataView.prototype.getUint16),
      AE: (b, o, l) => new DataView(b, o, l),
      AF: o => o instanceof Uint8ClampedArray,
      AG: x0 => x0.ctrlKey,
      AH: () => globalThis.document,
      B: s => printToConsole(s),
      BB: (x0,x1) => x0.getContext(x1),
      BC: (x0,x1) => { x0.globalAlpha = x1 },
      BD: Function.prototype.call.bind(DataView.prototype.setUint8),
      BE: o => o.byteOffset,
      BF: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      BG: x0 => x0.altKey,
      BH: x0 => x0.now(),
      C: Function.prototype.call.bind(Number.prototype.toString),
      CB: (x0,x1) => { x0.height = x1 },
      CC: (x0,x1) => { x0.globalCompositeOperation = x1 },
      CD: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      CE: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      CF: x0 => x0.height,
      CG: x0 => x0.clientY,
      CH: (x0,x1,x2,x3) => ({event_category: x0,event_label: x1,value: x2,name: x3}),
      D: Function.prototype.call.bind(BigInt.prototype.toString),
      DB: (x0,x1) => { x0.width = x1 },
      DC: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) => x0.drawImage(x1,x2,x3,x4,x5,x6,x7,x8,x9),
      DD: Function.prototype.call.bind(DataView.prototype.getUint8),
      DE: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof ArrayBuffer) return 1;
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
          return 2;
        }
        return 3;
      },
      DF: x0 => x0.width,
      DG: x0 => x0.clientX,
      DH: x0 => x0.performance,
      E: (exn) => {
        let stackString = exn.toString();
        let frames = stackString.split('\n');
        let drop = 4;
        if (frames[0].startsWith('Error')) {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      EB: (x0,x1) => x0.createElement(x1),
      EC: x0 => x0.save(),
      ED: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      EE: (s) => +s,
      EF: (x0,x1) => { x0.src = x1 },
      EG: x0 => x0.dataTransfer,
      EH: x0 => x0.key,
      F: () => new Error().stack,
      FB: (x0,x1) => { x0.textBaseline = x1 },
      FC: x0 => x0.beginPath(),
      FD: Function.prototype.call.bind(DataView.prototype.setInt8),
      FE: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      FF: x0 => x0.src,
      FG: x0 => x0.button,
      G: s => JSON.stringify(s),
      GB: (x0,x1) => { x0.textAlign = x1 },
      GC: (x0,x1,x2) => x0.moveTo(x1,x2),
      GD: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      GE: s => s.trim(),
      GF: x0 => x0.height,
      GG: s => new Date(s * 1000).getTimezoneOffset() * 60,
      H: Function.prototype.call.bind(Number.prototype.toString),
      HB: (x0,x1) => { x0.font = x1 },
      HC: (x0,x1,x2) => x0.lineTo(x1,x2),
      HD: Function.prototype.call.bind(DataView.prototype.getInt8),
      HE: Function.prototype.call.bind(String.prototype.toLowerCase),
      HF: x0 => x0.width,
      HG: Date.now,
      I: Function.prototype.call.bind(String.prototype.indexOf),
      IB: x0 => x0.index,
      IC: x0 => x0.closePath(),
      ID: (o, i) => o[i],
      IE: Object.is,
      IF: x0 => new Blob(x0),
      IG: (x0,x1,x2) => x0.pixelStorei(x1,x2),
      J: (s, p, i) => s.lastIndexOf(p, i),
      JB: (x0,x1) => x0[x1],
      JC: x0 => x0.clip(),
      JD: o => o.length,
      JE: (decoder, codeUnits) => decoder.decode(codeUnits),
      JF: (x0,x1) => x0.createImageBitmap(x1),
      JG: (x0,x1,x2) => x0.blendFunc(x1,x2),
      K: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      KB: x0 => x0.flags,
      KC: (x0,x1,x2,x3,x4,x5,x6) => x0.transform(x1,x2,x3,x4,x5,x6),
      KD: o => {
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
      KE: () => new TextDecoder("utf-8", {fatal: true}),
      KF: o => [o],
      KG: (x0,x1,x2) => x0.getContext(x1,x2),
      L: o => o === undefined,
      LB: (x0,x1) => x0.append(x1),
      LC: x0 => x0.restore(),
      LD: (x0,x1) => x0.canPlayType(x1),
      LE: () => new TextDecoder("utf-8", {fatal: false}),
      LF: (o0, o1) => [o0, o1],
      LG: (x0,x1) => x0.blendEquation(x1),
      M: o => String(o),
      MB: x0 => x0.remove(),
      MC: (x0,x1,x2,x3,x4,x5) => x0.drawImage(x1,x2,x3,x4,x5),
      MD: (x0,x1) => x0.test(x1),
      ME: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      MF: (o0, o1, o2) => [o0, o1, o2],
      MG: (x0,x1,x2,x3) => x0.uniformMatrix4fv(x1,x2,x3),
      N: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      NB: x0 => x0.offsetTop,
      NC: (x0,x1,x2,x3,x4) => x0.clearRect(x1,x2,x3,x4),
      ND: x0 => x0.userAgent,
      NE: s => s.toUpperCase(),
      NF: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      NG: (x0,x1,x2,x3,x4) => x0.viewport(x1,x2,x3,x4),
      O: (x0,x1) => x0.querySelector(x1),
      OB: (x0,x1) => { x0.verticalAlign = x1 },
      OC: (a, i, v) => a[i] = v,
      OD: x0 => x0.navigator,
      OE: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      OF: (d, digits) => d.toFixed(digits),
      OG: (x0,x1,x2,x3) => x0.stencilFunc(x1,x2,x3),
      P: (x0,x1) => x0.assign(x1),
      PB: x0 => x0.body,
      PC: () => Date.now(),
      PD: x0 => x0.createGain(),
      PE: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      PF: x0 => x0.devicePixelRatio,
      PG: x0 => x0.createFramebuffer(),
      Q: x0 => x0.hash,
      QB: (x0,x1) => { x0.height = x1 },
      QC: (x0,x1,x2,x3,x4) => x0.fillRect(x1,x2,x3,x4),
      QD: (x0,x1) => x0.connect(x1),
      QE: x0 => x0.pop(),
      QF: x0 => x0.fill(),
      QG: (x0,x1,x2) => x0.bindFramebuffer(x1,x2),
      R: x0 => x0.location,
      RB: (x0,x1) => { x0.width = x1 },
      RC: (x0,x1) => { x0.fillStyle = x1 },
      RD: x0 => x0.destination,
      RE: x0 => x0.abort(),
      RF: (x0,x1,x2,x3,x4) => x0.rect(x1,x2,x3,x4),
      RG: (x0,x1,x2,x3,x4,x5) => x0.framebufferTexture2D(x1,x2,x3,x4,x5),
      S: (o, c) => o instanceof c,
      SB: (x0,x1) => { x0.display = x1 },
      SC: (x0,x1,x2) => ({event_category: x0,event_label: x1,value: x2}),
      SD: () => new AudioContext(),
      SE: () => new AbortController(),
      SF: (x0,x1,x2,x3) => x0.strokeText(x1,x2,x3),
      SG: (x0,x1,x2,x3,x4) => x0.framebufferRenderbuffer(x1,x2,x3,x4),
      T: (o, p) => o[p],
      TB: (x0,x1) => { x0.textContent = x1 },
      TC: () => typeof dartUseDateNowForTicks !== "undefined",
      TD: (o, p) => p in o,
      TE: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      TF: (x0,x1,x2,x3) => x0.fillText(x1,x2,x3),
      TG: x0 => x0.createRenderbuffer(),
      U: () => globalThis,
      UB: (x0,x1) => { x0.font = x1 },
      UC: () => 1000 * performance.now(),
      UD: x0 => x0.pause(),
      UE: (x0,x1) => globalThis.fetch(x0,x1),
      UF: (x0,x1) => { x0.strokeStyle = x1 },
      UG: (x0,x1,x2) => x0.bindRenderbuffer(x1,x2),
      V: (x0,x1) => x0.exec(x1),
      VB: x0 => x0.style,
      VC: (x0,x1,x2) => globalThis.gtag(x0,x1,x2),
      VD: (x0,x1) => { x0.currentTime = x1 },
      VE: (x0,x1) => x0.get(x1),
      VF: (x0,x1) => { x0.lineWidth = x1 },
      VG: (x0,x1,x2,x3,x4) => x0.renderbufferStorage(x1,x2,x3,x4),
      W: x0 => x0.length,
      WB: (x0,x1) => x0.getItem(x1),
      WC: (x0,x1) => x0.error(x1),
      WD: x0 => x0.currentTime,
      WE: (module,f) => finalizeWrapper(f, function(x0,x1,x2) { return module.exports.G(f,arguments.length,x0,x1,x2) }),
      WF: (x0,x1) => { x0.lineJoin = x1 },
      WG: (x0,x1,x2,x3,x4) => x0.colorMask(x1,x2,x3,x4),
      X: o => o,
      XB: o => {
        if (o === null || o === undefined) return 0;
        if (typeof(o) === 'string') return 1;
        return 2;
      },
      XC: () => globalThis.console,
      XD: x0 => x0.play(),
      XE: (x0,x1) => x0.forEach(x1),
      XF: (x0,x1) => { x0.lineCap = x1 },
      XG: (x0,x1,x2,x3,x4) => x0.clearColor(x1,x2,x3,x4),
      Y: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      YB: x0 => x0.localStorage,
      YC: (handle) => clearTimeout(handle),
      YD: (x0,x1) => { x0.volume = x1 },
      YE: x0 => x0.statusText,
      YF: x0 => x0.height,
      YG: (x0,x1) => x0.clear(x1),
      Z: (x0,x1) => { x0.lastIndex = x1 },
      ZB: (x0,x1) => x0.isEnabled(x1),
      ZC: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      ZD: (x0,x1) => x0.cloneNode(x1),
      ZE: x0 => x0.url,
      ZF: x0 => x0.width,
      ZG: (x0,x1,x2,x3,x4,x5,x6) => x0.vertexAttribPointer(x1,x2,x3,x4,x5,x6),
      a: o => o,
      aB: (x0,x1) => x0.disable(x1),
      aC: (x0,x1,x2) => x0.setItem(x1,x2),
      aD: x0 => x0.readyState,
      aE: x0 => x0.status,
      aF: x0 => x0.getBoundingClientRect(),
      aG: (x0,x1) => x0.useProgram(x1),
      b: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      bB: (x0,x1,x2,x3) => x0.drawImage(x1,x2,x3),
      bC: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      bD: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.F(f,arguments.length,x0) }),
      bE: x0 => x0.getReader(),
      bF: x0 => x0.clientHeight,
      bG: (x0,x1,x2) => x0.getProgramParameter(x1,x2),
      c: o => o instanceof RegExp,
      cB: (x0,x1,x2,x3,x4,x5,x6) => x0.texImage2D(x1,x2,x3,x4,x5,x6),
      cC: (o, p, r) => o.replace(p, () => r),
      cD: (x0,x1) => x0.appendChild(x1),
      cE: x0 => x0.read(),
      cF: x0 => x0.clientWidth,
      cG: (x0,x1,x2) => x0.getActiveUniform(x1,x2),
      d: (string, times) => string.repeat(times),
      dB: (x0,x1) => x0.enable(x1),
      dC: (o, p, r) => o.replaceAll(p, () => r),
      dD: x0 => x0.load(),
      dE: x0 => x0.value,
      dF: x0 => x0.top,
      dG: (x0,x1,x2) => x0.getUniformLocation(x1,x2),
      e: o => o,
      eB: x0 => x0.createTexture(),
      eC: x0 => x0.clear(),
      eD: (x0,x1) => { x0.src = x1 },
      eE: x0 => x0.done,
      eF: x0 => x0.clientTop,
      eG: x0 => x0.name,
      f: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      fB: (x0,x1) => x0.activeTexture(x1),
      fC: (x0,x1) => x0.replace(x1),
      fD: (x0,x1) => { x0.preload = x1 },
      fE: x0 => x0.body,
      fF: x0 => x0.left,
      fG: (x0,x1,x2) => x0.getActiveAttrib(x1,x2),
      g: x0 => x0.dotAll,
      gB: (x0,x1,x2) => x0.bindTexture(x1,x2),
      gC: x0 => x0.reload(),
      gD: x0 => x0.error,
      gE: x0 => x0.headers,
      gF: x0 => x0.clientLeft,
      gG: (x0,x1,x2) => x0.getAttribLocation(x1,x2),
      h: x0 => x0.unicode,
      hB: x0 => x0.getError(),
      hC: x0 => x0.href,
      hD: x0 => x0.src,
      hE: x0 => x0.signal,
      hF: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.H(f,arguments.length,x0) }),
      hG: (x0,x1) => x0.enableVertexAttribArray(x1),
      i: x0 => x0.ignoreCase,
      iB: (x0,x1,x2,x3,x4,x5,x6,x7,x8) => x0.texImage2D(x1,x2,x3,x4,x5,x6,x7,x8),
      iC: x0 => x0.cancel(),
      iD: (x0,x1) => x0.decodeAudioData(x1),
      iE: x0 => new Uint8Array(x0),
      iF: (x0,x1) => x0.requestAnimationFrame(x1),
      iG: x0 => x0.createProgram(),
      j: x0 => x0.multiline,
      jB: (x0,x1,x2,x3) => x0.texParameteri(x1,x2,x3),
      jC: x0 => x0.name,
      jD: x0 => x0.createBufferSource(),
      jE: () => ({}),
      jF: (x0,x1) => { x0.cursor = x1 },
      jG: (x0,x1,x2) => x0.attachShader(x1,x2),
      k: (string, token) => string.split(token),
      kB: (x0,x1,x2,x3,x4) => x0.drawElements(x1,x2,x3,x4),
      kC: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.D(f,arguments.length,x0) }),
      kD: (x0,x1,x2) => x0.start(x1,x2),
      kE: (o, p, v) => o[p] = v,
      kF: (x0,x1) => x0.item(x1),
      kG: (x0,x1) => x0.linkProgram(x1),
      l: o => o instanceof Array,
      lB: (x0,x1,x2,x3) => x0.bufferSubData(x1,x2,x3),
      lC: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports.E(f,arguments.length,x0,x1) }),
      lD: (x0,x1,x2,x3) => x0.start(x1,x2,x3),
      lE: () => [],
      lF: x0 => x0.focus(),
      lG: x0 => x0.isContextLost(),
      m: (a, i) => a[i],
      mB: x0 => new Float32Array(x0),
      mC: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      mD: x0 => x0.currentTime,
      mE: (a, i) => a.push(i),
      mF: x0 => x0.clientY,
      mG: (x0,x1) => x0.getProgramInfoLog(x1),
      n: a => a.length,
      nB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      nC: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      nD: (x0,x1) => { x0.loopEnd = x1 },
      nE: x0 => new Int8Array(x0),
      nF: x0 => x0.clientX,
      nG: (x0,x1) => x0.createShader(x1),
      o: x0 => x0.target,
      oB: (t, s) => t.set(s),
      oC: f => f.dartFunction,
      oD: (x0,x1) => { x0.loopStart = x1 },
      oE: x0 => new Uint8ClampedArray(x0),
      oF: x0 => x0.identifier,
      oG: (x0,x1,x2) => x0.shaderSource(x1,x2),
      p: x0 => x0.keyCode,
      pB: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      pC: Function.prototype.call.bind(DataView.prototype.setFloat64),
      pD: (x0,x1) => { x0.loop = x1 },
      pE: x0 => new Uint16Array(x0),
      pF: x0 => x0.length,
      pG: (x0,x1) => x0.compileShader(x1),
      q: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      qB: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      qC: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      qD: (x0,x1) => { x0.buffer = x1 },
      qE: x0 => new Int32Array(x0),
      qF: x0 => x0.changedTouches,
      qG: (x0,x1,x2) => x0.getShaderParameter(x1,x2),
      r: b => !!b,
      rB: Function.prototype.call.bind(DataView.prototype.setFloat32),
      rC: Function.prototype.call.bind(DataView.prototype.getFloat64),
      rD: (x0,x1,x2) => x0.setValueAtTime(x1,x2),
      rE: x0 => new Uint32Array(x0),
      rF: x0 => x0.shiftKey,
      rG: (x0,x1) => x0.getShaderInfoLog(x1),
      s: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.C(f,arguments.length,x0) }),
      sB: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      sC: Function.prototype.call.bind(DataView.prototype.setUint32),
      sD: x0 => x0.gain,
      sE: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      sF: x0 => x0.ctrlKey,
      sG: x0 => x0.createBuffer(),
      t: (l, r) => l === r,
      tB: Function.prototype.call.bind(DataView.prototype.getFloat32),
      tC: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      tD: x0 => new ArrayBuffer(x0),
      tE: x0 => new Float64Array(x0),
      tF: x0 => x0.altKey,
      tG: (x0,x1,x2) => x0.bindBuffer(x1,x2),
      u: x0 => x0.random(),
      uB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      uC: Function.prototype.call.bind(DataView.prototype.getUint32),
      uD: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      uE: x0 => new Array(x0),
      uF: x0 => x0.type,
      uG: (x0,x1,x2,x3) => x0.bufferData(x1,x2,x3),
      v: () => globalThis.Math,
      vB: x0 => new Int16Array(x0),
      vC: Function.prototype.call.bind(DataView.prototype.setInt32),
      vD: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      vE: (x0,x1,x2) => { x0[x1] = x2 },
      vF: x0 => x0.cancelable,
      vG: (x0,x1,x2) => x0.uniform1i(x1,x2),
      w: x0 => x0.preventDefault(),
      wB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI16ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      wC: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      wD: (x0,x1,x2) => new DataView(x0,x1,x2),
      wE: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      wF: x0 => new TouchEvent(x0),
      wG: (x0,x1) => { x0.outline = x1 },
      x: () => globalThis.window,
      xB: o => o instanceof Int16Array,
      xC: Function.prototype.call.bind(DataView.prototype.getInt32),
      xD: (o, p) => o[p],
      xE: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      xF: x0 => x0.deltaY,
      xG: x0 => x0.outline,
      y: (x0,x1,x2,x3,x4,x5,x6) => x0.setTransform(x1,x2,x3,x4,x5,x6),
      yB: Function.prototype.call.bind(DataView.prototype.setInt16),
      yC: Function.prototype.call.bind(DataView.prototype.setUint16),
      yD: o => o.buffer,
      yE: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      yF: x0 => x0.deltaX,
      yG: (x0,x1) => { x0.tabIndex = x1 },
      z: (x0,x1) => x0.measureText(x1),
      zB: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      zC: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      zD: (b, o) => new DataView(b, o),
      zE: o => o instanceof Uint16Array,
      zF: x0 => x0.shiftKey,
      zG: x0 => x0.tabIndex,

    };

    const baseImports = {
      _: dart2wasm,
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
    dartInstance.exports.B(dartInstance);

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
