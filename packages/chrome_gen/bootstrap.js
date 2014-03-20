(function() {
  if (navigator.userAgent.indexOf('(Dart)') === -1) {
    var scripts = document.getElementsByTagName("script");

    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].type == "application/dart" && scripts[i].src && scripts[i].src != '') {
        var script = document.createElement('script');
        script.src = scripts[i].src.replace(/\.dart$/, '.dart.precompiled.js');
        document.currentScript = script;
        scripts[i].parentNode.replaceChild(script, scripts[i]);
      } else if (scripts[i].src.indexOf('.dart.js') == scripts[i].src.length - 8) {
        var script = document.createElement('script');
        script.src = scripts[i].src.replace(/\.dart\.js$/, '.dart.precompiled.js');
        document.currentScript = script;
        scripts[i].parentNode.replaceChild(script, scripts[i]);
      }
    }
  }
})();
