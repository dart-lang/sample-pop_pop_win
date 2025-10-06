(async () => {
const thisScript = document.currentScript;

function relativeURL(ref) {
  const base = thisScript?.src ?? document.baseURI;
  return new URL(ref, base).toString();
}

if ((WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,95,1,120,0])))) {

let { compileStreaming } = await import("./main.mjs");

let app = await compileStreaming(fetch(relativeURL("main.wasm")));
let module = await app.instantiate({});
module.invokeMain();

} else {
const scriptTag = document.createElement("script");
scriptTag.type = "application/javascript";
scriptTag.src = relativeURL("./main.dart2js.js");
document.head.append(scriptTag);
}

})();
